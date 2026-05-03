import React, { useState, useEffect } from "react";
import {
  Database, Terminal, Cpu, Sigma, PlayCircle, Search, 
  Headphones, MoreVertical, Loader2, ArrowLeft, Download, FileText
} from "lucide-react";

const StudyHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const iconMap = {
    "DBMS": <Database size={22} />,
    "C++": <Terminal size={22} />,
    "OS": <Cpu size={22} />,
    "Math": <Sigma size={22} />,
  };

  useEffect(() => {
    loadAllNotes();
  }, []);

  const loadAllNotes = async () => {
    try {
      const response = await fetch("http://localhost:8000/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReadPDF = async (id) => {
    setPdfLoading(true);
    try {
      // 1. Get the Cloudinary URL from FastAPI
      const response = await fetch(`http://localhost:8000/notes/${id}`);
      if (!response.ok) throw new Error("Failed to fetch document URL");
      
      let url = await response.json();

      // 2. Transform URL for inline viewing
      if (url.includes("cloudinary.com")) {
        // fl_inline tells the browser to render the PDF instead of downloading it
        url = url.replace("/upload/fl_inline/","/upload/");
      }

      setPdfUrl(url);
      setIsViewing(true);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Could not open PDF. Check backend and Cloudinary settings.");
    } finally {
      setPdfLoading(false);
    }
  };

  const closeReader = () => {
    setIsViewing(false);
    setPdfUrl(null);
  };

  // --- PDF READER VIEW ---
  if (isViewing && pdfUrl) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-[#0F0F0F] flex flex-col animate-in fade-in duration-300">
        <nav className="h-16 border-b dark:border-white/10 flex items-center justify-between px-6 bg-white dark:bg-[#1C1B1B]">
          <div className="flex items-center gap-4">
            <button onClick={closeReader} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-900 dark:text-white">
              <ArrowLeft size={24} />
            </button>
            <h2 className="font-bold dark:text-white">Document Reader</h2>
          </div>
          <div className="flex items-center gap-3">
             <a 
              href={pdfUrl.replace("/upload/fl_inline/", "/upload/")} 
              download
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700"
            >
              <Download size={18} /> Save Copy
            </a>
          </div>
        </nav>

        <div className="flex-1 bg-slate-700 flex justify-center overflow-hidden">
          {/* Using <object> is better for PDF embedding than <iframe> */}
          <object
            data={pdfUrl}
            type="application/pdf"
            className="w-full h-full"
          >
            {/* Fallback iframe */}
            <img src={pdfUrl} className="w-full h-full" title="PDF Reader" />
          </object>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="p-6 md:p-12 min-h-screen bg-slate-50 dark:bg-[#0F0F0F] dark:text-white">
      {pdfLoading && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl flex flex-col items-center">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
            <p className="font-bold">Opening Syllabus...</p>
          </div>
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-3">BCA Portal</h1>
        <p className="text-slate-500 dark:text-[#C2C6D6] text-lg max-w-xl font-medium">Your study material, simplified.</p>
      </header>

      <div className="relative mb-10 max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search subjects..."
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1C1B1B] border dark:border-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    {iconMap[note.title] || <FileText size={22} />}
                  </div>
                  <MoreVertical size={18} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold mb-1">{note.title}</h3>
                <p className="text-xs text-slate-500 mb-5 uppercase tracking-wider">Unit: {note.unit || "N/A"}</p>
                <div className="h-1 w-full bg-slate-100 dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-full"></div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default StudyHub;