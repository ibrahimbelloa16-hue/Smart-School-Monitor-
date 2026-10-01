import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '../components/Toast.tsx';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const faqs = [
    {
      q: 'How fast is mobile data and airtime delivered?',
      a: 'All data bundles and airtime top-ups are processed by our automated server engine in real-time. Delivery typically arrives on the beneficiary phone line within 5 to 30 seconds.'
    },
    {
      q: 'What happens if a network provider is temporarily down?',
      a: 'If a telecom carrier reports an error or rejects the transaction, our system performs an automatic, instant refund back to your wallet ledger. You never lose money on Standard DataHub.'
    },
    {
      q: 'How does wallet funding work?',
      a: 'Transfer funds to our designated Opay bank account (6423809175 - Ibrahim Bello) using your mobile banking app or USSD. Then submit your transfer reference on the "Fund Wallet" page. Our admin team will verify and credit your wallet promptly.'
    },
    {
      q: 'Can I start my own VTU reselling business with Standard DataHub?',
      a: 'Yes! Standard DataHub offers wholesale discounted pricing on MTN SME, Airtel Corporate, Glo Gifting, and 9mobile data. You can purchase on behalf of your customers at your own customized retail pricing and profit on every transaction.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      showToast('Thank you! Your message has been received. Our support team will reach out shortly.', 'success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSending(false);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Customer Support & FAQs</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Have an inquiry, custom integration question, or need assistance? We are here 24/7.
        </p>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* WhatsApp */}
        <a
          href="https://wa.me/2348161720895?text=Hello%20Standard%20DataHub%20Support,%20I%20need%20assistance"
          target="_blank"
          rel="noreferrer"
          className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-center hover:border-emerald-500/50 hover:bg-emerald-500/15 transition-all block group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            WhatsApp Support
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Instant chat & fast reply</p>
          <div className="mt-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            08161720895
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 underline">
            <span>Open WhatsApp Chat →</span>
          </div>
        </a>

        {/* Phone */}
        <a
          href="tel:08161720895"
          className="p-5 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-center hover:border-blue-500/50 hover:bg-blue-500/15 transition-all block group"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Direct Phone
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Voice call helpline</p>
          <div className="mt-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            08161720895
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 underline">
            <span>Call Helpline →</span>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:ibrahimmal916@gmail.com"
          className="p-5 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-center hover:border-purple-500/50 hover:bg-purple-500/15 transition-all block group"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
          <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            Email Desk
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Official customer inquiries</p>
          <div className="mt-2 text-xs font-bold text-purple-600 dark:text-purple-400 truncate">
            ibrahimmal916@gmail.com
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-purple-600 dark:text-purple-400 underline">
            <span>Send Email →</span>
          </div>
        </a>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          Send Us a Direct Inquiry
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Our customer satisfaction agents review and reply within 15 minutes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tunde Williams"
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tunde@domain.com"
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Nigerian Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08012345678"
              className="w-full text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Message or Transaction Question
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your inquiry or include transaction reference if applicable..."
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
