import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  ListMusic, Headphones, Mic2, Loader2, Music4,
  Clock, BookOpen
} from 'lucide-react';

const Listen = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");
  
  const audioRef = useRef(new Audio());
  const pollingRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    fetchNotes();
    const audio = audioRef.current;
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      audio.pause();
      audio.src = "";
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startPolling = (noteId) => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(async () => {
      try {
        const res = await axios.get(`http://localhost:8000/notes/${noteId}`);
        if (res.data.audio_url) {
          clearInterval(pollingRef.current);
          pollingRef.current = null;
          setStatusMsg("");
          setNotes(prev => prev.map(n => n.id === noteId ? res.data : n));
          setCurrentNote(res.data);
          playAudio(res.data.audio_url);
        }
      } catch (e) {
        clearInterval(pollingRef.current);
      }
    }, 5000); 
  };

  const handleAction = async (note) => {
    if (currentNote?.id === note.id && audioRef.current.src) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
      return;
    }
    setCurrentNote(note);
    if (!note.audio_url) {
      try {
        const res = await axios.post(`http://localhost:8000/notes/${note.id}/text-to-speech`);
        if (res.data.status === "processing") {
          setStatusMsg(`Generating Audio... ${res.data.estimated_time}`);
          startPolling(note.id);
        } else {
          playAudio(res.data.audio_url);
        }
      } catch (err) { alert("Server is busy. Try again soon."); }
    } else {
      playAudio(note.audio_url);
    }
  };

  const playAudio = (url) => {
    audioRef.current.src = url;
    audioRef.current.load();
    audioRef.current.play().then(() => setIsPlaying(true));
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
      <p className="text-slate-400 font-medium tracking-wider text-xs">LOADING YOUR LIBRARY</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 p-6 md:p-12 pb-44">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center gap-10 mb-16 max-w-6xl mx-auto">
        <div className="w-56 h-56 md:w-64 md:h-64 bg-white rounded-[2.5rem] shadow-xl shadow-blue-100 flex items-center justify-center relative overflow-hidden border border-slate-100">
          {statusMsg ? (
             <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                <Loader2 className="animate-spin text-blue-600 mb-3" size={28} />
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{statusMsg}</p>
             </div>
          ) : (
            <Headphones size={80} className="text-blue-100" />
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 uppercase">AI Learning</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 mb-4">
            {currentNote?.title || "Audio Summaries"}
          </h1>
          <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
            <BookOpen size={16} /> {currentNote?.subject || "Select a module to begin"}
          </p>
        </div>
      </header>

      {/* Track List */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-12 px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
          <div className="col-span-1">#</div>
          <div className="col-span-8">Module Details</div>
          <div className="col-span-3 text-right">Status</div>
        </div>

        {notes.map((note, index) => (
          <div 
            key={note.id}
            onClick={() => handleAction(note)}
            className={`grid grid-cols-12 items-center px-8 py-5 cursor-pointer transition-all border-b border-slate-50 last:border-0 ${
              currentNote?.id === note.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'
            }`}
          >
            <div className="col-span-1 text-sm font-semibold text-slate-400">
              {currentNote?.id === note.id && isPlaying ? <div className="w-2 h-4 flex gap-0.5 items-end"><div className="w-1 bg-blue-600 animate-pulse h-full"/><div className="w-1 bg-blue-600 animate-pulse h-1/2"/></div> : index + 1}
            </div>
            <div className="col-span-8">
              <h3 className={`font-bold text-base ${currentNote?.id === note.id ? 'text-blue-700' : 'text-slate-700'}`}>{note.title}</h3>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-tight">{note.subject} • Semester {note.semester}</p>
            </div>
            <div className="col-span-3 text-right">
              {note.audio_url ? (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold ${currentNote?.id === note.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {currentNote?.id === note.id && isPlaying ? "PLAYING" : "READY"}
                  <Play size={12} fill="currentColor" />
                </div>
              ) : (
                <Mic2 size={16} className="inline text-slate-200" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Player Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-28 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 md:px-12 flex items-center z-50">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          
          <div className="flex items-center gap-4 w-1/4">
            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
              <Music4 size={24} />
            </div>
            <div className="hidden lg:block overflow-hidden">
              <h4 className="text-sm font-bold text-slate-800 truncate">{currentNote?.title || "Choose a Note"}</h4>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter italic">AI Assistant Reading</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1 max-w-lg">
            <div className="flex items-center gap-8">
              <SkipBack className="text-slate-300 hover:text-blue-600 cursor-pointer transition-colors" size={20} />
              <button 
                onClick={() => {
                   if (isPlaying) audioRef.current.pause();
                   else if (audioRef.current.src) audioRef.current.play();
                   setIsPlaying(!isPlaying);
                }}
                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
              >
                {isPlaying ? <Pause fill="white" size={20} /> : <Play fill="white" size={20} className="ml-0.5" />}
              </button>
              <SkipForward className="text-slate-300 hover:text-blue-600 cursor-pointer transition-colors" size={20} />
            </div>
            
            <div className="w-full flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 w-8 text-right">{formatTime(progress)}</span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full relative cursor-pointer overflow-hidden">
                <div className="absolute h-full bg-blue-600" style={{ width: `${(progress / duration) * 100}%` }} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 w-8">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end gap-6 w-1/4">
            <div className="flex items-center gap-2 text-slate-400">
              <Volume2 size={18} />
              <div className="w-20 h-1 bg-slate-100 rounded-full"><div className="w-1/2 h-full bg-slate-300 rounded-full"/></div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Listen;