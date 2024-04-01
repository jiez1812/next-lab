import React from 'react';
import Navbar from "./components/navbar";
import Carousel from "./components/carousel";
import Tabs from "./components/tabs";
import Mission from './mission';

export default function CompanyPage() {
    const brandName = '🍄 Mushroom Mushroom 🍄'
    const navigationItems = [
      {name: 'Mission', link:'#mission'},
      {name: 'Products', link:'#'},
      {name: 'About us', link:'#'},
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

    const missions ={
      title : 'Our Mission',
      description : "We are passionate mycophiles on a mission to transform the world through the power of mushrooms. Our commitment extends beyond profit margins; it's about nurturing a sustainable, healthier planet and enhancing human well-being.",
      imageFile: "mission - Photo by Providence Doucet on Unsplash.jpg",
      alt:"Photo by Providence Doucet on Unsplash"
    }

    const products = [
      {
        name:"Mushroom Snack Delights",
        description: "Irresistible bite-sized treats that blend earthy mushrooms with savory seasonings. Perfect for on-the-go munching!",
        imageFile: "mushroom snack.jpg",
        price:5.50
      },
      {
        name:"Fungi Fusion Elixirs",
        description: "Refreshing beverages infused with the essence of mushrooms. From energizing cordyceps to calming reishi, each sip is a journey into the mycelial realm.",
        imageFile: "mushroom drink.jpg",
        price:2.50
      },
      {
        name:"ChocoShrooms",
        description: "Decadent chocolate creations where rich cocoa meets the subtle umami of mushrooms. Dive into a world of indulgence!",
        imageFile: "mushroom chocolate.jpg",
        price:7.00
      },
      {
        name:"Mycelium Harvest Rice",
        description: "Nutrient-packed rice dishes featuring sautéed mushrooms, aromatic herbs, and a hint of magic. A wholesome meal that celebrates the forest floor.",
        imageFile: "mushroom rice.jpg",
        price:2.20
      }
    ]

    const aboutUs = {
      title: "About Us",
      sections:[
        {
          title:"Our Story",
          description:"In the heart of ancient forests, where dew-kissed mushrooms emerge from mossy soil, our journey began. We are more than a company—we're a mycological movement. Here's how it all began:",
          level:1
        },
        {
          title:"The Spore of Inspiration",
          description:"Driven by curiosity and a reverence for nature, our founder, Dr. Evelyn Mosswood, embarked on a mycological odyssey. Armed with a magnifying glass and a passion for fungi, she explored forgotten woodlands, deciphering the language of mycelium. What she discovered changed everything.",
          level:2          
        },
        {
          title:"From Lab to Forest Floor",
          description:"Our labs buzz with excitement as scientists, artists, and dreamers collaborate. We cultivate rare mushroom strains, study their medicinal properties, and weave their magic into everyday products. But our roots remain firmly grounded in the forest floor—the birthplace of our inspiration.",
          level:2
        }
      ]
    }

    const contact = {
      title: "Contact Us",
      address: "123 Fungi Lane, Mycelium City, 12345",
      phone: "1-800-MYCOLOGY",
      email: "enquiry@mushroom.com",
      imageFile:"mushroom research institution.jpg"
    }
  return(
    <>
      <Navbar brandName={brandName} navigationItems={navigationItems} />
      <Carousel images={images} />
      <Tabs items={navigationItems} />
      <div className='neutral-content'>
        <Mission content={missions} />
      </div>
    </>
  );
}