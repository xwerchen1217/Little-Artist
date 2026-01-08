import React, { useState, useEffect } from 'react';
import { getParentingAdvice } from '../services/geminiService';

const TOPICS = [
  "Fine Motor Skills Development",
  "Encouraging Creativity",
  "Dealing with 'Mistakes'",
  "Choosing the Right Materials",
  "Drawing from Observation vs Imagination"
];

export const ParentGuide: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState(TOPICS[0]);
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Fetch advice when topic changes
  useEffect(() => {
    let isMounted = true;
    
    const fetchAdvice = async () => {
      setLoading(true);
      const result = await getParentingAdvice(activeTopic);
      if (isMounted) {
        setAdvice(result);
        setLoading(false);
      }
    };

    fetchAdvice();

    return () => { isMounted = false; };
  }, [activeTopic]);

  return (
    <div className="max-w-4xl mx-auto w-full pb-24">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-crayon-green mb-2">Parents' Corner</h2>
        <p className="text-gray-600">Understanding your little artist's development.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-4">Topics</h3>
          {TOPICS.map(topic => (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                activeTopic === topic 
                  ? 'bg-crayon-green text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-green-50'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-green-100 min-h-[300px]">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{activeTopic}</h3>
            
            {loading ? (
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="animate-spin">⏳</span>
                <span>Asking the experts...</span>
              </div>
            ) : (
              <div className="prose text-gray-600 leading-relaxed text-lg">
                {advice}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-bold text-gray-800 mb-2">Quick Tips:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Keep drawing sessions short (15-20 mins) for this age group.</li>
                <li>Focus on the <em>process</em>, not the final product.</li>
                <li>Display their work proudly on the fridge!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};