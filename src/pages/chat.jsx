"use client";
import React, { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  MoreVertical, 
  ChevronLeft,
  Circle,
  Sparkles,
  User,
  Image as ImageIcon
} from 'lucide-react';

const QuantumChat = () => {
  const [input, setInput] = useState("");
  
  const messages = [
    { 
      id: 1, 
      role: 'ai', 
      content: "Hello! I've analyzed Lecture 04 on Quantum Fields. Would you like me to explain the Lagrangian Density section or help with the practice problems?",
      time: '10:42 AM'
    },
    { 
      id: 2, 
      role: 'user', 
      content: "Can you simplify the concept of Gauge Invariance for me?",
      time: '10:44 AM'
    },
    { 
      id: 3, 
      role: 'ai', 
      content: "Think of Gauge Invariance like changing the units on a ruler. Even if you switch from inches to centimeters, the physical length of the object stays the same. In physics, it means the underlying laws don't change even when we transform the internal 'coordinates' of the field.",
      time: '10:45 AM'
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-[#131313] transition-colors duration-300">
      
      {/* Chat Header */}
      <header className="fixed top-0 w-full md:left-64 md:w-[calc(100%-16rem)] h-16 bg-white/80 dark:bg-[#131313]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 text-slate-500">
            <ChevronLeft size={24} />
          </button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles size={20} className="text-white" />
            </div>
            <Circle size={10} fill="#22c55e" className="absolute bottom-0 right-0 text-green-500 border-2 border-white dark:border-[#131313] rounded-full" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-tight dark:text-[#e5e2e1]">Quantum AI</h2>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Active Assistant</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
          <MoreVertical size={20} />
        </button>
      </header>

      {/* Messages Area */}
      {/* pb-40 ensures the last message is visible above the input and navigation */}
      <main className="flex-1 overflow-y-auto pt-20 pb-44 px-4 md:px-8 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 shadow-sm ${
                msg.role === 'ai' ? 'bg-blue-600' : 'bg-slate-200 dark:bg-[#2a2a2a]'
              }`}>
                {msg.role === 'ai' ? <Sparkles size={14} className="text-white" /> : <User size={14} className="text-slate-500" />}
              </div>

              {/* Bubble */}
              <div className="flex flex-col gap-1">
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-[#1c1b1b] text-slate-700 dark:text-[#c2c6d6] border border-slate-200 dark:border-white/5 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
                <span className={`text-[9px] font-bold text-slate-400 uppercase tracking-tighter ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input Section - Optimized for Mobile Over Nav */}
      <footer className="fixed bottom-20 md:bottom-4 left-0 right-0 md:left-[calc(16rem+1rem)] md:right-4 z-40 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#1c1b1b] border border-slate-200 dark:border-white/10 rounded-2xl md:rounded-full shadow-2xl p-2 flex items-center gap-2">
          
          <button className="p-2 md:p-3 text-slate-400 hover:text-blue-500 transition-colors">
            <Paperclip size={20} />
          </button>
          
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about the lecture..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />

          <div className="flex items-center gap-1 md:gap-2">
            <button className="hidden sm:flex p-2 md:p-3 text-slate-400 hover:text-blue-500 transition-colors">
              <ImageIcon size={20} />
            </button>
            <button className="p-2 md:p-3 text-slate-400 hover:text-blue-500 transition-colors">
              <Mic size={20} />
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-xl md:rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-blue-500/30">
              <Send size={18} fill="currentColor" />
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default QuantumChat;