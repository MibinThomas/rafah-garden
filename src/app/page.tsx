"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Star, Sparkles, Globe } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import products from "@/lib/data.json";

export default function Home() {

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-garden-green/10 text-garden-green px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
              <Leaf size={16} />
              <span>100% Organic Fram-to-Table</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-garden-green leading-[0.9] tracking-tighter">
              The Purest <br />
              <span className="text-dragonfruit-pink">Dragon Fruit</span> <br />
              Experience.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              Experience the vibrant taste of Rafah Garden. Hand-picked, locally grown, and delivered fresh from our orchards to your table.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/shop" 
                className="bg-garden-green text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-opacity-90 hover:shadow-xl hover:shadow-garden-green/20 transition-all"
              >
                <span>Shop the Harvest</span>
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="/about" 
                className="bg-white text-garden-green border-2 border-garden-green/10 px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center hover:bg-garden-green/5 transition-all"
              >
                <span>Our Story</span>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative"
          >
            <div className="relative aspect-square max-w-[600px] mx-auto">
              <div className="absolute inset-0 bg-dragonfruit-pink/10 rounded-full blur-3xl animate-pulse" />
              <Image
                src="/images/hero-dragon-fruit.png"
                alt="Premium Dragon Fruit"
                fill
                priority
                className="object-contain filter drop-shadow-2xl"
              />
            </div>
            {/* Floating Element */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl space-y-2 hidden md:block"
            >
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="font-bold text-sm text-gray-900 italic">&quot;The freshest fruit I&apos;ve ever tasted!&quot;</p>
              <p className="text-xs text-gray-500">- Sarah J, Premium Member</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-10 bg-dragonfruit-pink rounded-full" />
              <h2 className="text-3xl md:text-4xl font-black text-[#001D3D]">Popular Products</h2>
            </div>
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar w-full md:w-auto">
              <button className="text-dragonfruit-pink font-bold text-sm border-b-2 border-dragonfruit-pink pb-1 shrink-0">Top Rated</button>
              <button className="text-gray-400 font-bold text-sm hover:text-dragonfruit-pink transition-colors shrink-0">Best Selling</button>
              <button className="text-gray-400 font-bold text-sm hover:text-dragonfruit-pink transition-colors shrink-0">Latest Product</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, 8).map((product, idx) => (
              <div 
                key={product.id}
                className={`
                  ${idx >= 4 ? "hidden md:block" : ""} 
                  ${idx >= 6 ? "md:hidden lg:block" : ""}
                `}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/farm-landscape.png"
            alt="Farm Landscape"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="bg-garden-green rounded-3xl md:rounded-[4rem] text-white p-8 md:p-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <Globe size={300} strokeWidth={1} />
            </div>
            
            <div className="max-w-2xl space-y-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-dragonfruit-pink font-bold uppercase tracking-widest">
                  <Sparkles size={20} />
                  <span>Our Philosophy</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black leading-tight">
                  Grown with respect <br /> for the Earth.
                </h2>
                <p className="text-xl text-cream/80 leading-relaxed">
                  Founded in 2012, Rafah Garden has been a pioneer in sustainable dragon fruit farming. We believe in transparency, organic practices, and bringing the purest form of nature back to your table.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl font-black text-dragonfruit-pink">100%</p>
                  <p className="text-sm text-cream/60">Organic Certified</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-dragonfruit-pink">24h</p>
                  <p className="text-sm text-cream/60">Farm to Table</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-dragonfruit-pink">50k+</p>
                  <p className="text-sm text-cream/60">Happy Customers</p>
                </div>
              </div>

              <Link 
                href="/about" 
                className="inline-flex items-center space-x-3 bg-white text-garden-green px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform"
              >
                <span>Read Our Full Story</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* B2B / Bulk CTA */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-cream rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 border border-garden-green/5">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-garden-green">B2B & Bulk Orders</h2>
              <p className="text-gray-600 max-w-xl text-lg">
                Are you a restaurant, cafe, or wholesaler? Partner with us for consistent supply of premium dragon fruit products.
              </p>
            </div>
            <button className="bg-dragonfruit-pink text-white px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-dragonfruit-pink/20 transition-all shrink-0">
              Get Wholesale Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
