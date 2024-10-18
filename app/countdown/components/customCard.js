'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Datepicker from "react-tailwindcss-datepicker";

export default function CustomCard() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState({startDate:null, endDate:null});
    const [error, setError] = useState('');
    const router = useRouter();

    const handleClicked = () => {
        if (!eventName || !eventDate.startDate) {
            setError('Please fill in both fields');
        } else {
            const targetDate = eventDate.startDate.toISOString().split('T')[0];
            router.push(`/countdown/custom/${eventName}&${targetDate}`);
        }
    }

    const handleEventNameChange = (event) => {
        setEventName(event.target.value);
    }

    return (
        <div className="card shadow-xl w-80">
            <div className="card-body bg-primary-content rounded-2xl">
                <h2 className="card-title text-2xl justify-center">
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
                            placeholder="Event Date"
                            primaryColor={"blue"}
                            inputClassName={`input input-bordered w-full ${error ? 'border-error' : ''}`}
                            asSingle={true}
                            asTimePicker={true}
                            value={eventDate}
                            useRange={false}
                            onChange={newValue => setEventDate(newValue)}
                        />
                    </div>
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
    );
}