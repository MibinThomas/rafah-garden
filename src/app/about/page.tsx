"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <main ref={containerRef} className="bg-white min-h-[150vh] text-gray-800 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full p-6 lg:p-10 flex justify-between items-center z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <Link href="/#home" className="text-brand-pink font-bold hover:text-brand-secondary transition-colors flex items-center gap-2 group text-sm tracking-widest uppercase">
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Return Home
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#AF1A5B] to-[#7f1342] text-white">
        <motion.div style={{ y: titleY }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="font-avant text-[27vw] font-bold leading-none select-none opacity-20 text-white">RAFAH</h1>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ letterSpacing: "0.6em", color: "#fcd4e2" }}
            transition={{ duration: 0.8 }}
            className="text-xs md:text-sm font-medium tracking-[0.4em] uppercase mb-6 text-white/80 cursor-default"
          >
            The rafah Story
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, textShadow: "0px 10px 30px rgba(0,0,0,0.5)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-outfit text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight drop-shadow-xl cursor-default"
          >
            Cultivating <br className="hidden md:block"/> <span className="font-bold">Nature's Best</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl font-light text-white/90 leading-relaxed max-w-2xl mx-auto px-4"
          >
            Rafah Garden was born out of a genuine passion for authentic, pesticide-free agriculture. Nestled safely in the rich soils of the earth, our family-owned farm has nurtured exotic fruits entirely organically for generations.
          </motion.p>
        </div>
      </section>

      {/* Origin Section */}
      <section className="relative py-24 sm:py-32 bg-white flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 gap-12 lg:gap-16">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left z-10"
        >
          <h3 className="font-outfit text-4xl sm:text-5xl text-brand-secondary font-bold mb-6">Our Philosophy</h3>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 font-light max-w-lg">
            We believe that the sweetest fruits grow patiently under the sun without artificial shortcuts. By harvesting at the absolute peak of ripeness, we guarantee an incredibly vibrant palette of authentic flavors straight from the soil.
          </p>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-light max-w-lg">
            Our mission is refreshingly simple: To provide families with vibrant, transparently sourced produce that tastes identical to the untouched earth it sprang from.
          </p>
          
          <div className="grid grid-cols-2 gap-8 sm:gap-12 mt-10">
            <motion.div 
              whileHover={{ scale: 1.15, y: -10 }} 
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="cursor-pointer"
            >
              <h4 className="text-4xl sm:text-5xl font-oswald text-brand-pink font-bold mb-1 sm:mb-2">100%</h4>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">Organic Farms</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.15, y: -10 }} 
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="cursor-pointer"
            >
              <h4 className="text-4xl sm:text-5xl font-oswald text-brand-green font-bold mb-1 sm:mb-2">24h</h4>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">Farm to Table</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: imageY }}
          whileHover={{ scale: 1.05, rotate: -2, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full lg:w-1/2 relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl h-[50vh] sm:h-[60vh] max-w-lg cursor-pointer group"
        >
          {/* We simulate a scenic crop by drastically scaling the existing fresh dragon fruit and adding an overlay */}
          <div className="absolute inset-0 bg-[#AF1A5B] mix-blend-color z-10 opacity-30 group-hover:opacity-0 transition-opacity duration-700"></div>
          <Image 
            src="/images/fresh.png" 
            alt="Farm representation" 
            fill 
            className="object-cover scale-[2.5] md:scale-150 origin-center filter contrast-125 saturate-150"
          />
        </motion.div>
      </section>
      
      {/* Spacer to prevent mobile nav bar overlapping the bottom */}
      <div className="h-32 bg-white"></div>
    </main>
  );
}
