import React from 'react';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ language, setLanguage, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', labelEn: 'Dashboard', labelHi: 'डैशबोर्ड' },
    { id: 'injury', labelEn: 'Injury Check', labelHi: 'चोट जांच' },
    { id: 'nutrition', labelEn: 'Nutrition', labelHi: 'पोषण' },
    { id: 'chat', labelEn: 'Coach Chat', labelHi: 'कोच चैट' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-border z-40 flex items-center justify-between px-4 md:px-8">
      <div 
        className="flex items-center gap-2 cursor-pointer group" 
        onClick={() => setActiveTab('dashboard')}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary blur-md opacity-0 group-hover:opacity-40 transition-opacity rounded-full"></div>
          <Zap className="text-primary w-6 h-6 fill-primary relative z-10 drop-shadow-[0_0_5px_rgba(59,130,246,0.6)]" />
        </div>
        <span className="font-bold text-xl tracking-tight transition-colors group-hover:text-white">
          AthleteEdge <span className="text-primary">AI</span>
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-2 text-sm font-medium">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative px-4 py-2 rounded-full transition-colors ${
              activeTab === item.id ? 'text-white' : 'text-muted hover:text-gray-200'
            }`}
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{language === 'en' ? item.labelEn : item.labelHi}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block px-3 py-1 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold tracking-wide shadow-[0_0_10px_rgba(16,185,129,0.15)]">
          {language === 'en' ? 'FREE FOR ATHLETES' : 'एथलीटों के लिए मुफ्त'}
        </div>
        <button 
          onClick={() => setLanguage(lang => lang === 'en' ? 'hi' : 'en')}
          className="px-3 py-1.5 rounded-2xl bg-surface border border-border hover:bg-border transition-colors text-xs font-medium"
        >
          {language === 'en' ? 'EN / हिं' : 'हिं / EN'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
