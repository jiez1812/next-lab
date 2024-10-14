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

    return(
        <div>
            {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, and {timeLeft.seconds} seconds
        </div>
    )
}