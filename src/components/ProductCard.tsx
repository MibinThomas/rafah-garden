"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : null;

  return (
    <Link href={`/shop/${product.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group flex flex-col h-full cursor-pointer"
      >
        {/* Image Container Box */}
        <div className="relative aspect-square overflow-hidden bg-[#F5F5F5] flex items-center justify-center p-8 transition-all duration-300 group-hover:bg-[#EEEEEE] group-hover:shadow-md">
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          {/* Badges (Top Left) */}
          {product.oldPrice && (
            <div className="absolute top-0 left-0 flex flex-col z-10">
              <span className="bg-dragonfruit-pink text-white text-[10px] font-bold uppercase px-2.5 py-1.5 min-w-[45px] text-center">
                Sale
              </span>
              <span className="bg-black text-white text-[10px] font-bold px-2.5 py-1.5 min-w-[45px] text-center">
                -{discount}%
              </span>
            </div>
          )}

          {/* Quick Add Button (Floating on hover) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({ ...product, quantity: 1 });
              }}
              className="bg-white text-garden-green p-4 rounded-full shadow-xl hover:bg-garden-green hover:text-white transition-all transform hover:scale-110 active:scale-95 translate-y-4 group-hover:translate-y-0 duration-300"
            >
              <ShoppingCart size={22} />
            </button>
          </div>
        </div>

        {/* Content Below Box */}
        <div className="pt-4 flex flex-col">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-dragonfruit-pink transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-3">
            <p className="text-base font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {product.oldPrice && (
              <p className="text-sm text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
