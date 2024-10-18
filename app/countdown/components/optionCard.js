// Create a card that will display the date and festival name
// Use the date and festival name from the dateDay prop
import Link from 'next/link';

export default function OptionCard({dateDay}) {
    return(
        <div className="card group shadow-xl w-80 transition ease-in-out hover:translate-y-3">
            <Link href={`/countdown/${dateDay.festivalName}`}>
                <div className="card-body bg-base-200 rounded-2xl group-hover:bg-base-300">
                    <h2 className="card-title group-hover:text-primary">
                        {dateDay.festivalName}
                    </h2>
                    <div>
                        {dateDay.festivalDate}
                    </div>
                </div>
            </Link>
        </div>
    )
}