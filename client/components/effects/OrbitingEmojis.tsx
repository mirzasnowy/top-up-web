
import React from 'react';
import './OrbitingEmojis.css';

const emojis = ["✨", "🛒", "👑", "💎", "🎮", "🚀", "🔥", "💖"];

const OrbitingEmojis = () => {
  return (
    <div className="orbit-container">
      <div className="orbit-ring">
        {emojis.map((emoji, index) => {
          const angle = (index / emojis.length) * 360;
          return (
            <div
              key={index}
              className="orbit-emoji-wrapper"
              style={{ transform: `rotateY(${angle}deg) translateZ(150px)` }}
            >
              <div className="orbit-emoji">{emoji}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitingEmojis;
