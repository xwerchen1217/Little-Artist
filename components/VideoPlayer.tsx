import React from 'react';
import { VideoTutorial } from '../types';

// Curated list of safe, educational drawing channels/videos for kids
const VIDEOS: VideoTutorial[] = [
  {
    id: '1',
    title: 'How To Draw A Cartoon Cat',
    thumbnail: 'https://picsum.photos/id/40/300/200',
    embedUrl: 'https://www.youtube.com/embed/S3E2yV5a2AI', // Placeholder ID - Art for Kids Hub specific
    duration: '5:30'
  },
  {
    id: '2',
    title: 'Draw a Butterfly',
    thumbnail: 'https://picsum.photos/id/88/300/200',
    embedUrl: 'https://www.youtube.com/embed/y1Z2Ym-F8J4',
    duration: '4:15'
  },
  {
    id: '3',
    title: 'Simple Shapes for Beginners',
    thumbnail: 'https://picsum.photos/id/110/300/200',
    embedUrl: 'https://www.youtube.com/embed/7yx7D5s6qv8',
    duration: '6:00'
  },
  {
    id: '4',
    title: 'How to Draw a Happy Sun',
    thumbnail: 'https://picsum.photos/id/155/300/200',
    embedUrl: 'https://www.youtube.com/embed/qX2x6k5l5lQ',
    duration: '3:45'
  }
];

export const VideoPlayer: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = React.useState<VideoTutorial | null>(null);

  return (
    <div className="max-w-5xl mx-auto w-full pb-24">
       <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-crayon-red mb-2">Video Lessons</h2>
        <p className="text-gray-600">Follow along and learn to draw!</p>
      </div>

      {selectedVideo ? (
        <div className="bg-black rounded-3xl overflow-hidden shadow-2xl mb-8 aspect-video">
           <iframe
            width="100%"
            height="100%"
            src={selectedVideo.embedUrl}
            title={selectedVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-0"
          ></iframe>
          <button 
            onClick={() => setSelectedVideo(null)}
            className="mt-4 mx-auto block bg-white text-black px-6 py-2 rounded-full font-bold mb-4 hover:bg-gray-200"
          >
            Back to List
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {VIDEOS.map(video => (
            <div 
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-crayon-red"
            >
              <div className="relative aspect-video bg-gray-200">
                {/* Using a placeholder overlay because we can't fetch real YT thumbnails without API key effectively in static demo */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-opacity-50 group-hover:text-opacity-100 transition-all">
                  <span className="text-5xl">▶️</span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Click to watch</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-yellow-100 p-6 rounded-2xl mt-8">
        <h3 className="font-bold text-yellow-800 mb-2">💡 Note for Parents</h3>
        <p className="text-yellow-700 text-sm">
          These videos are curated examples. In a full production app, this would connect to a safe-listed YouTube Kids playlist or a dedicated video CMS.
        </p>
      </div>
    </div>
  );
};