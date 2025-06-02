'use client'
import React, { createContext, useContext, useState } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
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
    
    return (
        <ColorContext.Provider value={{
            primaryColor,
            setPrimaryColor,
            displayColor,
            fontColor,
            brightness,
            isLight,
            isTooLight
        }}>
            {children}
        </ColorContext.Provider>
    );
};

export const useColor = () => {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error('useColor must be used within a ColorProvider');
    }
    return context;
};
