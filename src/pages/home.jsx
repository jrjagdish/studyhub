import React, { useState } from "react";
import {
  Database,
  Terminal,
  Cpu,
  Sigma,
  PlayCircle,
  Search,
  Headphones,
  MoreVertical,
} from "lucide-react";

const StudyHub = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const subjects = [
    {
      id: 1,
      name: "DBMS",
      icon: <Database size={22} />,
      color: "border-blue-500",
      progress: "74%",
      desc: "Relational Algebra & SQL",
    },
    {
      id: 2,
      name: "C++",
      icon: <Terminal size={22} />,
      color: "border-red-500",
      progress: "30%",
      desc: "Pointers & Memory",
    },
    {
      id: 3,
      name: "OS",
      icon: <Cpu size={22} />,
      color: "border-amber-500",
      progress: "50%",
      desc: "Concurrency & Kernels",
    },
    {
      id: 4,
      name: "Math",
      icon: <Sigma size={22} />,
      color: "border-purple-500",
      progress: "80%",
      desc: "Discrete Structures",
    },
  ];

  return (
    <div className="p-6 md:p-12 overflow-x-hidden">
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
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1C1B1B] border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-sm dark:shadow-none"
        />
      </div>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {subjects
          .filter((s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((sub) => (
            <div
              key={sub.id}
              className={`group bg-white dark:bg-[#1C1B1B] p-6 rounded-2xl border-b-4 ${sub.color} shadow-sm dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-50 dark:bg-[#2A2A2A] rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  {sub.icon}
                </div>
                <button className="text-slate-300 hover:text-slate-600 dark:hover:text-white">
                  <MoreVertical size={18} />
                </button>
              </div>
              <h3 className="text-xl font-bold mb-1">{sub.name}</h3>
              <p className="text-xs text-slate-500 dark:text-[#C2C6D6] mb-5">
                {sub.desc}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span>Progress</span>
                  <span>{sub.progress}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-1000"
                    style={{ width: sub.progress }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Featured AI Audiobook Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 md:p-12 shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-20 hidden lg:block">
          <Headphones
            size={200}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>
        <div className="relative z-10 max-w-xl">
          <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-6 block w-fit">
            AI-Generated Audiobook
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Master DBMS while you walk.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-8">
            We've turned your complex 40-page DBMS PDF into a clear, 5-minute
            audio summary focusing on Normalization and Joins.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-slate-900 dark:bg-blue-500 text-white py-4 px-10 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
              <PlayCircle size={24} /> Listen Now
            </button>
            <button className="bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white py-4 px-10 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              View Notes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudyHub;