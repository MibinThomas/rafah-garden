"use client";

import { heroProducts } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = heroProducts.find(p => p.id.toString() === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main 
      className="min-h-screen flex flex-col overflow-hidden"
      style={{ background: `linear-gradient(to bottom right, ${product.colorStart}, ${product.colorEnd})` }}
    >
      {/* Header / Navigation back */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full p-6 lg:p-10 flex justify-between items-center z-50 absolute top-0"
      >
        <Link href="/#home" className="text-white font-medium hover:text-white/80 transition-colors flex items-center gap-2 group">
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Home
        </Link>
      </motion.nav>

      {/* Hero Section of PDP */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center pt-24 pb-20 px-6 lg:px-20 gap-10 lg:gap-20">
        
        {/* Left: Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[280px] sm:max-w-xs lg:max-w-lg aspect-[3/4] lg:aspect-square flex items-center justify-center order-1 lg:order-none"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl opacity-40 mix-blend-overlay scale-75"></div>
          <Image 
            src={product.image}
            alt={product.title1}
            fill
            className="object-contain drop-shadow-[0_50px_70px_rgba(0,0,0,0.6)] z-10 scale-110 lg:scale-100"
            priority
          />
        </motion.div>

        {/* Right: Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="w-full max-w-lg text-white flex flex-col gap-4 lg:gap-6 order-2 lg:order-none z-20"
        >
          <div className="flex flex-col">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-outfit text-5xl sm:text-6xl lg:text-7xl font-light leading-tight drop-shadow-lg"
            >
              {product.title1} <br/> <span className="font-bold">{product.title2}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-4 lg:mt-6 text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed font-light"
            >
              {product.desc}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col gap-3 lg:gap-4 mt-2 lg:mt-4"
          >
            <h3 className="text-lg lg:text-xl font-bold uppercase tracking-widest text-white/80 border-b border-white/20 pb-2">Nutritional Highlights</h3>
            <ul className="text-sm lg:text-base space-y-2 font-light text-white/95">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-green rounded-full block shadow-sm shadow-brand-green"></span> 100% Organic & Natural</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-green rounded-full block shadow-sm shadow-brand-green"></span> No added preservatives</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-green rounded-full block shadow-sm shadow-brand-green"></span> Harvested at peak ripeness</li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 lg:mt-8 flex items-center gap-4"
          >
            <button className="flex-1 bg-white text-brand-pink py-3.5 lg:py-4 rounded-full font-bold text-base lg:text-lg hover:scale-105 transition-transform shadow-xl hover:shadow-2xl">
              Add to Cart - ₹1,099
            </button>
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-white/50 flex items-center justify-center cursor-pointer hover:bg-white/20 hover:border-white transition-all">
              <span className="text-xl lg:text-2xl">&hearts;</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
