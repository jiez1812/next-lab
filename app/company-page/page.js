import Navbar from "./components/navbar";
import Carousel from "./components/carousel";

export default function CompanyPage() {
    const brandName = '🍄 Mushroom Mushroom 🍄'
    const brandLogo = '🍄'
    const navigationItems = [
      {name: 'News', link:'#'},
      {name: 'Products', link:'#'},
      {name: 'About us', link:'#'},
      {name: 'Blog', link:'#'},
    ]
    const images =[
        {imageFile: 'carousel1.jpg', description: 'Carousel Item 1'},
        {imageFile: 'carousel2.jpg', description: 'Carousel Item 2'},
        {imageFile: 'carousel3.jpg', description: 'Carousel Item 3'},
    ]
  return(
    <>
        <Navbar brandName={brandName} brandLogo={brandLogo} navigationItems={navigationItems} />
        <Carousel images={images} />
    </>
  );
}