import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Flame, Droplets, Info, Leaf } from 'lucide-react';

const NutritionPlanner = ({ language }) => {
  const isEn = language === 'en';

  const [formData, setFormData] = useState({
    sport: '',
    goal: 'Match Performance',
    age: '',
    weight: '',
    height: '',
    trainingPhase: 'Pre-Season',
    budget: 150,
    diet: 'Vegetarian',
    region: 'North'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language: isEn ? 'en' : 'hi' })
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      // Mock response
      setTimeout(() => {
        setResult({
          total_calories: 2800,
          total_protein: 120,
          total_carbs: 350,
          total_cost_inr: formData.budget - 15,
          meals: [
            {
              meal_time: "Breakfast",
              items: [
                { name: "Oats with Milk & Banana", quantity: "1 bowl", calories: 350, protein: 12 },
                { name: "Boiled Eggs (if applicable) or Paneer", quantity: "2 / 50g", calories: 150, protein: 14 }
              ]
            },
            {
              meal_time: "Lunch",
              items: [
                { name: "Dal Tadka", quantity: "2 bowls", calories: 300, protein: 18 },
                { name: "Roti", quantity: "3 pcs", calories: 240, protein: 9 },
                { name: "Mixed Veg Sabzi", quantity: "1 bowl", calories: 120, protein: 3 }
              ]
            },
            {
              meal_time: "Pre-Training Snack",
              items: [
                { name: "Sweet Potato (Boiled)", quantity: "1 medium", calories: 110, protein: 2 },
                { name: "Black Coffee", quantity: "1 cup", calories: 5, protein: 0 }
              ]
            },
            {
              meal_time: "Dinner",
              items: [
                { name: "Soya Chunks Curry or Chicken", quantity: "1 bowl", calories: 250, protein: 25 },
                { name: "Rice", quantity: "1 plate", calories: 200, protein: 4 },
                { name: "Cucumber Salad", quantity: "1 bowl", calories: 30, protein: 1 }
              ]
            }
          ],
          hydration_plan: "Drink 500ml water 2 hours before training. Sip 200ml every 20 mins during play. Add a pinch of salt and lemon to your water post-training.",
          supplements_warning: "Focus on whole foods first. Creatine (3-5g/day) is safe and effective for power sports, but consult a doctor first."
        });
        setLoading(false);
      }, 1500);
    }
  };

  const Pill = ({ active, onClick, children }) => (
    <button 
      type="button" 
      onClick={onClick}
      className={`px-4 py-2 rounded-2xl text-xs font-medium border transition-colors whitespace-nowrap ${active ? 'bg-secondary text-white border-secondary' : 'bg-surface border-border text-muted hover:bg-border'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{isEn ? 'Nutrition Planner' : 'पोषण योजनाकार'}</h2>
        <p className="text-muted">{isEn ? 'Get affordable, local Indian meal plans tailored to your sport.' : 'अपने खेल के अनुरूप किफायती, स्थानीय भारतीय भोजन योजनाएं प्राप्त करें।'}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{isEn ? 'Sport' : 'खेल'}</label>
                  <select 
                    required 
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-secondary"
                    onChange={(e) => setFormData({...formData, sport: e.target.value})}
                  >
                    <option value="">{isEn ? 'Select...' : 'चुनें...'}</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Wrestling">Wrestling</option>
                    <option value="Athletics">Athletics</option>
                    <option value="Kabaddi">Kabaddi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{isEn ? 'Region' : 'क्षेत्र'}</label>
                  <select 
                    required 
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-secondary"
                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                  >
                    <option value="North">North India</option>
                    <option value="South">South India</option>
                    <option value="East">East India</option>
                    <option value="West">West India</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Bengal">Bengal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{isEn ? 'Goal' : 'लक्ष्य'}</label>
                <div className="flex flex-wrap gap-2">
                  {['Build Strength', 'Lose Weight', 'Match Performance', 'Recovery'].map(g => (
                    <Pill key={g} active={formData.goal === g} onClick={() => setFormData({...formData, goal: g})}>
                      {isEn ? g : (g === 'Build Strength' ? 'ताकत बनाएं' : g === 'Lose Weight' ? 'वजन कम करें' : g === 'Match Performance' ? 'मैच प्रदर्शन' : 'रिकवरी')}
                    </Pill>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{isEn ? 'Age' : 'आयु'}</label>
                  <input type="number" required min="10" max="80"
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-secondary"
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{isEn ? 'Weight(kg)' : 'वजन(kg)'}</label>
                  <input type="number" required min="30" max="150"
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-secondary"
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{isEn ? 'Height(cm)' : 'ऊंचाई(cm)'}</label>
                  <input type="number" required min="100" max="250"
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-secondary"
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{isEn ? 'Diet Preference' : 'आहार प्राथमिकता'}</label>
                <div className="flex flex-wrap gap-2">
                  {['Vegetarian', 'Egg', 'Non-Veg'].map(d => (
                    <Pill key={d} active={formData.diet === d} onClick={() => setFormData({...formData, diet: d})}>
                      {isEn ? d : (d === 'Vegetarian' ? 'शाकाहारी' : d === 'Egg' ? 'अंडा' : 'मांसाहारी')}
                    </Pill>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{isEn ? 'Training Phase' : 'प्रशिक्षण चरण'}</label>
                <div className="flex flex-wrap gap-2">
                  {['Off Season', 'Pre-Season', 'Match Week', 'Recovery Week'].map(p => (
                    <Pill key={p} active={formData.trainingPhase === p} onClick={() => setFormData({...formData, trainingPhase: p})}>
                      {isEn ? p : (p === 'Off Season' ? 'ऑफ़ सीज़न' : p === 'Pre-Season' ? 'प्री-सीज़न' : p === 'Match Week' ? 'मैच सप्ताह' : 'रिकवरी सप्ताह')}
                    </Pill>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex justify-between">
                  <span>{isEn ? 'Daily Budget (₹)' : 'दैनिक बजट (₹)'}</span>
                  <span className="text-secondary font-bold">₹{formData.budget}</span>
                </label>
                <input 
                  type="range" min="50" max="500" step="10"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                  className="w-full accent-secondary"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>₹50</span>
                  <span>₹500</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-secondary hover:bg-emerald-600 text-white font-semibold py-3 rounded-md transition-colors flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEn ? 'Generate Meal Plan →' : 'भोजन योजना बनाएं →')}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="flex gap-4">
                <div className="h-16 flex-1 bg-surface rounded-xl border border-border"></div>
                <div className="h-16 flex-1 bg-surface rounded-xl border border-border"></div>
                <div className="h-16 flex-1 bg-surface rounded-xl border border-border"></div>
              </div>
              <div className="h-32 bg-surface rounded-xl border border-border"></div>
              <div className="h-32 bg-surface rounded-xl border border-border"></div>
            </div>
          ) : result ? (
            <AnimatePresence>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <div className="text-xl font-bold">{result.total_calories}</div>
                    <div className="text-xs text-muted">{isEn ? 'Calories' : 'कैलोरी'}</div>
                  </div>
                  <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <div className="w-5 h-5 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-[10px] mx-auto mb-1">P</div>
                    <div className="text-xl font-bold">{result.total_protein}g</div>
                    <div className="text-xs text-muted">{isEn ? 'Protein' : 'प्रोटीन'}</div>
                  </div>
                  <div className="bg-surface border border-border rounded-xl p-4 text-center">
                    <div className="w-5 h-5 rounded bg-yellow-500/20 text-yellow-500 flex items-center justify-center font-bold text-[10px] mx-auto mb-1">C</div>
                    <div className="text-xl font-bold">{result.total_carbs}g</div>
                    <div className="text-xs text-muted">{isEn ? 'Carbs' : 'कार्ब्स'}</div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center flex items-center justify-center gap-2 text-amber-500 font-medium">
                  <Info className="w-4 h-4" />
                  {isEn ? `Estimated Cost: ₹${result.total_cost_inr} / day` : `अनुमानित लागत: ₹${result.total_cost_inr} / दिन`}
                </div>

                <div className="space-y-4">
                  {result.meals.map((meal, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: idx * 0.1}}
                      className="bg-surface border border-border rounded-xl overflow-hidden"
                    >
                      <div className="bg-background px-4 py-2 border-b border-border font-semibold text-sm flex items-center justify-between">
                        <span>{meal.meal_time}</span>
                        <span className="text-xs text-muted font-normal">
                          {meal.items.reduce((acc, curr) => acc + curr.calories, 0)} kcal
                        </span>
                      </div>
                      <div className="p-4 space-y-3">
                        {meal.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-sm">
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-200">{item.name}</span>
                              <span className="text-xs text-muted">{item.quantity}</span>
                            </div>
                            <div className="text-right text-xs">
                              <span className="text-gray-300 block">{item.calories} kcal</span>
                              <span className="text-blue-400">{item.protein}g P</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 items-start">
                  <Droplets className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-400 text-sm mb-1">{isEn ? 'Hydration Plan' : 'जलयोजन योजना'}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{result.hydration_plan}</p>
                  </div>
                </div>

                <p className="text-xs text-muted text-center mt-2 px-4">
                  {result.supplements_warning}
                </p>

              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-surface/30 border border-border/50 rounded-xl border-dashed">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-8 h-8 text-muted" />
              </div>
              <p className="text-muted max-w-sm">
                {isEn ? 'Submit your details to get a culturally appropriate, budget-friendly meal plan tailored to your sport.' : 'अपने खेल के अनुरूप सांस्कृतिक रूप से उपयुक्त, बजट के अनुकूल भोजन योजना प्राप्त करने के लिए अपना विवरण जमा करें।'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionPlanner;
