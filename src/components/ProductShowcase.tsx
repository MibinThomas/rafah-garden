"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Fresh Dragon Fruit",
    desc: "Sun-ripened, organic, and harvested at peak sweetness.",
    price: "$12.00 / kg",
    color: "from-pink-500 to-rose-500",
    image: "/images/fresh.png",
  },
  {
    id: 2,
    name: "Dragon Fruit Crush",
    desc: "Perfect for smoothies, desserts, or just a refreshing drink.",
    price: "$18.00",
    color: "from-brand-pink to-brand-secondary",
    image: "/images/crush.png",
  },
  {
    id: 3,
    name: "Dragon Fruit Jam",
    desc: "A naturally sweet spread made with 100% real fruit.",
    price: "$14.00",
    color: "from-brand-secondary to-[#8B0F4A]",
    image: "/images/jam.png",
  },
];

export default function ProductShowcase() {
  return (
    <section id="products" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-oswald text-5xl md:text-6xl text-gray-900 mb-4"
          >
            Our <span className="text-brand-pink">Harvest</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 font-light"
          >
            Directly from our farm to your table.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="relative group rounded-3xl bg-white p-8 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
            >
              <div className="relative w-full aspect-square mb-8 flex items-center justify-center rounded-3xl overflow-hidden group-hover:shadow-2xl transition-shadow duration-500">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:scale-110 transition-transform font-bold text-sm">
                    VIEW
                  </button>
                  <button className="bg-brand-pink text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform font-bold text-sm">
                    BUY
                  </button>
                </div>
              </div>

              <h3 className="font-oswald text-2xl text-gray-900 mb-2 truncate w-full">{product.name}</h3>
              <p className="text-gray-500 mb-6 text-sm flex-grow">{product.desc}</p>
              
              <div className="w-full flex items-center justify-between border-t border-gray-100 pt-6">
                <span className="font-semibold text-lg text-brand-green">{product.price}</span>
                <button className="text-sm font-bold uppercase tracking-widest text-brand-pink hover:text-brand-secondary transition-colors">
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
