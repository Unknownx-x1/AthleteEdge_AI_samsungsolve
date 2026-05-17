import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import InjuryChecker from './components/InjuryChecker';
import NutritionPlanner from './components/NutritionPlanner';
import CoachChat from './components/CoachChat';
import Footer from './components/Footer';

function App() {
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard language={language} setActiveTab={setActiveTab} />;
      case 'injury':
        return <InjuryChecker language={language} />;
      case 'nutrition':
        return <NutritionPlanner language={language} />;
      case 'chat':
        return <CoachChat language={language} />;
      default:
        return <Dashboard language={language} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-gray-50 pb-16 md:pb-0">
      <Navbar language={language} setLanguage={setLanguage} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pt-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer language={language} />

      {/* Mobile Bottom Tab Bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-border flex justify-around items-center h-16 z-50 px-2 pb-safe">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'dashboard' ? 'text-primary' : 'text-muted hover:text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeTab === 'dashboard' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="text-[10px] mt-1 font-medium">{language === 'en' ? 'Dashboard' : 'डैशबोर्ड'}</span>
          </button>
          <button 
            onClick={() => setActiveTab('injury')} 
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'injury' ? 'text-primary' : 'text-muted hover:text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeTab === 'injury' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span className="text-[10px] mt-1 font-medium">{language === 'en' ? 'Injury' : 'चोट'}</span>
          </button>
          <button 
            onClick={() => setActiveTab('nutrition')} 
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'nutrition' ? 'text-primary' : 'text-muted hover:text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeTab === 'nutrition' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            <span className="text-[10px] mt-1 font-medium">{language === 'en' ? 'Nutrition' : 'पोषण'}</span>
          </button>
          <button 
            onClick={() => setActiveTab('chat')} 
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'chat' ? 'text-primary' : 'text-muted hover:text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeTab === 'chat' ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
            <span className="text-[10px] mt-1 font-medium">{language === 'en' ? 'Chat' : 'चैट'}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
