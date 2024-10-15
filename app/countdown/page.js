import OptionCard from './components/optionCard';
import { sql } from "@vercel/postgres";
import moment from 'moment-timezone';
import CustomCard from './components/customCard';

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
    <div className='flex flex-col items-center gap-6 md:min-h-screen'>
      <div className='flex-grow flex items-center mt-6 md:justify-center'>
        <CustomCard/>
      </div>
      <div className='flex flex-col gap-6 md:flex-row m-6'>
        {dateOptionsWithShortDate.map(dateDay => (
          <OptionCard key={dateDay.festivalName} dateDay={dateDay}/>
        ))}
      </div>
    </div>
  );
  }