'use client';

import Image from 'next/image';

function RandomImage({width, height, num}){
    return(
        <Image className='hover:scale-125 transition-transform duration-500 ease-in-out'
            src={`https://picsum.photos/${width}/${height}?random=${num}`}
            alt="Random image from Picsum Photos"
            width={width}
            height={height}
        />
    );
}

export default function Gallery() {
    return (
        <>
            <h1>Random Image Gallery</h1>
            <div className="flex flex-wrap flex-row gap-4">
                <RandomImage width={200} height={300} num={1} />
                <RandomImage width={200} height={300} num={2} />
                <RandomImage width={200} height={300} num={3} />
                <RandomImage width={200} height={300} num={4} />
                <RandomImage width={200} height={300} num={5} />
                <RandomImage width={200} height={300} num={6} />
                <RandomImage width={200} height={300} num={7} />
                <RandomImage width={200} height={300} num={8} />
                <RandomImage width={200} height={300} num={9} />
                <RandomImage width={200} height={300} num={10} />
            </div>
        </>
    );
}