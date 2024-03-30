import Image from 'next/image';
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

async function getBlurImage(imagePath){
        try {
                const file = await fs.readFile(imagePath);
             
                const { base64 } = await getPlaiceholder(file);
             
                return base64;
            } catch (err) {
                err;
            }
}


function CarouselImage({imagefile, description, num}){
    const imagePath = `/carousel/${imagefile}`;
    return(
        <div id={`carousel-${num}`} className='carousel-item w-full'>
            <Image
                src={imagePath}
                alt={description}
                width={1920}
                height={800}
                priority={true}
                placeholder='blur'
                blurDataURL={String(getBlurImage(imagePath))}
                className='carousel-item w-full'/>
        </div>
    );
}

export default function Carousel({images}) {
    return(
        <>
            <div className="carousel w-full">
                {images.map((image, index) => (
                    <CarouselImage key={index} imagefile={image.imageFile} description={image.description} num={index+1} />
                ))}
            </div>
            <div className='flex justify-center w-full py-2 gap-2'>
                {
                    images.map((_, index) => (
                        <a key={index} href={`#carousel-${index+1}`} className="btn btn-xs">{`${index+1}`}</a>
                    ))
                }
            </div>
        </>
    );
}