"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleText = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const yImage1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} id="experience" className="py-32 bg-brand-pink relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center justify-center text-center">
        
        <motion.div style={{ scale: scaleText }} className="mb-20">
          <h2 className="font-oswald text-6xl md:text-8xl lg:text-[10rem] leading-none text-white drop-shadow-2xl">
            FRESH.<br />
            <span className="text-brand-green mix-blend-screen">NATURAL.</span><br />
            DELICIOUS.
          </h2>
        </motion.div>

        {/* Abstract floating elements representing bottles/products with 3D depth */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            style={{ y: yImage1 }}
            className="absolute top-[20%] left-[15%] w-48 h-64 bg-glass rounded-[2rem] shadow-2xl backdrop-blur-md border border-white/30 transform rotate-[-15deg]"
          />
          <motion.div 
            style={{ y: yImage2 }}
            className="absolute bottom-[20%] right-[15%] w-56 h-72 bg-glass rounded-[2rem] shadow-2xl backdrop-blur-md border border-white/30 transform rotate-[15deg] bg-gradient-to-tr from-white/20 to-transparent"
          />
        </div>

      </div>
    </section>
  );
}
