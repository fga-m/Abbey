import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, title, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-slate-50 relative overflow-hidden ring-1 ring-slate-200 shadow-2xl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md px-6 py-5 sticky top-0 z-50 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack} 
              className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-all active:scale-90"
              aria-label="Go back"
            >
              <i className="fas fa-arrow-left text-sm"></i>
            </button>
          )}
          <h1 className="text-lg font-extrabold tracking-tight text-slate-900 font-serif-refined">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg modern-gradient flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i className="fas fa-sparkles text-[10px] text-white"></i>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        {children}
      </main>

      {/* Modern Background Accents */}
      <div className="absolute top-20 -right-20 w-64 h-64 bg-indigo-100/40 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-20 -left-20 w-48 h-48 bg-violet-100/40 rounded-full blur-[60px] pointer-events-none"></div>
    </div>
  );
};

export default Layout;