"use client";
import React, { useState } from "react";
import {
  X,
  BookOpen,
  Search,
  Settings,
  ZoomOut,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Maximize2,
  Download,
  Sun,
  Moon
} from "lucide-react";

const QuantumReader = () => {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#131313] text-slate-900 dark:text-[#e5e2e1] transition-colors duration-300 font-sans selection:bg-blue-500/30">
      
      {/* Header Navigation */}
      <header className="fixed top-0 w-full h-16 bg-white/80 dark:bg-[#131313]/60 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 z-50 flex justify-between items-center px-4 md:px-8">
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-[#393939] transition-all rounded-lg group">
            <X size={20} className="text-slate-500 dark:text-[#C2C6D6] group-hover:text-blue-500" />
          </button>
          <div className="h-6 w-px bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
          <div className="flex flex-col">
            <h1 className="text-[10px] md:text-xs font-black uppercase tracking-tighter truncate max-w-[150px] md:max-w-none">
              Quantum Electrodynamics: Lec 04
            </h1>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Module 2 • Physics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-[#201f1f] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/5">
            <BookOpen size={14} className="text-blue-500" />
            <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-[#C2C6D6]">
              12 / 48
            </span>
          </div>
          
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-[#393939] rounded-lg text-slate-500 dark:text-[#C2C6D6]">
            <Search size={18} />
          </button>
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-[#393939] rounded-lg text-slate-500 dark:text-[#C2C6D6]">
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Main Reading Canvas */}
      {/* pb-44 ensures content clears both the floating reader bar AND the main app navigation */}
      <main className="pt-24 pb-44 px-4 md:px-12 flex flex-col items-center overflow-y-auto">
        
        <div className="max-w-4xl w-full flex flex-col gap-8 md:gap-12">
          
          {/* Simulated Page 1 */}
          <div className="relative bg-white dark:bg-[#1C1B1B] min-h-[600px] md:min-h-[1100px] w-full shadow-2xl shadow-slate-300 dark:shadow-black/50 p-6 md:p-20 flex flex-col overflow-hidden border border-slate-200 dark:border-white/5 rounded-xl md:rounded-none">
            
            {/* Design Flare */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="flex justify-between items-start border-b border-slate-100 dark:border-white/5 pb-8 mb-8 md:mb-12">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-black">
                  Physics Archive Series
                </span>
                <h2 className="text-3xl md:text-7xl font-black tracking-tighter leading-none">
                  THE QUANTUM <br /> FIELD
                </h2>
              </div>
              <span className="text-xl md:text-3xl font-light text-slate-300 dark:text-[#353534]">04.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-4 flex flex-col gap-6 md:gap-8">
                <div className="p-5 md:p-6 bg-slate-50 dark:bg-[#2A2A2A]/50 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-[9px] md:text-[10px] uppercase font-black tracking-widest mb-3 md:mb-4">Key Concepts</h3>
                  <ul className="space-y-2 md:space-y-3 text-[11px] md:text-xs font-medium text-slate-500 dark:text-[#C2C6D6]">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" /> Lagrangian Density</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" /> Gauge Invariance</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" /> Photon Propagators</li>
                  </ul>
                </div>
                <div className="aspect-[4/3] md:aspect-[3/4] bg-slate-100 dark:bg-[#2A2A2A] rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/5">
                    <div className="w-10 h-10 border-2 border-slate-300 dark:border-white/10 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="md:col-span-8">
                <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-[#C2C6D6] mb-6 md:mb-8 first-letter:text-5xl md:first-letter:text-6xl first-letter:font-black first-letter:text-blue-600 dark:first-letter:text-blue-400 first-letter:mr-2 md:first-letter:mr-3 first-letter:float-left">
                  Understanding the interaction between matter and light requires a fundamental shift in our perception of empty space. Instead of a void, we must conceptualize a series of overlapping fields that permeate every coordinate of our reality.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-[#C2C6D6] mb-8">
                  The Lagrangian for Quantum Electrodynamics (QED) is the most precise mathematical structure ever conceived by humanity.
                </p>
                <div className="relative py-6 md:py-8 px-6 md:px-10 my-8 md:my-12 italic text-xl md:text-2xl font-bold border-l-4 border-blue-500 bg-slate-50 dark:bg-[#201f1f] rounded-r-2xl">
                  "The universe is not made of things, but of patterns of energy."
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-slate-100 dark:border-white/5 flex justify-between text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <span>Academic Sanctuary 2026</span>
              <span className="hidden sm:block text-blue-500/50 underline decoration-blue-500/20 underline-offset-4">Internal Research</span>
              <span>Page 12</span>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Reader Controls 
          Fixed at bottom-24 on mobile to sit above the navigation bar
      */}
      <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1.5 bg-white/95 dark:bg-[#2A2A2A]/90 backdrop-blur-xl rounded-full border border-slate-200 dark:border-white/10 shadow-2xl z-40 scale-90 md:scale-100">
        <ControlButton onClick={() => setZoom(z => Math.max(z-10, 50))} icon={<ZoomOut size={18} />} />
        <div className="px-1 md:px-3 text-[10px] font-black uppercase tracking-tighter w-10 md:w-12 text-center">{zoom}%</div>
        <ControlButton onClick={() => setZoom(z => Math.min(z+10, 200))} icon={<ZoomIn size={18} />} />
        
        <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-1 md:mx-2" />
        
        <div className="flex items-center">
          <ControlButton icon={<ChevronLeft size={18} />} />
          <span className="text-[10px] font-bold text-slate-400 md:hidden px-2">12/48</span>
          <ControlButton icon={<ChevronRight size={18} />} />
        </div>
        
        <div className="hidden md:flex items-center">
            <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-2" />
            <ControlButton icon={<ChevronsLeft size={18} />} />
            <ControlButton icon={<ChevronsRight size={18} />} />
        </div>
      </div>

      {/* Fixed Action Buttons (Responsive) */}
      <div className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-40">
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#2A2A2A] text-blue-500 border border-slate-200 dark:border-white/10 shadow-lg hover:scale-110 transition-all">
            <Maximize2 size={20} />
        </button>
      </div>

      <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40">
        <button className="flex items-center justify-center md:justify-start gap-3 w-14 h-14 md:w-auto md:px-6 md:h-14 bg-blue-600 dark:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-xl shadow-blue-500/20 hover:translate-y-[-2px] transition-all">
          <Download size={20} />
          <span className="hidden md:block">Download PDF</span>
        </button>
      </div>

    </div>
  );
};

const ControlButton = ({ icon, onClick }) => (
  <button 
    onClick={onClick}
    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-[#C2C6D6] transition-all active:scale-90"
  >
    {icon}
  </button>
);

export default QuantumReader;