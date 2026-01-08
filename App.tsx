import React, { useState } from 'react';
import { ViewState } from './types';
import { Navigation } from './components/Navigation';
import { Gallery } from './components/Gallery';
import { VideoPlayer } from './components/VideoPlayer';
import { ParentGuide } from './components/ParentGuide';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.GALLERY);

  const renderContent = () => {
    switch (view) {
      case ViewState.GALLERY:
        return <Gallery />;
      case ViewState.VIDEOS:
        return <VideoPlayer />;
      case ViewState.PARENTS:
        return <ParentGuide />;
      default:
        return <Gallery />;
    }
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 md:p-6 shadow-sm z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🎨</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
                Little Artist<span className="text-crayon-blue">'s</span> Studio
              </h1>
              <p className="text-xs text-gray-500 font-medium hidden md:block">Creativity for Ages 4-6</p>
            </div>
          </div>
          
          {/* Desktop Nav Placeholder (rendered by Navigation component properly on mobile) */}
          <div className="hidden md:block">
            {/* Desktop nav is handled inside Navigation component logic via responsive classes */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
        <div className="max-w-6xl mx-auto">
           {/* Desktop specific top nav placement */}
          <div className="hidden md:flex justify-center mb-12">
             <Navigation currentView={view} setView={setView} />
          </div>

          {renderContent()}
        </div>
      </main>

      {/* Mobile Navigation (Fixed Bottom) */}
      <div className="md:hidden">
        <Navigation currentView={view} setView={setView} />
      </div>
    </div>
  );
};

export default App;