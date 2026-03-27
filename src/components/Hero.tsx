"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroProducts } from "@/data/products";



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
        <h1 className="font-oswald text-[40vw] md:text-[30vw] lg:text-[25vw] leading-none text-white font-bold tracking-tighter opacity-95 whitespace-nowrap drop-shadow-lg transition-all duration-1000 -translate-y-16 md:translate-y-0">
          RAFAH
        </h1>
      </motion.div>

      {/* Floating Fruits Background Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
        <motion.div 
          style={{ y: yFruits1 }}
          animate={{ rotate: 360, y: [0, -20, 0] }}
          transition={{ rotate: { duration: 50, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute top-[15%] left-[20%] w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 drop-shadow-2xl"
        >
          <Image src="/images/fresh.png" alt="Dragon Fruit" fill className="object-contain" priority />
        </motion.div>
        
        <motion.div 
          style={{ y: yFruits2 }}
          animate={{ rotate: -360, y: [0, 20, 0] }}
          transition={{ rotate: { duration: 60, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute bottom-[20%] right-[20%] w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 drop-shadow-2xl"
        >
          <Image src="/images/fresh.png" alt="Dragon Fruit" fill className="object-contain" priority />
        </motion.div>
      </div>

      {/* Center Animated Product Image */}
      <div className="relative z-20 w-full h-[45vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] max-w-full md:max-w-sm lg:max-w-md xl:max-w-lg -translate-y-16 md:translate-y-0 flex justify-center items-center">
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
      <div className="absolute bottom-32 md:bottom-12 left-0 md:left-16 w-full md:w-auto px-6 md:px-0 z-30 flex flex-col items-center md:items-start text-center md:text-left text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:items-start"
          >
            <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-light mb-2 md:mb-4 leading-tight">
              {currentProduct.title1} <br className="hidden sm:block"/> <span className="font-bold">{currentProduct.title2}</span>
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-white/90 font-light mb-4 md:mb-6 leading-relaxed max-w-[300px] md:max-w-[380px] lg:max-w-md">
              {currentProduct.desc}
            </p>
          </motion.div>
        </AnimatePresence>
        <Link 
          href={`/product/${currentProduct.id}`}
          className="inline-block bg-white text-brand-pink px-6 md:px-7 lg:px-8 py-2 md:py-2.5 lg:py-3 rounded-full font-bold text-xs md:text-sm hover:scale-105 transition-transform shadow-xl hover:shadow-2xl"
        >
          See More
        </Link>
      </div>

      {/* Center Bottom Navigation Arrows */}
      <div className="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex md:flex gap-4">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-brand-pink transition-colors text-lg lg:text-xl font-light cursor-pointer shadow-lg"
        >
          &#10094;
        </button>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-brand-pink transition-colors text-lg lg:text-xl font-light cursor-pointer shadow-lg"
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
        <a href="#about" className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-brand-pink flex-col gap-1 cursor-pointer transition-all hover:scale-110 shadow-[0_10px_40px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_50px_rgba(255,255,255,0.5)] ring-4 ring-white/20 group animate-pulse-slow">
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-center leading-tight group-hover:scale-110 transition-transform">Get in<br/>Bulk</span>
        </a>
      </div>
    </section>
  );
}
