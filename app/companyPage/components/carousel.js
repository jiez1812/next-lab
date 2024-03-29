import Image from 'next/image';

function CarouselImage({imagefile, description, num}){
    const imagePath = `/carousel/${imagefile}`;
    return(
        <div id={`carousel-${num}`} className='carousel-item w-full'>
            <Image
                src={imagePath}
                alt={description}
                width={1920}
                height={800}
                className='carousel-item w-full'/>
        </div>
    );
}

export default function Carousel({images}) {
    return(
        <>
            <div className="carousel w-full">
                {images.map((image, index) => (
                    <CarouselImage key={index} imagefile={image.imageFile} description={image.description} index={index+1} />
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