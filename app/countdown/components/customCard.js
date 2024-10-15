'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CustomCard() {
    const [festivalName, setFestivalName] = useState('');
    const [festivalDate, setFestivalDate] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleClicked = () => {
        if (!festivalName || !festivalDate) {
            setError('Please fill in both fields');
        }else{
            router.push(`/countdown/custom/${festivalName}&${festivalDate}`);
        }
    }

    const handleFestivalNameChange = (event) => {
        setFestivalName(event.target.value);
    }

    const handleFestivalDateChange = (event) => {
        setFestivalDate(event.target.value);
    }

    return (
        <div className="card shadow-xl w-80">
            <div className="card-body bg-primary-content rounded-2xl">
                <h2 className="card-title">
                    Custom Festival
                </h2>
                <div>
                    <input
                        type="text"
                        placeholder="Festival Name"
                        className={`input input-bordered w-fit ${error ? 'border-error' : ''}`}
                        onChange={handleFestivalNameChange}
                    />
                </div>
                <div>
                    <input
                        type="date"
                        className={`input input-bordered w-fit ${error ? 'border-error' : ''}`}
                        onChange={handleFestivalDateChange}
                    />
                </div>
                {error && <p className="text-error text-xs">{error}</p>}
                <div>
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