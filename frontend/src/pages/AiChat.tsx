import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Loader2, MessageSquare, Send, User, Sparkles, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { aiService } from '../services/ai.service';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AiChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const reply = await aiService.chat(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: reply || 'I am ready to assist with your career path!',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: 'An error occurred while contacting the AI. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6 animate-in fade-in duration-300 pb-4">
      {/* Sessions Sidebar */}
      <div className="hidden md:flex md:w-64 flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">AI Counselor</span>
          </div>
          {messages.length === 0 ? (
            <div className="text-center py-8 px-3 border border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">No active messages yet</p>
            </div>
          ) : (
            <div className="text-xs text-zinc-500 dark:text-zinc-400 space-y-2 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">Active Chat Session</p>
              <p>{messages.length} message{messages.length !== 1 ? 's' : ''} exchanged</p>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-brand-50 dark:bg-brand-950/40 rounded-xl border border-brand-100 dark:border-brand-900/40 text-[11px] text-brand-700 dark:text-brand-300">
            💡 Ask about salary negotiation strategies, resume reviews, 90-day learning roadmaps, or interview tips.
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="h-16 border-b border-zinc-200 dark:border-zinc-800 px-6 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              AI Career Assistant <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">ONLINE</span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Powered by Gemini AI Engine</p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-xs text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1 font-medium"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear session
            </button>
          )}
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center my-auto">
              <div className="h-14 w-14 rounded-full border border-brand-200 dark:border-brand-900/60 flex items-center justify-center bg-brand-50 dark:bg-brand-950/50 mb-4 animate-bounce">
                <MessageSquare className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-base">Welcome to CareerPilot AI Chat</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm leading-relaxed">
                Ask anything about your career path, interview preparation, salary benchmarks, or technical skill stack.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-lg">
                {[
                  'What skills should I learn for a Senior Dev role?',
                  'How do I negotiate salary effectively?',
                  'Write me a 90-day learning roadmap for Full Stack AI',
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-xs rounded-full border border-zinc-200 dark:border-zinc-700 px-3.5 py-2 text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 hover:bg-brand-50 hover:border-brand-300 dark:hover:bg-brand-950/50 transition-all font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-brand-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'}`}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />}
                </div>
                <div className={`group max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white rounded-tr-sm shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-sm border border-zinc-200/60 dark:border-zinc-700/60'
                  }`}>
                    {msg.content}
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[10px] text-zinc-400">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {msg.role === 'ai' && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                      >
                        {copiedId === msg.id ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        {copiedId === msg.id ? 'Copied' : 'Copy'}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                <Sparkles className="h-4 w-4 text-brand-500 animate-spin" />
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-brand-600 dark:text-brand-400" />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Gemini AI is formulating response…</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-end gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your career path… (Press Enter to send)"
              className="block flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs p-3 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors resize-none"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={!input.trim() || isLoading}
              className="p-3 shrink-0 rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
