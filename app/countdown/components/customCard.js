'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Datepicker from "react-tailwindcss-datepicker";
import GlowLayer from './GlowLayer'
import TimePicker from './TimePicker'

export default function CustomCard() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState({startDate:null, endDate:null});
    const [error, setError] = useState('');
    const [showTime, setShowTime] = useState(false);
    const [time, setTime] = useState({ hour: 12, minute: '00', ampm: 'AM' });
    const [primaryColor, setPrimaryColor] = useState('#8b5cf6');
    // Helper to compute brightness and clamp very light colors
    const getBrightness = (hex) => {
        const h = hex.replace('#', '');
        const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return (r * 299 + g * 587 + b * 114) / 1000;
    };
    const brightness = getBrightness(primaryColor);
    const isLight = brightness > 128;
    const isTooLight = brightness > 245;
    // If color is too light (near white), use a default gray to ensure visibility
    const displayColor = isTooLight ? '#888888' : primaryColor;
    const fontColor = isLight ? '#000000' : '#ffffff';
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
                        )}
                        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                            <input type="checkbox" />
                            <div className="collapse-title">Customize</div>
                            <div className="collapse-content">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Primary Color</span>
                                    </label>
                                    <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} />
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