import CountdownTimer from './components/countdown-timer';
import OptionCard from './components/optionCard';
import { sql } from "@vercel/postgres";
import moment from 'moment-timezone'

export default async function CountdownPage() {
  const result = await sql`SELECT * FROM public."Festival" ORDER BY "festivalDate" ASC;`;

  const dateOptions = result.rows;

  const dateOptionsWithShortDate = dateOptions.map(option => {
  const festivalDate = moment(option.festivalDate).tz('Asia/Singapore');
  const shortDate = festivalDate.format('DD MMM YYYY');
  return {
      ...option,
      festivalDate: shortDate
    };
  });

  return (
    <div className='flex flex-col items-center min-h-screen'>
      <div className='flex flex-wrap gap-4 m-6'>
        {dateOptionsWithShortDate.map(dateDay => (
          <OptionCard key={dateDay.festivalName} dateDay={dateDay}/>
        ))}
      </div>
      <div className='flex-grow flex items-center justify-center'>
        <CountdownTimer targetDate="2025-01-01"/>
      </div>
    </div>
  );
  }