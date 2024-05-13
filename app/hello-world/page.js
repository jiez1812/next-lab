'use client'

import { useState, useEffect, useRef } from 'react';

const greetings = {
  morning: 'Good Morning',
  afternoon: 'Good Afternoon',
  evening: 'Good Evening',
  night: "Why don't you sleep?!",
};

const backgroundColors = {
  morning: 'from-yellow-400 to-orange-500',
  afternoon: 'from-blue-400 to-green-500',
  evening: 'from-purple-500 to-blue-600',
  night: 'from-gray-800 to-black',
};

export default function Home() {
  const [text, setText] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const typingInterval = useRef(null); 

  useEffect(() => {
    let isHelloWorldTyped = false;

    const updateTime = () => {
      const hour = new Date().getHours();
      let greetingKey = 'morning';

      if (hour >= 12 && hour < 17) {
        greetingKey = 'afternoon';
      } else if (hour >= 17 && hour < 20) {
        greetingKey = 'evening';
      } else if (hour >= 20 || hour < 6) {
        greetingKey = 'night';
      }

      setBackgroundColor(backgroundColors[greetingKey]);

      const fullText = isHelloWorldTyped
        ? greetings[greetingKey]
        : `Hello World ${greetings[greetingKey]}`;
      let i = 0;

      if (typingInterval.current) {
        clearInterval(typingInterval.current); 
      }

      typingInterval.current = setInterval(() => {
        setText(fullText.slice(0, i + 1));
        i++;
        if (i > fullText.length) {
          clearInterval(typingInterval.current);
          isHelloWorldTyped = true; 
          setTimeout(updateTime, 2000); 
        }
      }, 100); 
    };

    updateTime(); 

    return () => {
      if (typingInterval.current) {
        clearInterval(typingInterval.current); 
      }
    };
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-r ${backgroundColor}`}>
      <h1 className="text-5xl font-bold text-white text-shadow-lg">
        {text}
      </h1>
    </div>
  );
}