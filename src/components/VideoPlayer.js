import React, { useRef, useEffect, useState } from 'react';

const VideoPlayer = ({ src, onEnd, onProgress, progress }) => {
  const videoRef = useRef(null);
  const [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    video.playbackRate = 1;   //This will make sure that the playback rate remains to normal

    const handleTimeUpdate = () => {
      if (video.currentTime > lastTime + 1) {
        // this will prevent fast forwarding by resetting the currentTime
        video.currentTime = lastTime;
      } else {
        setLastTime(video.currentTime);
        const percentage = (video.currentTime / video.duration) * 100;
        onProgress(parseFloat(percentage.toFixed(2)));
      }
    };

    const handleEnded = () => {
      onEnd();
    };

    const handleLoadedMetadata = () => {
      if (video.duration > 0 && progress > 0) {
        const lastWatchedPosition = (progress / 100) * video.duration;
        video.currentTime = Math.min(lastWatchedPosition, video.duration - 1);
        setLastTime(lastWatchedPosition); // Update the last watched position
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [lastTime, onEnd, onProgress, progress]);

  useEffect(() => {
    setLastTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [src]);

  return (
    <div className="video-container">
      <video ref={videoRef} controls src={src} style={{ width: '1520px', height:'700px'}} />
    </div>
  );
};

export default VideoPlayer;
