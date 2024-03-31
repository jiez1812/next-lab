import Navbar from "./components/navbar";
import Carousel from "./components/carousel";
import Tabs from "./components/tabs";

export default function CompanyPage() {
    const brandName = '🍄 Mushroom Mushroom 🍄'
    const navigationItems = [
      {name: 'About us', link:'#'},
      {name: 'Products', link:'#'},
      {name: 'Mission', link:'#'},
      {name: 'Contact', link:'#'},
    ]
    const images =[
      {
        imageFile: 'mushroom - Photo by Presetbase Lightroom Presets on Unsplash.jpg',
        description: 'mushroom - Photo by Presetbase Lightroom Presets on Unsplash',
        carouselTitle: 'Mushroom Magic',
        carouselDescription: 'Discover the fascinating world of fungi, from forest floors to dinner plates.',
      },
      {
        imageFile: 'mushroom - Photo by Phoenix Han on Unsplash.jpg',
        description: 'mushroom - Photo by Phoenix Han on Unsplash',
        carouselTitle: 'Edible Delights',
        carouselDescription: 'Explore a variety of delicious and nutritious edible mushrooms, each with its unique flavor profile.',
      },
      {
        imageFile: 'mushroom - Photo by Hans Veth on Unsplash.jpg',
        description: 'mushroom - Photo by Hans Veth on Unsplash',
        carouselTitle: 'Fungi Fantasia',
        carouselDescription: 'Uncover the mysteries of toadstools, puffballs, and other whimsical mushroom forms.',
      },
    ]
  return(
    <>
        <Navbar brandName={brandName} navigationItems={navigationItems} />
        <Carousel images={images} />
        <Tabs items={navigationItems} />
    </>
  );
}