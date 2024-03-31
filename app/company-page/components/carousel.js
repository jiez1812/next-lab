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

function NextPrev({num, length}){
    let prevNum = num === 1 ? length : num - 1;
    let nextNum = num === length ? 1 : num + 1;
    return(
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/3">
            <a href={`#carousel-${prevNum}`} className="btn btn-circle hidden md:opacity-50 md:flex hover:opacity-100">❮</a>
            <a href={`#carousel-${nextNum}`} className="btn btn-circle hidden md:opacity-50 md:flex hover:opacity-100">❯</a>
        </div>
    )
}


function CarouselImage({imagefile, description, num}){
    const imagePath = `/carousel/${imagefile}`;
    return(
        <div id={`carousel-${num}`} className='carousel-item relative w-full'>
            <Image
                src={imagePath}
                alt={description}
                priority={true}
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                }}
                blurDataURL={String(getBlurImage(imagePath))}
                width={1000}
                height={1}
                className='h-screen lg:w-full lg:h-4/6'/>
            <NextPrev num={num} length={3}/>
        </div>
    );
}

export default function Carousel({images}) {
    return(
        <>
            <div className="carousel w-full">
                {images.map((image, index) => {
                    return (
                        <CarouselImage
                            key={index}
                            imagefile={image.imageFile}
                            description={image.description}
                            num={index+1}
                        />
                    );
                })}
            </div>
        </>
    );
}