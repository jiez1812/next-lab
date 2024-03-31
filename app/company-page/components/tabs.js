export default function Tabs({items}){
    return(
        <div role="tablist" className="hidden lg:tabs tabs-boxed sticky top-0">
            {items.map((item, index)=>(
                <a key={index} href={`#${item.link}`} className="tab">{item.name}</a>
            ))}
        </div>
    )
}