import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getDb } from '../db/database.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'datahub_vtu_default_jwt_secret_dev_only_change_in_prod';

export interface AuthenticatedUser {
  id: number;
  email: string;
  phone: string;
  role: 'user' | 'admin' | 'super_admin';
  fullName: string;
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

export function generateToken(user: AuthenticatedUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      fullName: user.fullName
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Authentication required.' });
  }

  const token = authHeader.split('Bearer ')[1].trim();

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthenticatedUser;

    // Verify user is still active in database
    const db = await getDb();
    const userRes = await db.query(
      'SELECT id, email, phone, role, full_name, status FROM users WHERE id = $1',
      [decoded.id]
    );

    if (userRes.rows.length === 0) {
      return res.status(401).json({ error: 'User account not found.' });
    }

    const dbUser = userRes.rows[0];
    if (dbUser.status === 'suspended') {
      return res.status(403).json({ error: 'Account has been suspended. Please contact support.' });
    }

    req.user = {
      id: dbUser.id,
      email: dbUser.email,
      phone: dbUser.phone,
      role: dbUser.role,
      fullName: dbUser.full_name
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session token.' });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'super_admin')) {
    return res.status(403).json({ error: 'Access denied: Administrator privileges required.' });
  }
  next();
}

export function requireSuperAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Access denied: Super Admin privileges required.' });
  }
  next();
}
