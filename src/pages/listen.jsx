import React, { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  ListMusic, MoreVertical, Headphones, Search,
  Clock, Mic2, Heart, Share2
} from 'lucide-react';

const Listen = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playlist = [
    { id: '01', title: 'Neural Plasticity and Growth', duration: '45:20', speaker: 'Dr. Aris Thorne', status: 'completed' },
    { id: '02', title: 'Sensory Integration Systems', duration: '38:00', speaker: 'Unit 1 Summary', status: 'playing' },
    { id: '03', title: 'Executive Control Loops', duration: '52:15', speaker: 'Guest Lecture', status: 'idle' },
    { id: '04', title: 'Memory Consolidation', duration: '41:05', speaker: 'Dr. Aris Thorne', status: 'idle' },
  ];

  return (
    <div className="p-4 md:p-12 lg:p-16 pb-44 overflow-x-hidden bg-gradient-to-b from-blue-50/50 to-slate-50 dark:from-blue-900/10 dark:to-[#131313]">
      
      {/* Spotify-style Mobile Header */}
      <header className="flex flex-col items-center md:items-end md:flex-row gap-6 md:gap-8 mb-12 mt-4">
        <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-[#4d8eff] to-[#adc6ff] rounded-2xl md:rounded-[2rem] shadow-2xl flex items-center justify-center group relative overflow-hidden">
           <Headphones size={60} className="text-[#002e6a] md:hidden" />
           <Headphones size={80} className="text-[#002e6a] hidden md:block group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <span className="bg-blue-600 dark:bg-blue-500 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">BCA 301</span>
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">Psychology</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-tight mb-4">
            Cognitive<br className="hidden md:block"/> Architectures
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-4 text-slate-500 dark:text-slate-400">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-white dark:border-[#131313] bg-slate-300"></div>
              <div className="w-6 h-6 rounded-full border-2 border-white dark:border-[#131313] bg-slate-400"></div>
            </div>
            <p className="text-sm font-bold">4 Lectures • 2h 56m</p>
          </div>
        </div>
      </header>

      {/* Action Bar (Spotify style) */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-6">
          <button className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/40 transform active:scale-90 transition-transform">
            <Play fill="currentColor" size={28} />
          </button>
          <Heart size={24} className="text-slate-400 hover:text-red-500 cursor-pointer" />
          <Share2 size={24} className="text-slate-400 cursor-pointer" />
        </div>
        <Search size={24} className="text-slate-400 md:hidden" />
      </div>

      {/* Playlist */}
      <section className="space-y-1">
        {playlist.map((track) => (
          <div 
            key={track.id}
            className="group flex items-center justify-between p-3 rounded-lg transition-colors active:bg-slate-200 dark:active:bg-white/10 md:hover:bg-white/5"
          >
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="flex-shrink-0 w-4 text-center">
                {track.status === 'playing' ? <Mic2 size={16} className="text-blue-500 animate-pulse"/> : <span className="text-xs font-bold text-slate-400">{track.id}</span>}
              </div>
              <div className="overflow-hidden">
                <h3 className={`font-bold text-sm md:text-base truncate ${track.status === 'playing' ? 'text-blue-500' : ''}`}>
                  {track.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{track.speaker}</p>
              </div>
            </div>
            <MoreVertical size={20} className="text-slate-400 flex-shrink-0" />
          </div>
        ))}
      </section>

      {/* SPOTIFY MOBILE PLAYER BAR */}
      {/* This sits right above the Navigation Footer */}
      <footer className="fixed bottom-20 left-2 right-2 md:bottom-0 md:left-64 md:right-0 z-50">
        
        {/* Mobile Mini-Player (Visible on Small Screens) */}
        <div className="md:hidden bg-slate-900/95 dark:bg-[#282828]/95 backdrop-blur-md rounded-lg p-2 flex items-center justify-between shadow-2xl border border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-blue-600 rounded-md overflow-hidden flex-shrink-0 shadow-lg">
              <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Psych" alt="art" />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-[11px] font-bold text-white truncate">Sensory Integration Systems</h4>
              <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">Dr. Aris Thorne</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-2">
            <Headphones size={20} className="text-blue-400" />
            <button onClick={() => setIsPlaying(!isPlaying)} className="text-white">
              {isPlaying ? <Pause size={24} fill="currentColor"/> : <Play size={24} fill="currentColor"/>}
            </button>
          </div>
          {/* Mobile Progress Bar at bottom of mini-player */}
          <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/10">
            <div className="h-full bg-white w-1/3"></div>
          </div>
        </div>

        {/* Desktop Player (Visible on Medium+ Screens) */}
        <div className="hidden md:flex bg-white/95 dark:bg-[#1c1b1b]/95 backdrop-blur-2xl border-t border-slate-200 dark:border-white/5 h-24 items-center px-12 shadow-2xl">
          <div className="flex items-center gap-5 w-1/4">
            <div className="w-14 h-14 bg-blue-600 rounded-xl overflow-hidden shadow-lg">
              <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Psych" alt="art" />
            </div>
            <div>
              <h4 className="text-sm font-black">Sensory Integration</h4>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Lec 02 • Unit 1</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl px-8">
            <div className="flex items-center gap-8">
              <SkipBack size={20} className="text-slate-400 hover:text-blue-500 cursor-pointer" />
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black shadow-xl"
              >
                {isPlaying ? <Pause size={20} fill="currentColor"/> : <Play size={20} fill="currentColor" className="ml-1"/>}
              </button>
              <SkipForward size={20} className="text-slate-400 hover:text-blue-500 cursor-pointer" />
            </div>
            <div className="w-full flex items-center gap-3">
              <span className="text-[9px] font-bold text-slate-400">12:45</span>
              <div className="flex-1 h-1 bg-slate-200 dark:bg-white/10 rounded-full">
                <div className="h-full bg-blue-600 dark:bg-white w-1/3 rounded-full"></div>
              </div>
              <span className="text-[9px] font-bold text-slate-400">38:00</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-6 w-1/4">
            <Volume2 size={18} className="text-slate-400" />
            <ListMusic size={18} className="text-slate-400" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Listen;