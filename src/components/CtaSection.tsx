"use client";

import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background with Pink Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-pink via-brand-secondary to-[#8B0F4A]" />
      
      {/* Abstract Shapes overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-brand-green rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-oswald text-5xl md:text-7xl text-white mb-8"
        >
          Experience Nature&apos;s Sweetness
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/80 text-xl font-light mb-12 max-w-2xl mx-auto"
        >
          Taste the difference of authentic, organic dragon fruit straight from our farms in Kerala.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-brand-pink px-12 py-5 rounded-full font-bold text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-shadow tracking-wide"
        >
          Order Now
        </motion.button>
      </div>
    </section>
  );
}
