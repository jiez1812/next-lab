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
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#carousel-${prevNum}`} className="btn btn-circle hidden md:opacity-50 md:flex hover:opacity-100">❮</a>
            <a href={`#carousel-${nextNum}`} className="btn btn-circle hidden md:opacity-50 md:flex hover:opacity-100">❯</a>
        </div>
    )
}

function CarouselText({title, description}){
    return(
        <div className='absolute rounded-md space-y-4 top-2/3 p-4 m-4 flex-col lg:top-1/4 lg:w-4/12 lg:left-32 lg:m-0 backdrop-grayscale-0 bg-black/30'>
            <h1 className='text-5xl font-semibold text-gray-50'>{title}</h1>
            <p className='text-gray-100'>{description}</p>
        </div>
    );
}

function CarouselImage({imagefile, description, num, imageNum, carouselTitle, carouselDescription}){
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
                width={200}
                height={200}
                className='w-full h-dvh'/>
            <CarouselText title={carouselTitle} description={carouselDescription}/>
            <NextPrev num={num} length={imageNum}/>
        </div>
    );
}

export default function Carousel({images}) {
    return(
        <>
            <div className="carousel w-full h-screen">
                {images.map((image, index) => {
                    return (
                        <CarouselImage
                            key={index}
                            imagefile={image.imageFile}
                            description={image.description}
                            num={index+1}
                            imageNum={images.length}
                            carouselTitle={image.carouselTitle}
                            carouselDescription={image.carouselDescription}
                        />
                    );
                })}
            </div>
        </>
    );
}