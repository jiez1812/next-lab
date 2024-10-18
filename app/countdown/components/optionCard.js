// Create a card that will display the date and festival name
// Use the date and festival name from the dateDay prop
import Link from 'next/link';
import "../styles/BoxGlowing.css";

export default function OptionCard({dateDay}) {
    return(
        <div className="card group topGlowing w-80 transition ease-in-out hover:translate-y-2">
            <Link href={`/countdown/${dateDay.festivalName}`}>
                <div className="card-body bg-base-100 rounded-2xl">
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