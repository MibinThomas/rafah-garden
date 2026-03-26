"use client";

import { motion } from "framer-motion";
import { Sparkles, Leaf, ShieldCheck, Heart } from "lucide-react";

const benefits = [
  {
    title: "Rich in Antioxidants",
    desc: "Packed with natural compounds that help protect your body.",
    icon: <Sparkles className="w-8 h-8 text-brand-pink" />,
  },
  {
    title: "Natural Sweetness",
    desc: "100% natural, no artificial sugars or additives.",
    icon: <Heart className="w-8 h-8 text-brand-secondary" />,
  },
  {
    title: "Farm Fresh",
    desc: "Harvested at the perfect time for maximum flavor & nutrition.",
    icon: <Leaf className="w-8 h-8 text-brand-green" />,
  },
  {
    title: "Eco-Friendly",
    desc: "Grown using sustainable farming practices.",
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
  },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-oswald text-4xl md:text-5xl text-gray-900 mb-4">
            Why Choose <span className="text-brand-pink">Rafah Garden?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <div className="bg-white p-4 rounded-full shadow-sm mb-6 inline-flex justify-center items-center h-20 w-20">
                {benefit.icon}
              </div>
              <h3 className="font-oswald text-xl text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
