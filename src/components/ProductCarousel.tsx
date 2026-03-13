"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group/carousel w-full">
      {/* Navigation Buttons */}
      <div className="absolute -top-20 right-0 flex items-center gap-3 z-20">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`p-4 rounded-2xl border-2 border-garden-green/10 transition-all duration-300 flex items-center justify-center ${
            canScrollLeft 
              ? "bg-white text-garden-green hover:bg-garden-green hover:text-white hover:border-garden-green shadow-lg" 
              : "bg-gray-50 text-gray-300 cursor-not-allowed"
          }`}
          aria-label="Previous products"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`p-4 rounded-2xl border-2 border-garden-green/10 transition-all duration-300 flex items-center justify-center ${
            canScrollRight 
              ? "bg-white text-garden-green hover:bg-garden-green hover:text-white hover:border-garden-green shadow-lg" 
              : "bg-gray-50 text-gray-300 cursor-not-allowed"
          }`}
          aria-label="Next products"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Carousel Container */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-12 pt-4 px-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div 
            key={product.id}
            className="flex-none snap-start transition-all duration-500 hover:z-10
              w-[calc(50%-8px)] 
              sm:w-[calc(25%-18px)] 
              lg:w-[calc(16.666%-20px)] 
              2xl:w-[calc(12.5%-21px)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Gradient Fade Indicators */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 bottom-12 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 hidden md:block"
          />
        )}
        {canScrollRight && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-0 bottom-12 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden md:block"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductCarousel;
