import Image from 'next/image';

export default function Mission({content}){
    return(
        <div id="mission" className="container lg:columns-2 mx-auto lg:h-2/5 py-4 lg:px-4">
            <div className='m-4'>
            <h2 className="text-4xl font-bold mb-4 underline underline-offset-8 decoration-8 decoration-accent">{content.title}</h2>
            <p className='font-medium leading-relaxed text-justify lg:ms-4'>{content.description}</p>
            </div>
            <div className='flex justify-center lg:justify-end'>
                <Image 
                    src={`/mushroom company/${content.imageFile}`} 
                    alt={content.alt}
                    width={500}
                    height={500}
                    className='sm:rounded-lg hover:scale-105 duration-300'/>
            </div>
        </div>
    );
}