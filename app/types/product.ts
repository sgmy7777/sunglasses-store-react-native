import { createContext } from "react";

export interface Product {
  id: string,
  image: number | string,
  info: {
    name: string,
    brand: string,
    material: string[],
    features: string[],
  },
  price: {
    value: number,
    currency: "USD",
  },
  rating: {
    value: number,
    reviewsAmount: number,
  },
  deliveryType: "free" | "payed",
  description: string,
  tagline: string,
}

const product1Image = require('../../assets/images/image.jpg');
const product2Image = require('../../assets/images/image2.jpg');
const product3Image = require('../../assets/images/image3.jpg');
const product4Image = require('../../assets/images/image4.jpg');

export const defaultProducts:Product[] = [
  {
    id: "1",
    image: product1Image,
    info: {
      name: "Woke Up Like This",
      brand: "Ray-Ban",
      material: ["Metal"],
      features: ["Polarized", "Anti-Scratch Coating"],
    },
    price: {
      value: 49.99,
      currency: "USD",
    },
    rating: {
      value: 4.5,
      reviewsAmount: 180,
    },
    deliveryType: "free",
    description: `Perfect for those mornings when you want to look effortlessly cool, even if "effortless" involved hitting snooze five times. 

These sleek, dark lenses hide a multitude of sins (like forgetting to brush your hair). They're also pretty good at blocking out the actual sun.`,
    tagline: "Effortlessly cool style",
  },
  {
    id: "2",
    image: product2Image,
    info: {
      name: "Glare Begone!",
      brand: "Oakley",
      material: ["Polycarbonate"],
      features: ["Polarized", "Anti-Scratch Coating"],
    },
    price: {
      value: 54.5,
      currency: "USD",
    },
    rating: {
      value: 4.7,
      reviewsAmount: 180,
    },
    deliveryType: "free",
    description: `Stop squinting! These polarized beauties are specifically designed to reduce glare from water, snow, and overly shiny surfaces. 

Now you can actually see where you're going, which is a definite plus. Also great for pretending you can't hear someone.`,
    tagline: "See clearly now",
  },
  {
    id: "3",
    image: product3Image,
    info: {
      name: "Summer Vibes",
      brand: "Gucci",
      material: ["Acetate"],
      features: ["UV Protection", "Lightweight"],
    },
    price: {
      value: 89.99,
      currency: "USD",
    },
    rating: {
      value: 4.8,
      reviewsAmount: 256,
    },
    deliveryType: "free",
    description: `Luxury meets comfort. These premium sunglasses feature a trendy cat-eye design that complements any summer outfit. The superior UV protection keeps your eyes safe while you enjoy the sun.`,
    tagline: "Classic luxury style",
  },
  {
    id: "4",
    image: product4Image,
    info: {
      name: "Adventure Pro",
      brand: "Prada",
      material: ["Titanium"],
      features: ["Polarized", "Shatterproof", "UV400"],
    },
    price: {
      value: 129.99,
      currency: "USD",
    },
    rating: {
      value: 4.9,
      reviewsAmount: 342,
    },
    deliveryType: "free",
    description: `Built for adventure. These premium sports sunglasses are engineered with advanced polarized lenses and a titanium frame for ultimate durability and clarity. Perfect for active lifestyles.`,
    tagline: "Performance and style",
  },
];

const ProductsContext = createContext<Product[]>([]);

export default ProductsContext;
