import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, Loader2, ChevronDown } from 'lucide-react';
import { askNexusAI } from '../services/gemini';
import { Link } from 'react-router-dom';

interface AiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: unknown;
}

// Function to parse markdown links and convert them to React Router Links
const parseResponse = (text: string) => {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, index) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      const linkText = match[1];
      const linkPath = match[2];
      return <Link key={index} to={linkPath} className="text-blue-500 font-medium hover:underline">{linkText}</Link>;
    }
    return part;
  });
};

export const AiDrawer: React.FC<AiDrawerProps> = ({ isOpen, onClose, contextData }) => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hello, I am Nexus. I have analyzed the current dashboard data. How can I assist you with facility operations today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]); // Also scroll on open

  const handleSend = async () => {
    if (!query.trim()) return;
    
    const userMsg = query;
    setQuery('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await askNexusAI(userMsg, contextData);
    
    setLoading(false);
    setHistory(prev => [...prev, { role: 'ai', text: response }]);
  };

  // Prevent scrolling on body when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className={`
        fixed z-50 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out
        md:inset-y-0 md:right-0 md:w-96 md:border-l md:border-slate-200 md:h-full md:translate-x-0
        inset-x-0 bottom-0 h-[85vh] rounded-t-2xl md:rounded-none
        transform ${isOpen ? 'translate-y-0' : 'translate-y-full md:translate-x-full'}
      `}>
        {/* Mobile Drag Handle */}
        <div className="md:hidden w-full flex justify-center pt-3 pb-1" onClick={onClose}>
            <div className="w-12 h-1.5 bg-slate-300 rounded-full"></div>
        </div>

        <div className="h-14 md:h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shrink-0 md:rounded-none rounded-t-xl">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <span className="font-semibold text-lg">Nexus Intelligence</span>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <ChevronDown size={24} className="md:hidden" />
            <X size={24} className="hidden md:block" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-thin" ref={scrollRef}>
          {history.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
              }`}>
                {msg.role === 'ai' && <div className="flex items-center gap-2 mb-2 text-indigo-600 font-semibold"><Bot size={16} /> Nexus</div>}
                <div className="whitespace-pre-wrap leading-relaxed">{parseResponse(msg.text)}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-3">
                <Loader2 size={18} className="animate-spin text-indigo-500" />
                <span className="text-sm text-slate-500 font-medium">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-200 shrink-0 pb-safe">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about leases, work orders..."
              className="w-full pl-4 pr-12 py-4 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base shadow-sm bg-slate-50 focus:bg-white transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !query.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2.5 bg-blue-600 hover:bg-blue-700 rounded-full text-white disabled:opacity-50 disabled:bg-slate-300 transition-colors shadow-sm"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-3 text-[10px] text-center text-slate-400">
            Powered by Gemini 3 Flash. AI can make mistakes.
          </div>
        </div>
      </div>
    </>
  );
};