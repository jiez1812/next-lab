'use client'
import React from 'react';

export default function GlowLayer({ color = '#4c00e5' }) {
    return (
        <div
            className="absolute inset-0 rounded-2xl z-0 pointer-events-none"
            style={{ boxShadow: `0 0 500px ${color}51` }}
        ></div>
    );
}
