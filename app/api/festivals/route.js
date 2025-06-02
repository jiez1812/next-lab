import { sql } from "@vercel/postgres";
import moment from 'moment-timezone';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await sql`SELECT * FROM public."Festival" WHERE "festivalDate" > timezone('Asia/Singapore', NOW()) ORDER BY "festivalDate" ASC LIMIT 6;`;
    const dateOptions = result.rows;

    const dateOptionsWithShortDate = dateOptions.map(option => {
      // Ensure the date is interpreted in the correct timezone
      const festivalDate = moment.tz(option.festivalDate, 'Asia/Singapore');
      const shortDate = festivalDate.format('DD MMM YYYY');
      return {
        ...option,
        festivalDate: shortDate
      };
    });

    return NextResponse.json(dateOptionsWithShortDate);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    return NextResponse.json([], { status: 500 });
  }
}
