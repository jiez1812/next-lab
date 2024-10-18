// Create a card that will display the date and festival name
// Use the date and festival name from the dateDay prop
import Link from 'next/link';

export default function OptionCard({dateDay}) {
    return(
        <div className="card shadow-xl w-80 transition ease-in-out delay-150 hover:-translate-y-3">
            <Link href={`/countdown/${dateDay.festivalName}`}>
                <div className="card-body bg-primary-content rounded-2xl">
                    <h2 className="card-title">
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