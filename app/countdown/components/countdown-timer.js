// Calculate the time left until the target date
// Keep track of the time left
'use client';
import { useState } from "react";

export default function CountdownTimer({targetDate}){
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};
      
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }
      
        return timeLeft;
      }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
    }, 1000);

    const formatTime = (time) => {
      return time < 10 ? `0${time}` : time;
    };

    return (
      <div>
      {Object.keys(timeLeft).length === 0 ? (
      <p>The date is past...🤦‍♂️🤦‍♀️</p>
      ) : (
      <div className="grid grid-cols-2 gap-4 md:flex flex-row items-end">
      {timeLeft.days > 0 && (
      <>
      <span className="text-6xl text-right">{formatTime(timeLeft.days)}</span>
      <span className="text-xl">days</span>
      </>
      )}
      {timeLeft.hours > 0 && (
      <>
      <span className="text-6xl text-right">{formatTime(timeLeft.hours)}</span>
      <span className="text-xl">hours</span> 
      </>
      )}
      {timeLeft.minutes > 0 && (
      <>
      <span className="text-6xl text-right">{formatTime(timeLeft.minutes)}</span>
      <span className="text-xl">minutes</span> 
      </>
      )}
      <>
      <span className="text-6xl text-right">{formatTime(timeLeft.seconds)}</span>
      <span className="text-xl">seconds</span> 
      </>
      </div>
      )}
      </div>
    );
}