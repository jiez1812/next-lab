import React, { useEffect, useState } from 'react';
import '../styles/WaveRipple.css';

export default function WaveRipple({ isActive }){
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
      if (!isActive) return;
      const interval = setInterval(() => {
        setRipples((prevRipples) => [...prevRipples, Date.now()]);
      }, 1000);
      return () => clearInterval(interval);
    }, [isActive]);
    return (
      <div className={`wave-ripple-container ${isActive ? 'active' : ''}`}>
        {ripples.map((ripple, index) => (
          <div
            key={ripple}
            className="wave-ripple"
            style={{ animationDelay: `${index * 1}s` }} // Stagger the start times
          ></div>
        ))}
      </div>
    );
};