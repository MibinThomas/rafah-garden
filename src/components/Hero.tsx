"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";

export default function Hero() {
  const [activeCategoryId, setActiveCategoryId] = useState("crush");

  return (
    <section id="hero" className="relative h-screen min-h-[700px] w-full overflow-hidden bg-background pt-20">
      <div className="flex h-full w-full flex-col md:flex-row">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isActive={activeCategoryId === category.id}
            onClick={() => setActiveCategoryId(category.id)}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryItem({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: typeof categories[0], 
  isActive: boolean, 
  onClick: () => void 
}) {
  return (
    <motion.div
      onClick={onClick}
      layout
      initial={false}
      animate={{
        flex: isActive ? 3 : 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }}
      className={`relative h-full cursor-pointer overflow-hidden border-r border-white/10 last:border-0 transition-colors duration-500`}
      style={{ backgroundColor: isActive ? category.bgColor : "#f8f8f8" }}
    >
      {/* Background Text Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <h2 className="text-[20vw] font-black text-white whitespace-nowrap uppercase tracking-tighter">
              {category.id}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex h-full w-full flex-col p-8 md:p-12">
        {/* Number & Basic Info (Preview) */}
        <div className={`mb-12 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`}>
          <span className={`block text-5xl md:text-6xl font-oswald font-bold opacity-50 mb-4 transition-colors duration-500`} style={{ color: isActive ? 'white' : category.bgColor }}>
            {category.number}
          </span>
          <h3 className={`text-2xl md:text-3xl font-bold uppercase tracking-tight transition-colors duration-500 ${isActive ? 'text-white' : 'text-foreground'}`}>
            {category.title}
          </h3>
          <p className={`text-sm opacity-60 uppercase tracking-widest mt-1 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`}>
            {category.subtitle}
          </p>
        </div>

        {/* Expanded Content */}
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex-1 flex flex-col items-center justify-center md:items-start md:justify-end md:pb-12"
            >
              <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] mb-6 group">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-700"
                  priority
                />
              </div>
              
              <div className="max-w-md w-full bg-black/10 backdrop-blur-sm p-6 rounded-2xl md:bg-transparent md:backdrop-blur-0 md:p-0">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white text-sm md:text-base font-light leading-relaxed mb-6 line-clamp-3 md:line-clamp-none"
                >
                  {category.description}
                </motion.p>
                <Link
                  href={category.id === 'crush' ? `/product/1` : `/category/${category.id}`}
                  className="inline-flex items-center group bg-white text-foreground px-6 py-3 md:px-8 md:py-4 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm transition-all hover:bg-black hover:text-white"
                >
                  View more
                  <svg className="ml-2 w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-end"
            >
              <div className="w-full h-2 rounded-full bg-black/5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover Line Marker removed */}
    </motion.div>
  );
}
