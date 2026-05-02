import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Database,
  Terminal,
  Cpu,
  Sigma,
  PlayCircle,
  Search,
  Headphones,
  MoreVertical,
  Loader2,
  ArrowLeft,
  Download
} from "lucide-react";

const StudyHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState(null); // Track the URL for the iframe

  const iconMap = {
    "DBMS": <Database size={22} />,
    "C++": <Terminal size={22} />,
    "OS": <Cpu size={22} />,
    "Math": <Sigma size={22} />,
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleReadPDF = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/notes/${id}`);
      // response.data should be the Cloudinary URL string
      setSelectedPdf(response.data);
    } catch (error) {
      alert("Could not load PDF. Please check your backend connection.");
    }
  };

  // --- SUB-COMPONENT: READER PAGE ---
  if (selectedPdf) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-[#0F0F0F] flex flex-col animate-in fade-in duration-300">
        <nav className="h-16 border-b dark:border-white/10 flex items-center justify-between px-6 bg-white dark:bg-[#1C1B1B]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedPdf(null)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="font-bold hidden md:block">Document Reader</h2>
          </div>
          
          <div className="flex items-center gap-3">
             <a 
              href={selectedPdf} 
              download 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
            >
              <Download size={18} /> Download Offline
            </a>
          </div>
        </nav>

        <div className="flex-1 bg-slate-200 dark:bg-black overflow-hidden relative">
          <iframe
            src={`${selectedPdf}#toolbar=0&navpanes=0`}
            title="PDF Reader"
            className="w-full h-full border-none shadow-2xl"
          />
        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD ---
  return (
    <div className="p-6 md:p-12 overflow-x-hidden min-h-screen bg-slate-50 dark:bg-[#0F0F0F] dark:text-white">
      <header className="mb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-3">
          BCA Portal
        </h1>
        <p className="text-slate-500 dark:text-[#C2C6D6] text-lg max-w-xl font-medium leading-relaxed">
          Your syllabus, automated. Read PDFs or listen to AI-summaries.
        </p>
      </header>

      {/* Search Bar */}
      <div className="relative mb-10 max-w-2xl group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
          size={20}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for subjects, notes, or assignments..."
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1C1B1B] border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-sm"
        />
      </div>

      {/* Subject Grid */}
      {loading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {notes
            .filter((n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((note) => (
              <div
                key={note.id}
                onClick={() => handleReadPDF(note.id)}
                className="group bg-white dark:bg-[#1C1B1B] p-6 rounded-2xl border-b-4 border-blue-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-50 dark:bg-[#2A2A2A] rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    {iconMap[note.title] || <Database size={22} />}
                  </div>
                  <button className="text-slate-300 hover:text-slate-600">
                    <MoreVertical size={18} />
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-1">{note.title}</h3>
                <p className="text-xs text-slate-500 mb-5">
                  Click to view full notes
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span>Status</span>
                    <span>Ready</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-full transition-all duration-700"></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Featured AI Audiobook Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 md:p-12 shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 hidden lg:block">
          <Headphones size={200} className="text-blue-600" />
        </div>
        <div className="relative z-10 max-w-xl">
          <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-6 block w-fit">
            AI-Generated Audiobook
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Master DBMS while you walk.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-8">
            Listen to a clear, 5-minute audio summary focusing on Normalization and Joins.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-slate-900 dark:bg-blue-500 text-white py-4 px-10 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform">
              <PlayCircle size={24} /> Listen Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyHub;