// Create a card that will display the date and festival name
// Use the date and festival name from the dateDay prop

export default function OptionCard({dateDay}){
    return(
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">
                    {dateDay.festivalName}
                </h2>
                <div>
                    {dateDay.festivalDate}
                </div>
            </div>
        </div>
    )
}