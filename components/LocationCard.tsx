import React, { useState, useEffect } from 'react';
import { LocationData } from '../types';

interface LocationCardProps {
  data: LocationData;
  onCorrect: (clue: string) => void;
  step: number;
  totalSteps: number;
}

const LocationCard: React.FC<LocationCardProps> = ({ data, onCorrect, step, totalSteps }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    setInput1('');
    setInput2('');
    setCooldown(0);
  }, [data]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const isPainStep = data.id === 'P3';
  const isLocked = cooldown > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    let isCorrect = false;
    if (isPainStep) {
      const validAnswers = data.answer.split('|');
      const val1 = input1.toLowerCase().trim();
      const val2 = input2.toLowerCase().trim();
      isCorrect = validAnswers.includes(val1) || validAnswers.includes(val2);
    } else {
      isCorrect = input1.toLowerCase().trim() === data.answer.toLowerCase();
    }

    if (isCorrect) {
      onCorrect(data.clue);
    } else {
      setCooldown(15);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Progress Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Step {step + 1} of {totalSteps}
          </p>
          <p className="text-[10px] font-bold text-indigo-600">
            {Math.round(((step + 1) / totalSteps) * 100)}% Complete
          </p>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex gap-1 p-0.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`h-full flex-1 rounded-full transition-all duration-700 ${
                i <= step ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden">
        {isLocked && (
          <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-indigo-400 animate-spin mb-6"></div>
            <h4 className="text-white font-serif-refined italic text-xl mb-2">Moment of Reflection</h4>
            <p className="text-slate-400 text-xs mb-8 max-w-[200px]">The path remains hidden for a moment. Contemplate your journey.</p>
            <div className="text-5xl font-extrabold text-white tabular-nums tracking-tighter">
              {cooldown}
            </div>
          </div>
        )}

        <div className="relative z-10 space-y-10">
          {/* Question Section */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600/50 bg-indigo-50 px-3 py-1 rounded-full">Discovery</span>
            </div>
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{data.name}</h2>
              <p className="text-xl font-serif-refined italic leading-relaxed text-slate-800">
                "{data.question}"
              </p>
            </div>
          </section>

          {/* Answer Section */}
          <section>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  disabled={isLocked}
                  type="text"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  placeholder={isPainStep ? "First Word" : "The Answer..."}
                  className={`w-full p-5 rounded-2xl border-2 outline-none transition-all duration-300 font-medium text-lg ${
                    isLocked 
                      ? 'bg-slate-50 border-slate-100 text-slate-300' 
                      : 'border-slate-100 bg-slate-50 focus:border-indigo-600 focus:bg-white text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                {!isPainStep && (
                  <button 
                    disabled={isLocked}
                    type="submit"
                    className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all ${
                      isLocked ? 'bg-slate-200 text-slate-400' : 'modern-gradient text-white'
                    }`}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                )}
              </div>

              {isPainStep && (
                <div className="space-y-6 pt-2 animate-in slide-in-from-top-2">
                  <input
                    disabled={isLocked}
                    type="text"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    placeholder="Second Word"
                    className={`w-full p-5 rounded-2xl border-2 outline-none transition-all duration-300 font-medium text-lg ${
                      isLocked 
                        ? 'bg-slate-50 border-slate-100 text-slate-300' 
                        : 'border-slate-100 bg-slate-50 focus:border-indigo-600 focus:bg-white text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                  <button 
                    disabled={isLocked}
                    type="submit"
                    className={`w-full p-5 rounded-2xl font-bold uppercase tracking-widest shadow-xl active:scale-95 transition-all ${
                      isLocked ? 'bg-slate-200 text-slate-400' : 'modern-gradient text-white shadow-indigo-500/30'
                    }`}
                  >
                    Submit Testimony
                  </button>
                </div>
              )}
            </form>
          </section>

          {/* Word Clue Section */}
          <section className="pt-8 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <i className="fas fa-key text-[10px] text-slate-400"></i>
              <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-400">The Word Clue</h3>
            </div>
            <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-100/50">
              <p className="text-slate-600 font-serif-refined italic text-base leading-relaxed text-center">
                "{data.clue}"
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;