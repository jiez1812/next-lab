'use client';
import { useState, useEffect } from "react";
import moment from 'moment-timezone';

export default function CountdownTimer({ targetDate }) {
    const calculateTimeLeft = () => {
        const now = moment().tz(moment.tz.guess());
        const target = moment.tz(targetDate, moment.tz.guess());
        const difference = target.diff(now);
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
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [targetDate, timeLeft]);

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    const isToday = () => {
        const today = new Date();
        const target = new Date(targetDate);
        return (
            today.getDate() === target.getDate() &&
            today.getMonth() === target.getMonth() &&
            today.getFullYear() === target.getFullYear()
        );
    };
    
    return (
        <div className="relative">
            {isToday() ? (
                <p className="text-xl">It is today!</p>
            ) : Object.keys(timeLeft).length === 0 ? (
                <p className="text-xl">The date is past...🤦‍♂️🤦‍♀️</p>
            ) : (
                <div className="grid grid-cols-2 gap-4 md:flex flex-row items-end">
                    {timeLeft.days > 0 && (
                        <>
                            <span className="text-6xl text-right text-primary">{formatTime(timeLeft.days)}</span>
                            <span className="text-xl">days</span>
                        </>
                    )}
                    {(timeLeft.days > 0 || timeLeft.hours > 0) && (
                        <>
                            <span className="text-6xl text-right text-primary">{formatTime(timeLeft.hours)}</span>
                            <span className="text-xl">hours</span>
                        </>
                    )}
                    {(timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0) && (
                        <>
                            <span className="text-6xl text-right text-primary">{formatTime(timeLeft.minutes)}</span>
                            <span className="text-xl">minutes</span>
                        </>
                    )}
                    <>
                        <span className="text-6xl text-right text-primary">{formatTime(timeLeft.seconds)}</span>
                        <span className="text-xl">seconds</span>
                    </>
                </div>
            )}
        </div>
    );
}