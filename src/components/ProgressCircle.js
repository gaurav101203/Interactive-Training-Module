import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = ({ progress }) => {
  return (
    <div style={{ width: '120px', height: '120px', margin: '0 auto' , fontFamily:'serif' , fontWeight:'bold'}}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          pathColor: '#4db8ff',
          textColor: '#4db8ff',
          trailColor: '#d6d6d6',
          textSize: '30px',
        })}
      />
    </div>
  );
};

export default ProgressCircle;
