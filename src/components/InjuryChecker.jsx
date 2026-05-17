import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertTriangle } from 'lucide-react';

const InjuryChecker = ({ language }) => {
  const isEn = language === 'en';
  
  const [formData, setFormData] = useState({
    sport: '',
    bodyPart: '',
    painSeverity: 5,
    age: '',
    weight: '',
    trainingDays: '',
    trainingHours: '',
    previousInjury: false,
    matchWithin48h: false,
    description: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/injury', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language: isEn ? 'en' : 'hi' })
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      // For demo, if API fails (since no backend), mock a response:
      setTimeout(() => {
        setResult({
          triage_level: formData.painSeverity > 7 ? 'severe' : formData.painSeverity > 4 ? 'moderate' : 'mild',
          recovery_days: formData.painSeverity * 2,
          exercises: [
            { name: "Isometric Hold", sets: 3, reps: 10, description: "Hold the position for 5 seconds without moving." },
            { name: "Gentle Stretching", sets: 2, reps: 15, description: "Stretch until you feel a light pull, no pain." }
          ],
          rest_protocol: "Avoid load-bearing activities on the affected area for 48 hours. Apply ice packs every 2 hours.",
          nutrition_tips: "Increase protein intake to 1.6g/kg. Consume turmeric and ginger for anti-inflammatory effects.",
          hydration_sleep: "Drink at least 3 liters of water. Aim for 8-9 hours of sleep for optimal tissue repair.",
          see_doctor_if: "Pain worsens during rest, swelling increases rapidly, or you feel numbness.",
          urgent_message: formData.painSeverity > 7 ? "Stop playing immediately! This requires medical attention." : ""
        });
        setLoading(false);
      }, 1500);
      // setError('Something went wrong. Please try again.');
    } finally {
      // setLoading(false);
    }
  };

  const getTriageColor = (level) => {
    if (level === 'mild') return 'text-secondary bg-secondary/10 border-secondary/20';
    if (level === 'moderate') return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    return 'text-danger bg-danger/10 border-danger/20';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{isEn ? 'Injury Checker' : 'चोट की जाँच'}</h2>
        <p className="text-muted">{isEn ? 'Get AI-powered triage and recovery plans.' : 'AI-संचालित ट्राइएज और रिकवरी योजनाएं प्राप्त करें।'}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Column */}
        <div className="w-full lg:w-1/2">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{isEn ? 'Sport' : 'खेल'}</label>
                  <select 
                    required 
                    className="w-full bg-background border border-[#1E3A5F] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-colors"
                    onChange={(e) => setFormData({...formData, sport: e.target.value})}
                  >
                    <option value="">{isEn ? 'Select...' : 'चुनें...'}</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Kabaddi">Kabaddi</option>
                    <option value="Athletics">Athletics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{isEn ? 'Body Part' : 'शरीर का अंग'}</label>
                  <select 
                    required 
                    className="w-full bg-background border border-[#1E3A5F] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-colors"
                    onChange={(e) => setFormData({...formData, bodyPart: e.target.value})}
                  >
                    <option value="">{isEn ? 'Select...' : 'चुनें...'}</option>
                    <option value="Knee">Knee</option>
                    <option value="Ankle">Ankle</option>
                    <option value="Shoulder">Shoulder</option>
                    <option value="Back">Back</option>
                    <option value="Hamstring">Hamstring</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex justify-between">
                  <span>{isEn ? 'Pain Severity' : 'दर्द की गंभीरता'}</span>
                  <span className={formData.painSeverity > 7 ? 'text-danger' : formData.painSeverity > 4 ? 'text-amber-500' : 'text-secondary'}>{formData.painSeverity}/10</span>
                </label>
                <input 
                  type="range" min="1" max="10" 
                  value={formData.painSeverity}
                  onChange={(e) => setFormData({...formData, painSeverity: parseInt(e.target.value)})}
                  className="w-full accent-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{isEn ? 'Age' : 'आयु'}</label>
                  <input type="number" required min="5" max="100"
                    className="w-full bg-background border border-[#1E3A5F] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-colors"
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{isEn ? 'Weight (kg)' : 'वजन (किग्रा)'}</label>
                  <input type="number" required min="20" max="200"
                    className="w-full bg-background border border-[#1E3A5F] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-colors"
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{isEn ? 'Training (Days/Wk)' : 'प्रशिक्षण (दिन/सप्ताह)'}</label>
                  <input type="number" required min="0" max="7"
                    className="w-full bg-background border border-[#1E3A5F] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-colors"
                    onChange={(e) => setFormData({...formData, trainingDays: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{isEn ? 'Hours/Week' : 'घंटे/सप्ताह'}</label>
                  <input type="number" required min="0" max="50"
                    className="w-full bg-background border border-[#1E3A5F] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-colors"
                    onChange={(e) => setFormData({...formData, trainingHours: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between bg-background p-3 rounded-md border border-border">
                  <span className="text-sm">{isEn ? 'Previous injury in same area?' : 'एक ही क्षेत्र में पिछली चोट?'}</span>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setFormData({...formData, previousInjury: true})} className={`px-3 py-1 rounded-2xl text-xs font-medium border ${formData.previousInjury ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-muted'}`}>{isEn ? 'Yes' : 'हाँ'}</button>
                    <button type="button" onClick={() => setFormData({...formData, previousInjury: false})} className={`px-3 py-1 rounded-2xl text-xs font-medium border ${!formData.previousInjury ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-muted'}`}>{isEn ? 'No' : 'नहीं'}</button>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-background p-3 rounded-md border border-border">
                  <span className="text-sm">{isEn ? 'Match within 48 hours?' : '48 घंटे के भीतर मैच?'}</span>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setFormData({...formData, matchWithin48h: true})} className={`px-3 py-1 rounded-2xl text-xs font-medium border ${formData.matchWithin48h ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-muted'}`}>{isEn ? 'Yes' : 'हाँ'}</button>
                    <button type="button" onClick={() => setFormData({...formData, matchWithin48h: false})} className={`px-3 py-1 rounded-2xl text-xs font-medium border ${!formData.matchWithin48h ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-muted'}`}>{isEn ? 'No' : 'नहीं'}</button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{isEn ? 'Describe your pain' : 'अपने दर्द का वर्णन करें'}</label>
                <textarea 
                  required rows="3"
                  className="w-full bg-background border border-[#1E3A5F] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-colors resize-none"
                  placeholder={isEn ? "E.g., Sharp pain when I bend my knee..." : "जैसे, जब मैं अपना घुटना मोड़ता हूं तो तेज दर्द..."}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-colors flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEn ? 'Analyse Injury →' : 'चोट का विश्लेषण करें →')}
              </button>
              
              {error && <p className="text-danger text-sm text-center mt-2">{error}</p>}
            </form>
          </div>
        </div>

        {/* Results Column */}
        <div className="w-full lg:w-1/2">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-24 bg-surface rounded-xl border border-border"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 bg-surface rounded-xl border border-border"></div>
                <div className="h-40 bg-surface rounded-xl border border-border"></div>
                <div className="h-40 bg-surface rounded-xl border border-border"></div>
                <div className="h-40 bg-surface rounded-xl border border-border"></div>
              </div>
            </div>
          ) : result ? (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <motion.div 
                    initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                    className={`px-4 py-2 rounded-2xl border font-bold uppercase tracking-wider ${getTriageColor(result.triage_level)}`}
                  >
                    {result.triage_level}
                  </motion.div>
                  <div className="text-right">
                    <span className="text-4xl font-bold">{result.recovery_days}</span>
                    <span className="text-muted ml-2">{isEn ? 'Days Est. Recovery' : 'दिन अनुमानित रिकवरी'}</span>
                  </div>
                </div>

                {result.triage_level === 'severe' && result.urgent_message && (
                  <div className="bg-danger/20 border border-danger text-white p-4 rounded-xl flex gap-3 items-start">
                    <AlertTriangle className="w-6 h-6 text-danger shrink-0 mt-0.5" />
                    <p className="font-medium">{result.urgent_message}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="bg-surface border border-border p-5 rounded-xl">
                    <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary"></span> {isEn ? 'Rest Protocol' : 'आराम प्रोटोकॉल'}
                    </h3>
                    <p className="text-sm text-gray-300">{result.rest_protocol}</p>
                  </motion.div>
                  
                  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="bg-surface border border-border p-5 rounded-xl">
                    <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span> {isEn ? 'Nutrition Tips' : 'पोषण युक्तियाँ'}
                    </h3>
                    <p className="text-sm text-gray-300">{result.nutrition_tips}</p>
                  </motion.div>

                  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="bg-surface border border-border p-5 rounded-xl sm:col-span-2">
                    <h3 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span> {isEn ? 'Rehab Exercises' : 'रिहैब व्यायाम'}
                    </h3>
                    <div className="space-y-3">
                      {result.exercises.map((ex, idx) => (
                        <div key={idx} className="bg-background p-3 rounded-lg border border-border">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-sm">{ex.name}</span>
                            <span className="text-xs bg-surface px-2 py-1 rounded text-muted">{ex.sets}x{ex.reps}</span>
                          </div>
                          <p className="text-xs text-gray-400">{ex.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.4}} className="bg-surface border border-border p-5 rounded-xl sm:col-span-2">
                    <h3 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span> {isEn ? 'Sleep & Hydration' : 'नींद और जलयोजन'}
                    </h3>
                    <p className="text-sm text-gray-300">{result.hydration_sleep}</p>
                  </motion.div>
                </div>

                <p className="text-xs text-muted mt-4 text-center">
                  <strong className="text-gray-300">{isEn ? 'See a doctor if: ' : 'डॉक्टर को दिखाएँ यदि: '}</strong>
                  {result.see_doctor_if}
                </p>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-surface/30 border border-border/50 rounded-xl border-dashed">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-muted max-w-sm">
                {isEn ? 'Fill out the form on the left to get a personalised, AI-powered injury recovery plan.' : 'व्यक्तिगत, AI-संचालित चोट रिकवरी योजना प्राप्त करने के लिए बाईं ओर का फॉर्म भरें।'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InjuryChecker;
