"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image/Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[600px] w-full rounded-3xl overflow-hidden group"
          >
            {/* Placeholder for real farm image */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/20 to-brand-green/30 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-brand-pink/5" />
            
            {/* Glass decoration */}
            <div className="absolute bottom-8 left-8 right-8 glass rounded-2xl p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="font-oswald text-xl text-brand-secondary mb-1">Authentic Kerala Origin</p>
              <p className="text-gray-600 text-sm">Grown with passion and natural cultivation practices.</p>
            </div>
          </motion.div>

          {/* Right: Text Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4 text-brand-green">
              <Leaf size={24} />
              <span className="font-semibold uppercase tracking-widest text-sm">Our Story</span>
            </div>
            
            <h2 className="font-oswald text-5xl md:text-6xl text-gray-900 mb-8 leading-tight">
              A Passion For <br/>
              <span className="text-brand-pink">Natural Farming</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 font-light">
              <p>
                Nestled in the lush landscapes of Kerala, Rafah Garden started with a simple vision: to cultivate the finest dragon fruits using methods that honor the earth.
              </p>
              <p>
                We believe that nature provides the sweetest flavors when left untouched by harmful chemicals. From the meticulous care of our vines to the sun-kissed harvest, every step is driven by a deep respect for our environment.
              </p>
              <p className="font-medium text-brand-secondary border-l-4 border-brand-green pl-4 italic">
                Experience the authentic taste of completely natural, farm-fresh fruit that brings health and joy to every sip and bite.
              </p>
            </div>

            <motion.div 
              className="mt-10"
              whileHover={{ x: 10 }}
            >
              <a href="#products" className="inline-flex items-center gap-2 font-semibold text-brand-pink uppercase tracking-widest group">
                Discover our process
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>

          </motion.div>
        
        </div>
      </div>
    </section>
  );
}
