'use client';

import CountdownTimer from "../../components/countdown-timer";
import { useEffect, useState } from 'react';

export default function CustomCountDown({ params }) {
    const [festivalName, setFestivalName] = useState('');
    const [festivalDate, setFestivalDate] = useState('');
    const [primaryColor, setPrimaryColor] = useState('#8b5cf6');

    useEffect(() => {
        const paramStr = decodeURIComponent(params.customFestival);
        const [nameEnc, dateEnc, colorEnc] = paramStr.split('&');
        setFestivalName(nameEnc);
        setFestivalDate(dateEnc);
        setPrimaryColor(colorEnc || '#8b5cf6');
    }, [params.customFestival]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <article className="prose">
                <h1 className="text-center capitalize">{festivalName}</h1>
                {festivalDate && <CountdownTimer targetDate={festivalDate} primaryColor={primaryColor} />}
            </article>
        </div>
    );
}