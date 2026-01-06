import React, { useState } from 'react';
import { TeamRole, AppState } from './types';
import { LOCATIONS, PATH_TEAM_1, PATH_TEAM_2 } from './constants';
import Layout from './components/Layout';
import AdminView from './components/AdminView';
import LocationCard from './components/LocationCard';

const ADMIN_PASSWORD = 'hunt';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    role: null,
    currentStep: 0,
    completedClues: [],
    isFinished: false,
  });

  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  const selectRole = (role: TeamRole) => {
    setState(prev => ({ ...prev, role, currentStep: 0, completedClues: [], isFinished: false }));
    setIsAdminLogin(false);
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passInput.toLowerCase() === ADMIN_PASSWORD) {
      selectRole(TeamRole.ADMIN);
      setPassInput('');
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const getPath = () => {
    if (state.role === TeamRole.TEAM_1) return PATH_TEAM_1;
    if (state.role === TeamRole.TEAM_2) return PATH_TEAM_2;
    return [];
  };

  const handleCorrectAnswer = (clue: string) => {
    const path = getPath();
    const nextStep = state.currentStep + 1;
    const newClues = [...state.completedClues, clue];

    if (nextStep >= path.length) {
      setState(prev => ({ ...prev, completedClues: newClues, isFinished: true }));
    } else {
      setState(prev => ({ ...prev, currentStep: nextStep, completedClues: newClues }));
    }
  };

  const resetGame = () => {
    setState({ role: null, currentStep: 0, completedClues: [], isFinished: false });
    setIsAdminLogin(false);
    setPassInput('');
  };

  if (!state.role) {
    return (
      <Layout title="Scavenger Hunt">
        <div className="flex flex-col items-center justify-center min-h-full gap-10 py-4">
          <div className="w-full relative px-2">
            <div className="w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-slate-100">
              <img 
                src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/96585689.jpg?k=1b1d5b72863c5a1439d6919d54b028bd691ee524f36678cd779eb1324caf8016&o=" 
                alt="Scavenger Hunt" 
                className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Scavenger Hunt</span>
                <h2 className="text-3xl font-serif-refined text-white tracking-tight leading-none italic">7 ways to hear God</h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 w-full gap-5 px-4">
            <button 
              onClick={() => selectRole(TeamRole.TEAM_1)}
              className="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm hover:border-indigo-500 transition-all flex items-center justify-between group active:scale-95"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 modern-gradient rounded-2xl flex items-center justify-center text-white font-serif-refined italic text-2xl shadow-lg shadow-indigo-200 ring-4 ring-slate-50">1</div>
                <div className="text-left">
                  <span className="block text-lg font-bold text-slate-900">Team Alpha</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Path One</span>
                </div>
              </div>
              <i className="fas fa-arrow-right text-slate-200 group-hover:text-indigo-500 transition-colors"></i>
            </button>

            <button 
              onClick={() => selectRole(TeamRole.TEAM_2)}
              className="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm hover:border-indigo-500 transition-all flex items-center justify-between group active:scale-95"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-serif-refined italic text-2xl shadow-lg ring-4 ring-slate-50">2</div>
                <div className="text-left">
                  <span className="block text-lg font-bold text-slate-900">Team Beta</span>
                  <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Path Two</span>
                </div>
              </div>
              <i className="fas fa-arrow-right text-slate-200 group-hover:text-indigo-500 transition-colors"></i>
            </button>

            <div className="mt-8 pt-8 border-t border-slate-200">
              {isAdminLogin ? (
                <form onSubmit={handleAdminAuth} className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="relative">
                    <input
                      autoFocus
                      type="password"
                      placeholder="Custodian Passcode"
                      value={passInput}
                      onChange={(e) => setPassInput(e.target.value)}
                      className={`w-full p-5 rounded-2xl border-2 outline-none transition-all text-sm font-medium ${
                        loginError ? 'border-rose-400 bg-rose-50 text-rose-900' : 'border-slate-100 bg-slate-50 focus:border-indigo-600'
                      }`}
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 modern-gradient text-white rounded-xl shadow-lg flex items-center justify-center">
                      <i className="fas fa-lock-open text-xs"></i>
                    </button>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setIsAdminLogin(false)}
                    className="text-[10px] text-slate-400 font-black uppercase tracking-widest w-full text-center py-2"
                  >
                    Return to Selection
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setIsAdminLogin(true)}
                  className="w-full py-4 text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest"
                >
                  <i className="fas fa-shield-halved text-xs"></i> Admin Access
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (state.role === TeamRole.ADMIN) {
    return (
      <Layout title="Quest Admin" onBack={resetGame}>
        <AdminView />
      </Layout>
    );
  }

  if (state.isFinished) {
    const currentPath = getPath();
    return (
      <Layout title="Quest Complete">
        <div className="flex flex-col items-center justify-center py-10 space-y-12">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-slate-900 rounded-[2.5rem] flex items-center justify-center shadow-2xl animate-float">
              <i className="fas fa-award text-5xl text-indigo-300"></i>
            </div>
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-4xl font-serif-refined italic text-slate-900">Journey Complete</h2>
            <p className="text-slate-500 font-medium text-sm px-10 leading-relaxed">
              There are 7 ways, 3 starts with D, 3 starts with P and 1 starts with S. Figure it out and you win the challenge.
            </p>
          </div>

          <div className="w-full space-y-6 px-2">
            <h3 className="text-[10px] font-black tracking-widest text-slate-400 uppercase border-b border-slate-200 pb-2 ml-4">The Gathered Clues</h3>
            <div className="space-y-4">
              {state.completedClues.map((clue, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex gap-6 items-center animate-in slide-in-from-bottom-4 duration-700 shadow-sm" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="w-12 h-12 modern-gradient rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-serif-refined italic text-xl">
                    {/* Display the first letter of the location key (D, S, or P) instead of sequential numbers */}
                    {currentPath[idx]?.[0] || '?'}
                  </div>
                  <p className="text-slate-800 text-lg font-serif-refined italic leading-tight">"{clue}"</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={resetGame}
            className="w-full p-6 modern-gradient text-white font-bold uppercase tracking-widest rounded-[2rem] hover:brightness-110 transition-all shadow-xl active:scale-95 shadow-indigo-200"
          >
            Start New Hunt
          </button>
        </div>
      </Layout>
    );
  }

  const currentPath = getPath();
  const currentLocationKey = currentPath[state.currentStep];
  const currentLocation = LOCATIONS[currentLocationKey];

  return (
    <Layout title={state.role === TeamRole.TEAM_1 ? 'Alpha Path' : 'Beta Path'} onBack={resetGame}>
      <LocationCard 
        data={currentLocation} 
        onCorrect={handleCorrectAnswer}
        step={state.currentStep}
        totalSteps={currentPath.length}
      />
    </Layout>
  );
};

export default App;