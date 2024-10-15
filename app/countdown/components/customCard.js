'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const CustomCard = ({ dateDay }) => {
    const [date, setDate] = useState(dateDay.date || '');
    const [festivalName, setFestivalName] = useState(dateDay.festivalName || '');

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleFestivalNameChange = (e) => {
        setFestivalName(e.target.value);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Enter Festival Details</h5>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={date}
                        onChange={handleDateChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="festivalName">Festival Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="festivalName"
                        value={festivalName}
                        onChange={handleFestivalNameChange}
                    />
                </div>
                <Link href={`/countdown/${festivalName}`}>Go to Countdown</Link>
            </div>
        </div>
    );
};

export default CustomCard;