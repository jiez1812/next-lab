import Navbar from "./components/navbar";
import Carousel from "./components/carousel";

export default function CompanyPage() {
    const brandName = '🍄 Mushroom Mushroom 🍄'
    const navigationItems = [
      {name: 'News', link:'#'},
      {name: 'Products', link:'#'},
      {name: 'About us', link:'#'},
      {name: 'Blog', link:'#'},
    ]
    const images =[
        {imageFile: 'mushroom - Photo by Presetbase Lightroom Presets on Unsplash.jpg', description: 'mushroom - Photo by Presetbase Lightroom Presets on Unsplash'},
        {imageFile: 'mushroom - Photo by Phoenix Han on Unsplash.jpg', description: 'mushroom - Photo by Phoenix Han on Unsplash'},
        {imageFile: 'mushroom - Photo by Hans Veth on Unsplash.jpg', description: 'mushroom - Photo by Hans Veth on Unsplash'},
    ]
  return(
    <>
        <Navbar brandName={brandName} navigationItems={navigationItems} />
        <Carousel images={images} />
    </>
  );
}