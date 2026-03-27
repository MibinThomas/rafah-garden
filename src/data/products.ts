export interface Product {
  id: string | number;
  title1: string;
  title2: string;
  desc: string;
  image: string;
  bgColor: string;
}

export const heroProducts: Product[] = [
  {
    id: 1,
    title1: "Dragon Fruit",
    title2: "Crush",
    desc: "Discover a world of vibrant flavors with our premium organic selection. At Rafah Garden, we believe in the power of nature's finest ingredients to bring you delicious refreshment.",
    image: "/images/Bottle1.webp",
    bgColor: "#c81c6a",
  },
  {
    id: 2,
    title1: "Fresh Organic",
    title2: "Dragon Fruit",
    desc: "Sun-ripened, organic, and harvested at peak sweetness. Experience the authentic taste of pristine nature in every lush bite of our fresh produce.",
    image: "/images/Bottle2.webp",
    bgColor: "#ad135c",
  },
  {
    id: 3,
    title1: "Premium Artisanal",
    title2: "Fruit Jam",
    desc: "A naturally sweet spread made with 100% real fruit. Perfect for your morning toast or artisanal desserts, crafted with endless passion in Kerala.",
    image: "/images/Bottle3.webp",
    bgColor: "#7fa33f",
  },
  {
    id: 4,
    title1: "Ultimate",
    title2: "Collection",
    desc: "Experience the complete spectrum of pristine nature in our master collection. Hand-picked and cold-pressed directly from the lush soils of Kerala.",
    image: "/images/Bottle4.webp",
    bgColor: "#8B0F4A",
  }
];
