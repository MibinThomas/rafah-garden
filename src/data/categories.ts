export interface Category {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bgColor: string;
  accentColor: string;
}

export const categories: Category[] = [
  {
    id: "crush",
    number: "01",
    title: "Dragon Fruit Crush",
    subtitle: "Delicious flavour",
    description: "Discover a world of vibrant flavors with our premium organic selection. At Rafah Garden, we believe in the power of nature's finest ingredients to bring you delicious refreshment.",
    image: "/images/Bottle1.webp",
    bgColor: "#C81C6A",
    accentColor: "#ffffff",
  },
  {
    id: "jam",
    number: "02",
    title: "Dragon Fruit Jam",
    subtitle: "Artisanal spread",
    description: "A naturally sweet spread made with 100% real fruit. Perfect for your morning toast or artisanal desserts, crafted with endless passion in Kerala.",
    image: "/images/jam_premium.png",
    bgColor: "#AD135C",
    accentColor: "#ffffff",
  },
  {
    id: "fruits",
    number: "03",
    title: "Fresh Fruits",
    subtitle: "Organic produce",
    description: "Sun-ripened, organic, and harvested at peak sweetness. Experience the authentic taste of pristine nature in every lush bite of our fresh produce.",
    image: "/images/fresh fruits.png",
    bgColor: "#88b671",
    accentColor: "#ffffff",
  },
  {
    id: "plants",
    number: "04",
    title: "Eco Plants",
    subtitle: "Nature to your home",
    description: "Bring the beauty of Rafah Garden into your space. Our healthy dragon fruit plants are nurtured with care to ensure they thrive in your home or garden.",
    image: "/images/plants_premium.png",
    bgColor: "#1D311F",
    accentColor: "#ffffff",
  },
];
