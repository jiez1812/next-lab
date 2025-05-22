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
            router.push(`/countdown/custom/${nameEnc}&${dateEnc}`);
        }
    }

    const handleEventNameChange = (event) => {
        setEventName(event.target.value);
    }

    return (
        <div className="relative w-80">
            <GlowLayer />
            <div className="card relative z-10 w-80">
                <div className="card-body bg-base-100 rounded-2xl">
                    <h2 className="card-title text-2xl justify-center text-primary">
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
                        {error && <span className="text-error text-xs">{error}</span>}
                        <button
                            className="btn btn-primary"
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