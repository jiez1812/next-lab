'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Datepicker from "react-tailwindcss-datepicker";
import GlowLayer from './GlowLayer'
import TimePicker from './TimePicker'
import { useColor } from '../context/ColorContext';

export default function CustomCard() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState({startDate:null, endDate:null});
    const [error, setError] = useState('');
    const [showTime, setShowTime] = useState(false);
    const [time, setTime] = useState({ hour: 12, minute: '00', ampm: 'AM' });
    
    const { primaryColor, setPrimaryColor, displayColor, fontColor } = useColor();
    const router = useRouter();

    const handleClicked = () => {
        if (!eventName || !eventDate.startDate) {
            setError('Please fill in both fields');
        } else {
            // build datetime with selected or default time
            const date = new Date(eventDate.startDate);
            if (showTime) {
                // convert 12h to 24h
                const hour24 = (time.hour % 12) + (time.ampm === 'PM' ? 12 : 0);
                date.setHours(hour24, parseInt(time.minute), 0, 0);
            } else {
                date.setHours(0, 0, 0, 0);
            }
            const iso = date.toISOString();
            // encode components for URL
            const nameEnc = encodeURIComponent(eventName);
            const dateEnc = encodeURIComponent(iso);
            const colorEnc = encodeURIComponent(primaryColor);
            router.push(`/countdown/custom/${nameEnc}&${dateEnc}&${colorEnc}`);
        }
    }

    const handleEventNameChange = (event) => {
        setEventName(event.target.value);
    }

    return (
        <div className="relative w-80">
            <GlowLayer color={displayColor} />
            <div className="card relative z-10 w-80">
                <div className="card-body bg-base-100 rounded-2xl">
                    <h2 className="card-title text-2xl justify-center" style={{ color: displayColor }}>
                        Custom Event
                    </h2>
                    <div className='form-control gap-3'>
                        <input
                            type="text"
                            placeholder="Event Name"
                            className={`input input-bordered w-full ${error ? 'border-error' : ''}`}
                            onChange={handleEventNameChange}
                        />
                        <div className='flex flex-col gap-3'>
                            <Datepicker
                                containerClassName="relative"
                                placeholder="Event Date"
                                primaryColor={"indigo"}
                                inputClassName={`input input-bordered w-full ${error ? 'border-error' : ''}`}
                                asSingle={true}
                                value={eventDate}
                                useRange={false}
                                onChange={newValue => setEventDate(newValue)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label justify-start cursor-pointer">
                                <span className="label-text me-2">Include Time</span>
                                <input
                                    type="checkbox"
                                    className="toggle"
                                    checked={showTime}
                                    onChange={() => setShowTime(!showTime)}
                                />
                            </label>
                        </div>
                        {showTime && (
                            <TimePicker value={time} onChange={setTime} />
                        )}                        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                            <input type="checkbox" />
                            <div className="collapse-title">
                                Customize 
                                <div 
                                    className="inline-block w-4 h-4 rounded-full ml-2 border border-base-300"
                                    style={{ backgroundColor: displayColor }}
                                ></div>
                            </div>
                            <div className="collapse-content">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Primary Color</span>
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="color" 
                                            value={primaryColor} 
                                            onChange={e => setPrimaryColor(e.target.value)}
                                            className="w-12 h-12 rounded-lg border border-base-300 cursor-pointer"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-xs text-base-content/70">Current Color</span>
                                            <span className="text-xs text-base-content/70">{primaryColor}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {error && <span className="text-error text-xs">{error}</span>}
                        <button
                            className="btn"
                            style={{ backgroundColor: displayColor, borderColor: displayColor, color: fontColor }}
                            onClick={handleClicked}
                        >
                            Create Countdown
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}