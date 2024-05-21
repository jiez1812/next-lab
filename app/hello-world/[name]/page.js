'use client'

import '../styles/hello-world.module.css'
import { useState, useEffect, useRef } from 'react';

// 定义不同时间段的问候语
const greetings = {
  morning: 'Good Morning',
  afternoon: 'Good Afternoon',
  evening: 'Good Evening',
  night: "Have a nice dream :)",
  midnight: "Why don't you sleep?!",
};

// 定义不同时间段的背景颜色
const backgroundColors = {
  morning: 'bg-gradient-to-r from-yellow-100 via-orange-200 to-pink-300',
  afternoon: 'bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500',
  evening: 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-purple-600',
  night: 'bg-gradient-to-r from-indigo-700 via-blue-800 to-gray-900',
  midnight: 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900',
};
export default function Home({params}) {
  const name = decodeURIComponent(params.name); // 获取动态路由参数

  // text 状态存储当前显示的文本
  const [text, setText] = useState('');
  // backgroundColor 状态存储当前的背景颜色
  const [backgroundColor, setBackgroundColor] = useState('');
  // showGreeting 状态用于控制显示问候语还是 "Hello World"
  const [showGreeting, setShowGreeting] = useState(false);
  // typingInterval 存储定时器 ID，用于清除定时器
  const typingInterval = useRef(null); 

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      let greetingKey = 'morning';
      
      if (hour >= 0 && hour < 6) {
        greetingKey = 'midnight';
      } else if (hour >= 12 && hour < 17) {
        greetingKey = 'afternoon';
      } else if (hour >= 17 && hour < 22) {
        greetingKey = 'evening';
      } else if (hour >= 22 && hour < 24) {
        greetingKey = 'night';
      } 

      setBackgroundColor(backgroundColors[greetingKey]);

      // 将每个单词的首字母大写
      const capitalizedName = name
        ? name
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : 'World';

      const fullText = showGreeting ? greetings[greetingKey] : `Hi ${capitalizedName}`;
      let i = 0;

      if (typingInterval.current) {
        clearInterval(typingInterval.current);
      }

      // 定义一个函数来处理打字机效果和延迟
      const typeText = () => {
        typingInterval.current = setInterval(() => {
          setText(fullText.slice(0, i + 1));
          i++;
          if (i > fullText.length) {
            clearInterval(typingInterval.current);
            // 延迟1秒后切换文本
            setTimeout(() => {
              setShowGreeting(prev => !prev);
            }, 1000); 
          }
        }, 200);
      }

      // 立即开始打字
      typeText();
    };

    updateTime();

    return () => {
      if (typingInterval.current) {
        clearInterval(typingInterval.current);
      }
    };
  }, [showGreeting, name]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${backgroundColor} glassmorphism`}>
      <h1 className="text-5xl font-bold text-white text-shadow-lg mx-3 text-center lg:mx-0">
        {text}
      </h1>
    </div>
  );
}