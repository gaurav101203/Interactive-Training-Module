import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';

const Playlist = ({ videos, currentVideoIndex, onVideoSelect, progress }) => {
  return (
    <div className="playlist-container">
      <h3>Playlist</h3>
      <ul className="playlist">
        {videos.map((video, index) => (
          <li
          key={video.id} 
          onClick={() => onVideoSelect(index)}  // Pass the index to the handlevideoselect function in App.js
          className={currentVideoIndex === index ? 'active' : ''}
        >
          {video.title}
          <span>{Math.round(progress[index] || 0)}%</span>
        </li>
        
        ))}
      </ul>
    </div>
  );
};

Playlist.propTypes = {
  videos: PropTypes.array.isRequired,
  currentVideoIndex: PropTypes.number.isRequired,
  onVideoSelect: PropTypes.func.isRequired,
  progress: PropTypes.array.isRequired,
};

export default Playlist;
