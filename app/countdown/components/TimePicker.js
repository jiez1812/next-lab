'use client'
import React from 'react';

export default function TimePicker({ value, onChange }) {
    return (
        <div className="form-control w-full">
            <label className="label mb-1">
                <span className="label-text">Select Time</span>
            </label>
            <div className="flex gap-2 items-center">
                <select
                    value={value.hour}
                    onChange={e => onChange({ ...value, hour: parseInt(e.target.value) })}
                    className="select select-bordered w-1/3"
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                        <option key={h} value={h}>{h}</option>
                    ))}
                </select>
                <select
                    value={value.minute}
                    onChange={e => onChange({ ...value, minute: e.target.value })}
                    className="select select-bordered w-1/3"
                >
                    {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
                <select
                    value={value.ampm}
                    onChange={e => onChange({ ...value, ampm: e.target.value })}
                    className="select select-bordered w-1/3"
                >
                    {['AM', 'PM'].map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
