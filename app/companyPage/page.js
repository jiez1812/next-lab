import Carousel from "./components/carousel";

export default function CompanyPage() {
    const images =[
        {imageFile: 'carousel1.jpg', description: 'Carousel Item 1'},
        {imageFile: 'carousel2.jpg', description: 'Carousel Item 2'},
        {imageFile: 'carousel3.jpg', description: 'Carousel Item 3'},
    ]
  return(
    <>
        <Carousel images={images} />
    </>
  );
}