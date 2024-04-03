import Link from 'next/link';

export default function Tabs({items}){
    return(
        <div role="tablist" className="hidden lg:tabs tabs-boxed sticky top-0">
            {items.map((item, index)=>(
                <Link key={index} href={`${item.link}`} className="tab hover:scale-110 hover:bg-base-300 hover:text-base-content duration-300">{item.name}</Link>
            ))}
        </div>
    )
}