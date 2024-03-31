import Image from 'next/image';

export default function Mission({content}){
    return(
        <div className="container mx-auto lg:h-2/5">
            <h2 id="mission">{content.title}</h2>
            <p>{content.description}</p>
            <Image 
                src={`/mushroom company/${content.imageFile}`} 
                alt={content.alt}
                width={500}
                height={500}/>
        </div>
    );
}