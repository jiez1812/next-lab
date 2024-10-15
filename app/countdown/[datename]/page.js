import { sql } from "@vercel/postgres";
import moment from 'moment-timezone';
import CountdownTimer from "../components/countdown-timer";

export default async function DateNamePage({params}){
    const dateName = decodeURIComponent(params.datename);
    const dateQuery = await sql`SELECT "festivalDate" FROM public."Festival" WHERE "festivalName" = ${dateName};`;
    if (dateQuery.rows.length === 0) {
        const message = `No festival found with the name ${dateName}`;
    }
    const festivalDate = moment(dateQuery.rows[0].festivalDate).tz('Asia/Singapore');
    const shortDate = festivalDate.format('YYYY-MM-DD');
    return (
        <>
            {dateName}
            <CountdownTimer targetDate={shortDate}/>
        </>
    )
}