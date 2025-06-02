'use client'
import React from 'react';

export default function ColorResetButton({ onReset, color = '#6366f1' }) {
    return (
        <button
            onClick={onReset}
            className="btn btn-sm btn-ghost btn-circle hover:bg-base-200 transition-all duration-200"
            title="Reset to default color"
            aria-label="Reset color to default"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="hover:scale-110 transition-transform duration-200"
                style={{ color: color }}
            >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
            </svg>
        </button>
    );
}
