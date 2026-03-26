"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const heroProducts = [
  {
    id: 1,
    title1: "Dragon Fruit",
    title2: "Crush",
    desc: "Discover a world of vibrant flavors with our premium organic selection. At Rafah Garden, we believe in the power of nature's finest ingredients to bring you delicious refreshment.",
    image: "/images/crush.png",
    bgClass: "from-[#E25695] to-[#AD135C]",
  },
  {
    id: 2,
    title1: "Fresh Organic",
    title2: "Dragon Fruit",
    desc: "Sun-ripened, organic, and harvested at peak sweetness. Experience the authentic taste of pristine nature in every lush bite of our fresh produce.",
    image: "/images/fresh.png",
    bgClass: "from-brand-pink to-[#8B0F4A]",
  },
  {
    id: 3,
    title1: "Premium Artisanal",
    title2: "Fruit Jam",
    desc: "A naturally sweet spread made with 100% real fruit. Perfect for your morning toast or artisanal desserts, crafted with endless passion in Kerala.",
    image: "/images/jam.png",
    bgClass: "from-[#AD135C] to-purple-900",
  }
];

export default function Hero() {
  const ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yFruits1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const yFruits2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const currentProduct = heroProducts[currentIndex];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);

  return (
    <section
      ref={ref}
      id="home"
      className={`relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br transition-colors duration-1000 ${currentProduct.bgClass}`}
    >
      {/* Huge Background Text */}
      <motion.div 
        style={{ y: yText }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <h1 className="font-oswald text-[30vw] md:text-[25vw] leading-none text-white font-bold tracking-tighter opacity-95 whitespace-nowrap drop-shadow-lg transition-all duration-1000">
          RAFAH
        </h1>
      </motion.div>

      {/* Floating Fruits Background Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div 
          style={{ y: yFruits1 }}
          animate={{ rotate: 360, y: [0, -20, 0] }}
          transition={{ rotate: { duration: 50, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-[15%] left-[20%] w-32 h-32 md:w-56 md:h-56 drop-shadow-2xl"
        >
          <Image src="/images/fresh.png" alt="Dragon Fruit" fill className="object-contain" priority />
        </motion.div>
        
        <motion.div 
          style={{ y: yFruits2 }}
          animate={{ rotate: -360, y: [0, 20, 0] }}
          transition={{ rotate: { duration: 60, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-[20%] right-[20%] w-24 h-24 md:w-48 md:h-48 drop-shadow-2xl"
        >
          <Image src="/images/fresh.png" alt="Dragon Fruit" fill className="object-contain" priority />
        </motion.div>
      </div>

      {/* Center Animated Product Image */}
      <div className="relative z-20 w-full max-w-xs md:max-w-md lg:max-w-lg aspect-[1/2] mt-10 md:mt-0 flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, x: 100, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -100, rotate: -10 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={currentProduct.image} 
              alt={currentProduct.title2} 
              fill 
              className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]" 
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Left Animated Content */}
      <div className="absolute bottom-12 left-6 md:left-16 z-30 max-w-xs md:max-w-md text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-outfit text-4xl md:text-5xl font-light mb-4 leading-tight">
              {currentProduct.title1} <br/> <span className="font-bold">{currentProduct.title2}</span>
            </h2>
            <p className="text-sm md:text-base text-white/90 font-light mb-6 leading-relaxed">
              {currentProduct.desc}
            </p>
          </motion.div>
        </AnimatePresence>
        <button className="bg-white text-brand-pink px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-xl hover:shadow-2xl">
          See More
        </button>
      </div>

      {/* Center Bottom Navigation Arrows */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden md:flex gap-4">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-brand-pink transition-colors text-xl font-light cursor-pointer shadow-lg"
        >
          &#10094;
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-brand-pink transition-colors text-xl font-light cursor-pointer shadow-lg"
        >
          &#10095;
        </button>
      </div>

      {/* Right Side Size Selectors */}
      <div className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-5">
        <button className="w-20 h-20 rounded-full bg-white text-brand-pink font-bold text-base shadow-2xl flex items-center justify-center flex-col leading-tight transform hover:scale-110 transition-transform">
          <span>500</span>
          <span className="text-xs">ML</span>
        </button>
        <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/40 text-white font-medium text-sm hover:bg-white/30 transition-all flex items-center justify-center flex-col leading-tight cursor-pointer hover:scale-105">
          <span>100</span>
          <span className="text-[10px]">ML</span>
        </button>
        <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/40 text-white font-medium text-sm hover:bg-white/30 transition-all flex items-center justify-center flex-col leading-tight cursor-pointer hover:scale-105">
          <span>125</span>
          <span className="text-[10px]">ML</span>
        </button>
      </div>

      {/* Bottom Right Scroll Down */}
      <div className="absolute bottom-12 right-6 md:right-16 z-30 hidden md:block">
        <a href="#about" className="w-24 h-24 rounded-full border border-white/40 flex items-center justify-center text-white flex-col gap-1 cursor-pointer hover:border-white transition-all hover:bg-white/10 backdrop-blur-sm shadow-xl group">
          <span className="text-xs uppercase tracking-widest font-medium text-center leading-tight group-hover:scale-110 transition-transform">Scroll<br/>Down</span>
        </a>
      </div>
    </section>
  );
}
