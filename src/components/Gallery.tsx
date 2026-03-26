"use client";

import { motion } from "framer-motion";

export default function Gallery() {
  const images = [
    { id: 1, class: "col-span-1 row-span-2 md:col-span-2 md:row-span-2", bg: "from-brand-pink/20 to-brand-secondary/20", title: "Harvest Time" },
    { id: 2, class: "col-span-1 row-span-1", bg: "from-brand-green/20 to-emerald-200/20", title: "Fresh Produce" },
    { id: 3, class: "col-span-1 row-span-1", bg: "from-orange-200/20 to-red-200/20", title: "Our Farm" },
    { id: 4, class: "col-span-1 md:col-span-2 row-span-1", bg: "from-blue-200/20 to-purple-200/20", title: "Natural Process" },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-oswald text-5xl text-gray-900 mb-4">
              Farm <span className="text-brand-green">Life</span>
            </h2>
            <p className="text-gray-500">A glimpse into our natural cultivation process.</p>
          </div>
          <button className="hidden md:block uppercase tracking-widest text-sm font-semibold text-brand-pink hover:text-brand-secondary transition-colors mt-4 md:mt-0">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`relative group rounded-3xl overflow-hidden cursor-pointer bg-gradient-to-br ${img.bg} ${img.class}`}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                <span className="text-white font-oswald text-2xl tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.title}
                </span>
              </div>
              
              {/* Simulated Image */}
              <div className="absolute inset-0 mix-blend-multiply bg-black/5 group-hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
