"use client";

import { useParams, useRouter } from "next/navigation";
import { categories } from "@/data/categories";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const category = categories.find((c) => c.id === id);

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
        <Link href="/" className="text-brand-pink hover:underline uppercase tracking-widest text-sm font-bold">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-pink selection:text-white">
      <Navbar />
      
      {/* Hero Section for Category */}
      <section 
        className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden" 
        style={{ backgroundColor: category.bgColor }}
      >
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block text-xl md:text-2xl font-oswald font-bold opacity-40 mb-2 uppercase tracking-widest"
              >
                Category {category.number}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8"
              >
                {category.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl font-light opacity-90 max-w-xl mb-10 leading-relaxed"
              >
                {category.description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  href="/#hero"
                  className="inline-flex items-center group bg-white text-foreground px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl transition-all hover:bg-black hover:text-white hover:-translate-y-1"
                >
                  Explore Collection
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
              className="flex-1 relative w-full h-[400px] md:h-[600px]"
            >
              <Image 
                src={category.image} 
                alt={category.title} 
                fill 
                className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.5)]"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Decorative background text */}
        <div className="absolute inset-x-0 -bottom-20 pointer-events-none select-none overflow-hidden opacity-10">
          <h2 className="text-[30vw] font-black text-white whitespace-nowrap uppercase tracking-tighter -translate-x-1/4">
            {category.title.split(' ')[0]}
          </h2>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 flex flex-col md:flex-row items-center gap-6">
              <span className="w-20 h-px bg-brand-pink md:block hidden" />
              Crafting Quality Experiences
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our {category.title} line is the result of years of dedicated research and a commitment to Kerala's rich agricultural heritage. We source every ingredient directly from local farms, ensuring that what reaches your home is as fresh as if you had picked it yourself.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're looking for vibrant refreshment or a touch of nature for your living space, Rafah Garden provides unparalleled quality and taste that defines the modern organic lifestyle.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold mb-4">Why Choose Rafah?</h4>
                  <ul className="space-y-4">
                    {['100% Organic Certified', 'Farm-to-Table Logistics', 'Sustainable Practices', 'Artisanal Preparation'].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-brand-pink" />
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="font-bold text-sm uppercase tracking-widest text-brand-pink">
                    Rafah Garden Standard · Kerala, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-like CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <Link 
            href="/"
            className="text-gray-400 hover:text-black uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center gap-2 group transition-colors"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Rafah Garden Home
          </Link>
        </div>
      </section>
    </main>
  );
}
