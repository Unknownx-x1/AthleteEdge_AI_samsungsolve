import React from 'react';
import { Activity, Leaf, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const sports = ['Cricket', 'Football', 'Kabaddi', 'Athletics', 'Wrestling', 'Kho-Kho', 'Hockey'];

const Dashboard = ({ language, setActiveTab }) => {
  const isEn = language === 'en';

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          {isEn ? 'Now Available Nationwide' : 'अब देश भर में उपलब्ध'}
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
          {isEn ? 'Your Personal Sports Coach & Doctor — ' : 'आपका व्यक्तिगत खेल कोच और डॉक्टर — '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            {isEn ? 'Free, Forever' : 'हमेशा के लिए मुफ़्त'}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto">
          {isEn ? "Built for 500 million Indian athletes who can't afford professional guidance. Get AI-powered triage, nutrition, and 24/7 coaching." : "50 करोड़ भारतीय एथलीटों के लिए बनाया गया जो पेशेवर मार्गदर्शन का खर्च नहीं उठा सकते।"}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('injury')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-blue-600 text-white font-medium flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1"
          >
            {isEn ? 'Check an Injury' : 'चोट की जांच करें'} <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setActiveTab('nutrition')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface border border-border hover:bg-border hover:text-white text-gray-300 font-medium flex items-center justify-center gap-2 transition-all hover:-translate-y-1"
          >
            {isEn ? 'Get Meal Plan' : 'भोजन योजना प्राप्त करें'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium text-muted bg-surface/50 border border-border p-4 rounded-2xl mx-auto max-w-3xl backdrop-blur-sm">
          <div className="flex flex-col items-center p-2"><span className="text-white text-xl font-bold">500M+</span><span className="text-xs">{isEn ? 'Athletes' : 'एथलीट'}</span></div>
          <div className="flex flex-col items-center p-2"><span className="text-emerald-400 text-xl font-bold">₹0</span><span className="text-xs">{isEn ? 'Cost' : 'लागत'}</span></div>
          <div className="flex flex-col items-center p-2"><span className="text-white text-xl font-bold">24/7</span><span className="text-xs">{isEn ? 'Available Offline' : 'ऑफ़लाइन उपलब्ध'}</span></div>
          <div className="flex flex-col items-center p-2"><span className="text-white text-xl font-bold">6</span><span className="text-xs">{isEn ? 'Languages' : 'भाषाएँ'}</span></div>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          onClick={() => setActiveTab('injury')}
          className="bg-surface border border-border rounded-2xl p-8 cursor-pointer hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-primary/20"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="p-4 bg-primary/10 rounded-xl text-primary border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Activity className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full uppercase tracking-wider">
              {isEn ? 'AI Triage' : 'AI ट्राइएज'}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors relative z-10">
            {isEn ? 'Injury Recovery' : 'चोट से उबरना'}
          </h3>
          <p className="text-muted text-sm leading-relaxed relative z-10">
            {isEn ? 'Get immediate triage, recovery days, and personalized rehab exercises for your sports injuries instantly.' : 'अपनी खेल चोटों के लिए तत्काल ट्राइएज, रिकवरी के दिन और रिहैब व्यायाम प्राप्त करें।'}
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          onClick={() => setActiveTab('nutrition')}
          className="bg-surface border border-border rounded-2xl p-8 cursor-pointer hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-secondary/20"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="p-4 bg-secondary/10 rounded-xl text-secondary border border-secondary/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Leaf className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold px-3 py-1 bg-secondary/20 text-secondary border border-secondary/30 rounded-full uppercase tracking-wider">
              {isEn ? 'Local Diet' : 'भारतीय भोजन'}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-3 group-hover:text-secondary transition-colors relative z-10">
            {isEn ? 'Nutrition Planner' : 'पोषण योजनाकार'}
          </h3>
          <p className="text-muted text-sm leading-relaxed relative z-10">
            {isEn ? 'Generate custom, budget-friendly meal plans based on your sport and local Indian ingredients.' : 'स्थानीय भारतीय आहार का उपयोग करके अपने खेल, लक्ष्य और बजट के आधार पर कस्टम भोजन योजनाएं।'}
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          onClick={() => setActiveTab('chat')}
          className="bg-surface border border-border rounded-2xl p-8 cursor-pointer hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(96,165,250,0.15)] transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-blue-500/20"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="p-4 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <MessageCircle className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full uppercase tracking-wider">
              {isEn ? '24/7 Access' : '24/7'}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors relative z-10">
            {isEn ? 'Coach & Doctor' : 'कोच और डॉक्टर चैट'}
          </h3>
          <p className="text-muted text-sm leading-relaxed relative z-10">
            {isEn ? 'Ask questions anytime. Switch between Coach mode for performance and Doctor mode for medical advice.' : 'कभी भी प्रश्न पूछें। प्रदर्शन के लिए कोच और चिकित्सा सलाह के लिए डॉक्टर के बीच स्विच करें।'}
          </p>
        </motion.div>
      </motion.div>

      <div className="text-center pt-8 border-t border-border/50 max-w-4xl mx-auto">
        <p className="text-xs text-muted mb-6 uppercase tracking-[0.2em] font-semibold">{isEn ? 'Supported Sports' : 'लोकप्रिय खेल'}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {sports.map((sport, i) => (
            <motion.div 
              key={sport} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + (i * 0.05) }}
              className="px-5 py-2.5 rounded-full bg-surface border border-border text-sm text-gray-300 hover:bg-background hover:text-white hover:border-primary/40 transition-all cursor-default shadow-sm"
            >
              {sport}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
