import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Loader2, MessageSquare, Send, User, Sparkles, Trash2, CheckCircle2, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { aiService, getResumeContext } from '../services/ai.service';

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

  const resumeCtx = getResumeContext();

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
      <div className="hidden md:flex md:w-64 flex-col bg-white border border-slate-200 rounded-2xl p-4 justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Resume Mentor</span>
          </div>

          {resumeCtx && (
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 mb-4 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-indigo-700">
                <FileText className="h-3.5 w-3.5 text-indigo-600" /> Resume Context Loaded
              </div>
              <p className="text-[10px] text-indigo-900/80 font-medium line-clamp-3 leading-snug">{resumeCtx}</p>
            </div>
          )}

          {messages.length === 0 ? (
            <div className="text-center py-8 px-3 border border-dashed border-slate-200 rounded-xl">
              <p className="text-xs text-slate-500 font-medium">No active messages yet</p>
            </div>
          ) : (
            <div className="text-xs text-slate-500 space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-semibold text-slate-800">Active Chat Session</p>
              <p>{messages.length} message{messages.length !== 1 ? 's' : ''} exchanged</p>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 text-[11px] text-indigo-700 font-medium leading-relaxed">
            💡 Ask about your resume gaps, target salary, mock interview answers, or tech stack projects.
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
              AI Resume & Career Assistant <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">RESUME SYNCED</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">Tailored strictly to your uploaded resume and skills</p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear session
            </button>
          )}
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center my-auto">
              <div className="h-14 w-14 rounded-full border border-indigo-200 flex items-center justify-center bg-indigo-50 mb-4 animate-bounce">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-base font-display">Welcome to CareerPilot AI Chat</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm leading-relaxed font-medium">
                Ask anything about your resume, project improvements, interview preparation, or salary benchmarks.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-lg">
                {[
                  'How can I improve my resume for target tech roles?',
                  'What technical interview questions will I face?',
                  'Write me a 90-day learning roadmap based on my resume',
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-xs rounded-full border border-slate-200 px-3.5 py-2 text-slate-700 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all font-semibold cursor-pointer"
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
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4 text-indigo-600" />}
                </div>
                <div className={`group max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-sm shadow-sm'
                      : 'bg-slate-100 text-slate-900 rounded-tl-sm border border-slate-200/60 font-medium'
                  }`}>
                    {msg.content}
                  </div>
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[10px] text-slate-400">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {msg.role === 'ai' && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="text-[10px] text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer"
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
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 shrink-0">
                <Sparkles className="h-4 w-4 text-indigo-600 animate-spin" />
              </div>
              <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                <span className="text-xs text-slate-500 font-medium">Analyzing your resume & formulating response…</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-end gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your resume or target role… (Press Enter to send)"
              className="block flex-1 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-xs p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={!input.trim() || isLoading}
              className="p-3 shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
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
