'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    // 使用默认颜色作为初始值，避免 null 问题
    const [primaryColor, setPrimaryColorState] = useState('#8b5cf6');
    const [isLoaded, setIsLoaded] = useState(false);    // Load color from cookies on component mount
    useEffect(() => {
        const savedColor = Cookies.get('countdown-primary-color');
        
        if (savedColor) {
            setPrimaryColorState(savedColor);
        }
        setIsLoaded(true);
    }, []);    // Wrapper function to save to cookies when color changes
    const setPrimaryColor = (color) => {
        setPrimaryColorState(color);
        // Save to cookies with 365 days expiration
        Cookies.set('countdown-primary-color', color, { expires: 365 });
    };    // Function to reset color and clear cookie
    const resetColor = () => {
        const defaultColor = '#8b5cf6';
        setPrimaryColorState(defaultColor);
        Cookies.remove('countdown-primary-color');
    };// 如果还没有加载完成，返回默认值来避免 null 错误
    const colorForCalculation = primaryColor || '#8b5cf6';
    
    // Helper to compute brightness and clamp very light colors
    const getBrightness = (hex) => {
        if (!hex || typeof hex !== 'string') return 128; // Default brightness if no color
        const h = hex.replace('#', '');
        const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return (r * 299 + g * 587 + b * 114) / 1000;
    };
    
    const brightness = getBrightness(colorForCalculation);
    const isLight = brightness > 128;
    const isTooLight = brightness > 245;
    
    // If color is too light (near white), use a default gray to ensure visibility
    const displayColor = isTooLight ? '#888888' : colorForCalculation;
    const fontColor = isLight ? '#000000' : '#ffffff';return (
        <ColorContext.Provider value={{
            primaryColor: colorForCalculation, // 确保不返回 null
            setPrimaryColor,
            resetColor,
            displayColor,
            fontColor,
            brightness,
            isLight,
            isTooLight,
            isLoaded
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
