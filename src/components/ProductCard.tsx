"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowUpRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-garden-green text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => addItem({ ...product, quantity: 1 })}
            className="bg-dragonfruit-pink text-white p-3 rounded-full shadow-lg hocus:scale-110 transition-transform"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-garden-green transition-colors">
            {product.name}
          </h3>
          <Link href={`/shop/${product.id}`} className="text-gray-400 hover:text-dragonfruit-pink">
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <p className="text-2xl font-black text-garden-green">
            ${product.price.toFixed(2)}
          </p>
          <Link 
            href={`/shop/${product.id}`}
            className="text-xs font-bold text-gray-500 hover:text-dragonfruit-pink uppercase tracking-widest transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
