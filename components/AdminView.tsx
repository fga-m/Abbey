import React from 'react';
import { LOCATIONS, PATH_TEAM_1 } from '../constants';

const AdminView: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-serif-refined font-extrabold text-slate-900 mb-2 flex items-center gap-4">
          <i className="fas fa-fingerprint text-indigo-600"></i> The Grand Ledger
        </h2>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Master Key Registry</p>
      </div>

      <div className="space-y-6">
        {PATH_TEAM_1.map((key) => {
          const loc = LOCATIONS[key];
          return (
            <div key={key} className="bg-white p-7 rounded-[2.5rem] border-l-[12px] border-slate-900 shadow-sm group hover:shadow-md transition-all">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-slate-100 px-4 py-1.5 rounded-full text-[10px] font-black text-slate-400 border border-slate-200 uppercase tracking-widest">
                  Station {key}
                </span>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{loc.name}</span>
              </div>
              <p className="text-lg font-serif-refined italic text-slate-800 mb-8 leading-relaxed">"{loc.question}"</p>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors duration-500">
                  <span className="text-[9px] uppercase font-black text-slate-400 block tracking-widest mb-2">The Passphrase</span>
                  <span className="text-base font-bold text-slate-900">{loc.answer.replace('|', ' or ')}</span>
                </div>
                <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100/50 group-hover:bg-indigo-50 transition-colors duration-500">
                  <span className="text-[9px] uppercase font-black text-indigo-600/50 block tracking-widest mb-2">Hidden Wisdom</span>
                  <span className="text-base font-serif-refined italic text-indigo-900 leading-snug">"{loc.clue}"</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="modern-gradient p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden shadow-indigo-500/20">
        <div className="absolute -top-10 -right-10 p-10 opacity-10">
          <i className="fas fa-sparkles text-[12rem] -rotate-12"></i>
        </div>
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-black mb-10 flex items-center gap-3">
          <i className="fas fa-quote-left text-indigo-200"></i> The Revealed Prophecy
        </h3>
        <div className="space-y-8 relative z-10">
          {PATH_TEAM_1.map((k, i) => (
            <div key={k} className="flex gap-6 items-start border-l border-white/20 pl-6 group transition-all">
              <span className="text-[10px] font-black text-indigo-200 mt-1 opacity-50">{String(i+1).padStart(2, '0')}</span>
              <p className="text-lg font-serif-refined italic leading-relaxed text-indigo-50 group-hover:text-white transition-colors">"{LOCATIONS[k].clue}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminView;