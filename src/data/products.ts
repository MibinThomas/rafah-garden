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
    image: "/images/crush.png",
    bgColor: "#c81c6a",
  },
  {
    id: 2,
    title1: "Fresh Organic",
    title2: "Dragon Fruit",
    desc: "Sun-ripened, organic, and harvested at peak sweetness. Experience the authentic taste of pristine nature in every lush bite of our fresh produce.",
    image: "/images/fresh.png",
    bgColor: "#ad135c",
  },
  {
    id: 3,
    title1: "Premium Artisanal",
    title2: "Fruit Jam",
    desc: "A naturally sweet spread made with 100% real fruit. Perfect for your morning toast or artisanal desserts, crafted with endless passion in Kerala.",
    image: "/images/jam.png",
    bgColor: "#7fa33f",
  }
];
