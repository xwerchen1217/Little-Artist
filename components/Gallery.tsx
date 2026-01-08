import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { ColoringPage, ArtMode, ArtStyle } from '../types';

const PRESETS = ['Dinosaur', 'Unicorn', 'Space Rocket', 'Cute Cat', 'Race Car', 'Butterfly', 'Robot', 'Castle'];

interface StyleOption {
  id: ArtStyle;
  label: string;
  icon: string;
  color: string;
}

const STYLES: StyleOption[] = [
  { id: 'MARKER', label: 'Markers', icon: '🖊️', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { id: 'WATERCOLOR', label: 'Watercolor', icon: '🎨', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { id: 'CRAYON', label: 'Crayon', icon: '🖍️', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  { id: 'SIMPLE', label: 'Easy Stick', icon: '✏️', color: 'bg-green-100 text-green-700 border-green-300' },
];

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<ColoringPage[]>([]);
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [mode, setMode] = useState<ArtMode>('COLORING');
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>('MARKER');

  const handleGenerate = async (prompt: string) => {
    if (loading) return;
    setLoading(true);
    
    // If mode is coloring, force style to LINE_ART, otherwise use selected style
    const effectiveStyle = mode === 'COLORING' ? 'LINE_ART' : selectedStyle;

    try {
      const url = await generateImage(prompt, effectiveStyle);
      const newPage: ColoringPage = {
        id: Date.now().toString(),
        url,
        prompt,
        mode,
        style: effectiveStyle,
        createdAt: Date.now()
      };
      setImages(prev => [newPage, ...prev]);
    } catch (e) {
      alert("Oops! The magic crayon broke. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `LittleArtist-${prompt.replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-crayon-blue mb-2">Art Studio</h2>
        <p className="text-gray-600">Create coloring pages OR colored pictures to copy!</p>
      </div>

      {/* Generator Controls */}
      <div className="bg-white p-6 rounded-3xl shadow-xl mb-8 border-4 border-crayon-yellow">
        
        {/* Mode Toggle */}
        <div className="flex justify-center mb-6 bg-gray-100 p-1 rounded-2xl w-fit mx-auto">
          <button
            onClick={() => setMode('COLORING')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'COLORING' 
                ? 'bg-white text-crayon-blue shadow-md transform scale-105' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ⬜ Coloring Pages
          </button>
          <button
            onClick={() => setMode('REFERENCE')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'REFERENCE' 
                ? 'bg-white text-crayon-red shadow-md transform scale-105' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🌈 Inspiration Art
          </button>
        </div>

        {/* Style Selector (Only for Reference Mode) */}
        {mode === 'REFERENCE' && (
          <div className="mb-6">
             <p className="text-center text-sm text-gray-500 mb-3 font-bold uppercase tracking-wider">Choose a Style</p>
             <div className="flex flex-wrap justify-center gap-3">
               {STYLES.map(style => (
                 <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                      selectedStyle === style.id 
                        ? `${style.color} shadow-md ring-2 ring-offset-1 ring-gray-200` 
                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                 >
                   <span className="text-xl">{style.icon}</span>
                   <span className="font-bold">{style.label}</span>
                 </button>
               ))}
             </div>
          </div>
        )}

        {/* Subject Presets */}
        <p className="text-center text-sm text-gray-500 mb-3 font-bold uppercase tracking-wider">Choose a Subject</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {PRESETS.map(preset => (
            <button
              key={preset}
              onClick={() => handleGenerate(preset)}
              disabled={loading}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-3 px-4 rounded-xl border-2 border-blue-200 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
        
        {/* Custom Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Or type here (e.g., 'A puppy eating pizza')"
            className="flex-1 p-4 rounded-xl border-2 border-gray-200 focus:border-crayon-blue outline-none text-lg"
          />
          <button
            onClick={() => customPrompt && handleGenerate(customPrompt)}
            disabled={loading || !customPrompt}
            className="bg-crayon-blue text-white font-bold px-8 rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            {loading ? 'Magic...' : 'Go!'}
          </button>
        </div>
      </div>

      {/* Content Grid */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin text-6xl mb-4">🎨</div>
          <p className="text-xl font-bold text-gray-500 animate-pulse">
            {mode === 'COLORING' ? 'Drawing outlines...' : 'Mixing colors...'}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-24">
        {images.map((img) => (
          <div key={img.id} className="bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-100 transform hover:-translate-y-1 transition-transform relative group">
            
            {/* Badge for Art Type */}
            <div className="absolute top-6 left-6 z-10">
               <span className={`px-2 py-1 rounded-lg text-xs font-bold shadow-sm border
                 ${img.mode === 'COLORING' ? 'bg-white text-gray-700 border-gray-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}`}>
                 {img.mode === 'COLORING' ? 'For Coloring' : img.style}
               </span>
            </div>

            <div className="aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden mb-4 border border-gray-200">
              <img src={img.url} alt={img.prompt} className="w-full h-full object-contain" />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700 capitalize truncate pr-2">{img.prompt}</span>
              <button
                onClick={() => downloadImage(img.url, img.prompt)}
                className="bg-crayon-green text-white p-3 rounded-full hover:bg-green-400 shadow-md transition-transform hover:scale-110"
                title="Download"
              >
                {img.mode === 'COLORING' ? '🖨️' : '💾'}
              </button>
            </div>
          </div>
        ))}
        {images.length === 0 && !loading && (
          <div className="col-span-full text-center py-12 opacity-50">
            <div className="text-6xl mb-4">🖼️</div>
            <p>No pictures yet. Create something above!</p>
          </div>
        )}
      </div>
    </div>
  );
};