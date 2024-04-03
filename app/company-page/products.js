import Image from 'next/image';

function formatPrice(price){
    return `$${price.toFixed(2)}`;

}

function ProductCard({product}){
    return(
        <div className='carousel-item'>
            <div className="rounded-box card card-compact w-80 bg-base-100 shadow-xl shadow-neutral m-6 hover:scale-105 duration-300">
                <figure>
                    <Image
                        src={`/mushroom company/${product.imageFile}`}
                        alt={product.name}
                        width={400}
                        height={200}
                    />  
                </figure>
                <div className='card-body'>
                    <h2 className='card-title'>{product.name}</h2>
                    <p>{product.description}</p>
                </div>
                <div className='card-actions justify-end m-4'>
                    <div className="btn btn-warning no-animation cursor-default">
                        {formatPrice(product.price)}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default function Products({products}) {
    return(
        <div id="products" className="container mx-auto lg:h-2/5 py-4 auto scroll-mt-14 lg:px-4">
            <div className='m-4'>
                <h2 className="text-4xl font-bold mb-4 underline underline-offset-8 decoration-8 decoration-accent">Our Products</h2>
                <p className='font-medium leading-relaxed text-justify lg:ms-4'>Explore our range of mushroom-based delights, each crafted with care and creativity to delight your senses.</p>
            </div>
            <div className='carousel carousel-center w-11/12 max-h-full space-x-4 rounded-box ring-2 ring-accent z-1 mx-4'>
                {products.map((product, index) => (
                    <ProductCard key={index} product={product}/>
                ))}
            </div>
        </div>
    );
}
