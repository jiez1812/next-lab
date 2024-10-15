'use client';

import CountdownTimer from "../../components/countdown-timer";
import { useEffect, useState } from 'react';

export default function CustomCountDown({ params }) {
    const [festivalName, setFestivalName] = useState('');
    const [festivalDate, setFestivalDate] = useState('');

    useEffect(() => {
        const paramStr = decodeURIComponent(params.customFestival);
        const paramsArr = paramStr.split('&');
        if (paramsArr.length > 2) {
            paramsArr[0] = paramsArr.slice(0, -1).join('&');
            paramsArr[1] = paramsArr[paramsArr.length - 1];
        }
        setFestivalName(paramsArr[0]);
        setFestivalDate(paramsArr[1]);
    }, [params.customFestival]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <article className="prose">
                <h1 className="text-center capitalize">{festivalName}</h1>
                {festivalDate && <CountdownTimer targetDate={festivalDate} />}
            </article>
        </div>
    );
}