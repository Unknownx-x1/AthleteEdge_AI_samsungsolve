import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Zap, Stethoscope, Activity } from 'lucide-react';

const CoachChat = ({ language }) => {
  const isEn = language === 'en';
  
  const [mode, setMode] = useState('coach'); // 'coach' | 'doctor'
  const [messages, setMessages] = useState([
    { role: 'bot', content: isEn ? "Hi there! I'm your AthleteEdge Assistant. How can I help you improve your game today?" : "नमस्ते! मैं आपका एथलीटएज सहायक हूँ। आज मैं आपके खेल को बेहतर बनाने में कैसे मदद कर सकता हूँ?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    const newMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
          mode: mode,
          language: isEn ? 'en' : 'hi'
        })
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
    } catch (err) {
      setTimeout(() => {
        const reply = mode === 'coach' 
          ? (isEn ? "To recover faster, focus on **sleep (8+ hours)**, hydration, and consuming 20-30g of protein within 30 mins of your session.\n\n- Try contrast baths\n- Active recovery (light walking)\n- Foam rolling" : "तेजी से रिकवर होने के लिए, **नींद (8+ घंटे)**, जलयोजन पर ध्यान दें, और सत्र के 30 मिनट के भीतर 20-30 ग्राम प्रोटीन लें।")
          : (isEn ? "If you have knee pain, please stop high-impact activities. Apply ice for 15 mins every 2 hours. If it swells, **see a doctor immediately**. Rest is crucial right now." : "यदि आपको घुटने में दर्द है, तो कृपया उच्च प्रभाव वाली गतिविधियां बंद कर दें। हर 2 घंटे में 15 मिनट के लिए बर्फ लगाएं।");
        setMessages(prev => [...prev, { role: 'bot', content: reply }]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const quickPrompts = isEn ? [
    "How do I recover faster?", "What to eat before a match?", 
    "I have knee pain", "How to improve stamina?", 
    "First aid for muscle cramp"
  ] : [
    "मैं तेजी से कैसे रिकवर करूँ?", "मैच से पहले क्या खाएं?", 
    "मेरे घुटने में दर्द है", "स्टेमिना कैसे बढ़ाएं?", 
    "मांसपेशियों में ऐंठन के लिए प्राथमिक उपचार"
  ];

  // Simple markdown renderer for bold and lists
  const renderMarkdown = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Bold
      let formattedLine = line;
      const parts = formattedLine.split(/(\*\*.*?\*\*)/g);
      
      const elements = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-white">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (line.trim().startsWith('- ')) {
        return <li key={i} className="ml-4 list-disc marker:text-primary">{elements.slice(1)}</li>;
      }
      return <p key={i} className={i !== lines.length - 1 ? 'mb-2' : ''}>{elements}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">{isEn ? 'Coach & Doctor Chat' : 'कोच और डॉक्टर चैट'}</h2>
        <p className="text-muted">{isEn ? 'Get 24/7 instant advice for training and medical queries.' : 'प्रशिक्षण और चिकित्सा प्रश्नों के लिए 24/7 त्वरित सलाह प्राप्त करें।'}</p>
      </div>

      <div className="bg-surface border border-border rounded-xl flex flex-col h-[600px] shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-border p-4 bg-background/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                {mode === 'coach' ? <Activity className="w-5 h-5 text-primary" /> : <Stethoscope className="w-5 h-5 text-danger" />}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-surface"></div>
            </div>
            <div>
              <h3 className="font-semibold text-sm">
                AthleteEdge {mode === 'coach' ? (isEn ? 'Coach' : 'कोच') : (isEn ? 'Doctor' : 'डॉक्टर')}
              </h3>
              <p className="text-xs text-secondary">{isEn ? 'Online' : 'ऑनलाइन'}</p>
            </div>
          </div>
          
          <div className="flex bg-background rounded-lg border border-border p-1">
            <button 
              onClick={() => setMode('coach')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === 'coach' ? 'bg-primary text-white' : 'text-muted hover:text-gray-300'}`}
            >
              {isEn ? 'Coach Mode' : 'कोच मोड'}
            </button>
            <button 
              onClick={() => setMode('doctor')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${mode === 'doctor' ? 'bg-danger text-white' : 'text-muted hover:text-gray-300'}`}
            >
              {isEn ? 'Doctor Mode' : 'डॉक्टर मोड'}
            </button>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-background border border-border border-l-2 border-l-primary rounded-bl-none text-gray-300'
              }`}>
                {msg.role === 'bot' ? renderMarkdown(msg.content) : msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-background border border-border border-l-2 border-l-primary rounded-2xl rounded-bl-none px-4 py-3 flex gap-1 items-center h-10">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background">
          <div className="flex overflow-x-auto gap-2 pb-3 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button 
                key={i} onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1.5 bg-surface border border-border rounded-full text-xs text-muted hover:text-white hover:border-gray-500 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex items-center gap-2 relative"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isEn ? "Ask your coach or doctor..." : "अपने कोच या डॉक्टर से पूछें..."}
              className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary pr-12"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 top-2 bottom-2 w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white disabled:opacity-50 disabled:bg-surface disabled:text-muted transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default CoachChat;
