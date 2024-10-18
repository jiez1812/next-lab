import OptionCard from './components/optionCard';
import { sql } from "@vercel/postgres";
import moment from 'moment-timezone';
import CustomCard from './components/customCard';

export default async function CountdownPage() {
  let result;
  try {
    result = await sql`SELECT * FROM public."Festival" WHERE "festivalDate" > NOW() ORDER BY "festivalDate" ASC LIMIT 6;`;
  } catch (error) {
    console.error('Error executing SQL query:', error);
    result = { rows: [] }; // Fallback to an empty array if there's an error
  }

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
      <div className='flex flex-row flex-wrap justify-center gap-4 md:mb-6'>
        {dateOptionsWithShortDate.map(dateDay => (
          <OptionCard key={dateDay.festivalName} dateDay={dateDay}/>
        ))}
      </div>
    </div>
  );
  }