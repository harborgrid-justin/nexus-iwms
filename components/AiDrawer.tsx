import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { askNexusAI } from '../services/gemini';
import { Link } from 'react-router-dom';

interface AiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: any;
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
  }, [history]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={18} />
          <span className="font-semibold">Nexus Intelligence</span>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-1 rounded transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" ref={scrollRef}>
        {history.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
            }`}>
              {msg.role === 'ai' && <Bot size={16} className="mb-1 text-indigo-500" />}
              <div className="whitespace-pre-wrap">{parseResponse(msg.text)}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-lg rounded-bl-none p-3 shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-indigo-500" />
              <span className="text-xs text-slate-500">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about leases, work orders..."
            className="w-full pl-4 pr-10 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-blue-600 disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="mt-2 text-[10px] text-center text-slate-400">
          Powered by Gemini 2.5 Flash. AI can make mistakes.
        </div>
      </div>
    </div>
  );
};