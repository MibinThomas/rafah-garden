"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Instagram, Maximize2 } from "lucide-react";

const images = [
  { src: "/images/farm-landscape.png", title: "Sunrise over Orchards", size: "col-span-2 row-span-2" },
  { src: "/images/hero-dragon-fruit.png", title: "Premium Harvest", size: "col-span-1 row-span-1" },
  { src: "/images/farm-landscape.png", title: "Our Sustainable Soil", size: "col-span-1 row-span-1" },
  { src: "/images/hero-dragon-fruit.png", title: "Close-up Quality", size: "col-span-1 row-span-2" },
  { src: "/images/farm-landscape.png", title: "Local Workers", size: "col-span-2 row-span-1" },
  { src: "/images/hero-dragon-fruit.png", title: "Pink Dragon Fruit", size: "col-span-1 row-span-1" },
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 md:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-dragonfruit-pink font-bold uppercase tracking-widest text-sm">
              <Camera size={18} />
              <span>In Frame</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-garden-green tracking-tighter capitalize underline decoration-dragonfruit-pink/20 underline-offset-8">
              Life at the Farm.
            </h1>
            <p className="text-lg text-gray-500 max-w-lg">
              A visual journey through our orchards, the people who grow our fruit, and the beauty of Rafah.
            </p>
          </div>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            className="flex items-center space-x-3 bg-gray-50 px-6 py-4 rounded-2xl font-bold text-gray-700 hover:bg-dragonfruit-pink hover:text-white transition-all group"
          >
            <Instagram size={20} className="group-hover:scale-110 transition-transform" />
            <span>Follow @RafahGarden</span>
          </a>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-[2.5rem] overflow-hidden group cursor-pointer ${img.size}`}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-xl">{img.title}</h3>
                  <div className="flex items-center space-x-2 text-cream/70 text-xs font-bold uppercase tracking-widest">
                    <span>Rafah Orchards</span>
                    <Maximize2 size={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 text-center px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="w-16 h-1 w-1/4 bg-dragonfruit-pink/20 mx-auto" />
          <p className="text-3xl md:text-4xl font-black text-garden-green italic leading-tight">
            &quot;Nature doesn&apos;t hurry, yet everything is accomplished.&quot;
          </p>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">— Lao Tzu</p>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
