import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Home, BookOpen, Headphones, MessageSquare, Download, Sun, Moon 
} from "lucide-react";

const Navigation = ({ isDarkMode, toggleTheme, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", path: "/", icon: <Home size={20} /> },
    { id: "read", label: "Read Notes", path: "/reader", icon: <BookOpen size={20} /> },
    { id: "listen", label: "Listen Mode", path: "/listen", icon: <Headphones size={20} /> },
    { id: "chat", label: "Ask AI Chat", path: "/chat", icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#131313] text-slate-900 dark:text-[#e5e2e1] transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full h-16 bg-white/80 dark:bg-[#1C1B1B]/60 backdrop-blur-xl z-50 flex justify-between items-center px-6 md:px-12 border-b border-slate-200 dark:border-white/5">
        <span className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-400 cursor-pointer" onClick={() => navigate("/")}>
          StudyHub
        </span>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-yellow-400 border border-slate-200 dark:border-white/10">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-[#2A2A2A] overflow-hidden border border-blue-200 dark:border-white/10">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-64px)] bg-white dark:bg-[#1C1B1B] border-r border-slate-200 dark:border-white/5 p-6 sticky top-16">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-bold"
                    : "text-slate-500 dark:text-[#C2C6D6] hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span className="text-[10px] uppercase font-bold tracking-[0.1em]">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5">
            <button className="w-full py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-blue-500/20">
              <Download size={18} /> Offline
            </button>
          </div>
        </aside>

        {/* Main Content Page Container */}
        <main className="flex-1 pb-24 md:pb-0">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <footer className="md:hidden fixed bottom-0 w-full h-20 bg-white/95 dark:bg-[#1C1B1B]/95 backdrop-blur-md border-t border-slate-200 dark:border-white/5 flex items-center justify-around px-4 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1.5 flex-1 transition-colors ${
              location.pathname === item.path ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-[#C2C6D6]"
            }`}
          >
            {item.icon}
            <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </footer>
    </div>
  );
};

export default Navigation;