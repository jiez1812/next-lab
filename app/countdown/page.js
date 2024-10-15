import React from 'react';
import Link from 'next/link';
import CountdownTimer from './components/countdown-timer';
import OptionCard from './components/optionCard';
import { sql } from "@vercel/postgres";

export default async function CountdownPage() {
  const result = await sql`SELECT * FROM public."Festival";`;

  const dateOptions = result.rows;

  const dateOptionsWithShortDate = dateOptions.map(option => {
    const festivalDate = new Date(option.festivalDate);
    festivalDate.setHours(festivalDate.getHours() + 8); // Convert to GMT +8
    const shortDate = festivalDate.toISOString().split('T')[0]; // Convert to short date string
    return {
      ...option,
      festivalDate: shortDate
    };
  });
  
  // go to festival page when clicked
  const clickHandler = ({festivalName}) => {
    Link.push(`/${festivalName}`);
  };

  return (
    <>
      <div className='flex flex-row gap-4 m-6'>
        {dateOptionsWithShortDate.map(dateDay => (
          <OptionCard key={dateDay.festivalName} dateDay={dateDay} clickHandler={clickHandler}/>
        ))}
      </div>
      <CountdownTimer targetDate="2025-01-01"/>
    </>
  );
  }