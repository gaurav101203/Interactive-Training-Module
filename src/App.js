// src/App.js
import React, { useState, useEffect, useMemo } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';
import ProgressCircle from './components/ProgressCircle'; // Import ProgressCircle
import './App.css';

const App = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [progress, setProgress] = useState([]);

  const videos = useMemo(() => [
    { id: 1, title: 'Superman Trailer', src: '/videos/superman.mp4' },
    { id: 2, title: 'Batman Trailer', src: '/videos/batman.mp4' },
    { id: 3, title: 'Iron Man 3 Trailer', src: '/videos/ironman.mp4' },
    { id: 4, title: 'Peaky Blinders Trailer', src: '/videos/peakyblinders.mp4' },
    { id: 5, title: 'Peaky Blinders Season 6 Trailer', src: '/videos/peakyblinders2.mp4' },
    { id: 6, title: 'Game of Thrones Trailer', src: '/videos/gameofthrones.mp4' },
  ], []);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/progress');//fetch the progress from backend which is running on port 5000
        const data = await response.json();
  
        const savedProgress = videos.map((video) => {
          const progressItem = data.find((item) => item.videoId === video.id);
          return progressItem ? progressItem.percentage : 0;
        });
  
        setProgress(savedProgress);
  
        const lastWatchedIndex = savedProgress.findIndex((p) => p < 100);
        setCurrentVideoIndex(lastWatchedIndex === -1 ? videos.length - 1 : lastWatchedIndex);
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };
  
    loadProgress();
  }, [videos]);

  const handleVideoEnd = () => {
    setProgress((prevProgress) => {
      const newProgress = [...prevProgress];
      newProgress[currentVideoIndex] = 100; // Ensure the current video is marked as 100% complete
      return newProgress;
    });
  
    const nextVideoIndex = currentVideoIndex + 1;
    if (nextVideoIndex < videos.length) {
      setCurrentVideoIndex(nextVideoIndex); // Automatically move to the next video
    }
  };


  //Below function will help us to update the progress of the videos in the backend
  const handleProgressUpdate = (percentage) => {
    setProgress((prevProgress) => {
      const newProgress = [...prevProgress];
      if (percentage > (newProgress[currentVideoIndex] || 0)) {
        newProgress[currentVideoIndex] = percentage;
        localStorage.setItem('progress', JSON.stringify(newProgress));
  
        fetch('http://localhost:5000/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            videoId: videos[currentVideoIndex].id,
            percentage,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to save progress');
            }
            console.log('Progress saved successfully');
          })
          .catch((error) => {
            console.error('Error saving progress:', error);
          });
      }
      return newProgress;
    });
  };
  //this function will help us to calculate the overall progress of the course
  const calculateOverallProgress = () => {
    const totalProgress = progress.reduce((acc, curr) => acc + curr, 0);
    return (totalProgress / videos.length).toFixed();
  };

  const handleVideoSelect = (index) => {
    // this will allow selecting any video up to the currently playing one or already completed ones
    if (index <= currentVideoIndex || progress[index] >= 0.1) {
      setCurrentVideoIndex(index);
    }
  };

  return (
    <div>
      <h1 className="app-container">Overall Progress:</h1>
      <ProgressCircle progress={calculateOverallProgress()} /> 
      <h2 className="video-title">{videos[currentVideoIndex].title}</h2>
      <VideoPlayer 
        src={videos[currentVideoIndex].src}
        onEnd={handleVideoEnd}
        onProgress={handleProgressUpdate}
        progress={progress[currentVideoIndex]}
      />
      <Playlist
        videos={videos}
        onVideoSelect={handleVideoSelect}
        currentVideo={currentVideoIndex}
        progress={progress}
      />
    </div>
  );
};

export default App;
