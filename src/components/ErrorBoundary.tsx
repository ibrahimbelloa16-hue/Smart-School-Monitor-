import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  private reloadTimer?: any;

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Global ErrorBoundary caught error]:', error, errorInfo);
    // Auto-reload after 2 seconds
    this.reloadTimer = setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  public componentWillUnmount() {
    if (this.reloadTimer) {
      clearTimeout(this.reloadTimer);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-white tracking-tight">
                Oops! Something went wrong. Refreshing...
              </h2>
              <p className="text-xs text-slate-400">
                An unexpected error occurred. We are refreshing your session automatically in 2 seconds.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400 pt-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Auto-reloading application...</span>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-xl transition-colors font-medium"
            >
              Click here to reload immediately
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
