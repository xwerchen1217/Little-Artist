import React from 'react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.GALLERY, label: '🎨 Paint & Print', color: 'bg-crayon-blue', icon: '🖌️' },
    { id: ViewState.VIDEOS, label: '📺 Watch', color: 'bg-crayon-red', icon: '▶️' },
    { id: ViewState.PARENTS, label: '👪 Parents', color: 'bg-crayon-green', icon: 'ℹ️' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 z-50 md:relative md:shadow-none md:bg-transparent md:p-0">
      <div className="flex justify-center gap-4 md:gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`
              flex flex-col items-center justify-center w-24 h-24 rounded-2xl transition-all transform hover:scale-110 active:scale-95
              ${item.color} text-white shadow-lg border-4 border-white
              ${currentView === item.id ? 'ring-4 ring-offset-2 ring-yellow-400 scale-105' : 'opacity-90'}
            `}
          >
            <span className="text-3xl mb-1">{item.icon}</span>
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};