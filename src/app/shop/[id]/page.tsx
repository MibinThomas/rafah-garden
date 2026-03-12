"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Star, 
  ShieldCheck, 
  Truck, 
  ArrowRight 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import products from "@/lib/data.json";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  
  const product = useMemo(() => {
    return products.find((p) => p.id === params.id);
  }, [params.id]);

  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link href="/shop" className="text-dragonfruit-pink font-bold hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Mock multi-images for gallery
  const gallery = [product.image, "/images/farm-landscape.png", "/images/hero-dragon-fruit.png"];

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedVariant}`,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      variant: selectedVariant,
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        {/* Breadcrumbs / Back */}
        <button 
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-500 hover:text-garden-green transition-colors mb-8 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[2rem] overflow-hidden bg-cream shadow-inner"
            >
              <Image
                src={gallery[activeImage]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-500"
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "relative aspect-square rounded-2xl overflow-hidden border-2 transition-all",
                    activeImage === idx ? "border-dragonfruit-pink ring-2 ring-dragonfruit-pink/20" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-dragonfruit-pink font-bold uppercase tracking-widest text-xs">
                <Star size={14} fill="currentColor" />
                <span>Best Seller</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-garden-green tracking-tighter leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4">
                <p className="text-3xl font-black text-dragonfruit-pink">
                  ${product.price.toFixed(2)}
                </p>
                <div className="h-6 w-[1px] bg-gray-200" />
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  <span className="text-gray-400 text-xs font-bold ml-2">(128 Reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Variants */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Select Size/Weight</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={cn(
                      "px-6 py-3 rounded-xl font-bold transition-all border-2",
                      selectedVariant === v
                        ? "bg-garden-green border-garden-green text-white shadow-lg"
                        : "bg-white border-gray-100 text-gray-600 hover:border-garden-green/30"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex items-center space-x-4 bg-gray-50 rounded-2xl px-4 py-2 border">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-gray-500 hover:text-dragonfruit-pink transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="text-xl font-black w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-gray-500 hover:text-dragonfruit-pink transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 w-full bg-dragonfruit-pink text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-dragonfruit-pink/20 hover:scale-[1.02] transition-all"
              >
                <ShoppingBag size={24} />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="p-2 bg-garden-green/10 rounded-lg text-garden-green">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-sm font-bold">100% Organic Certified</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="p-2 bg-garden-green/10 rounded-lg text-garden-green">
                  <Truck size={20} />
                </div>
                <span className="text-sm font-bold">Free Local Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Snippet */}
        <section className="mt-32 bg-cream rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
          <div className="max-w-3xl space-y-8 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-garden-green leading-tight">
              Why this fruit matters.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every dragon fruit we sell is hand-pollinated and stone-ground (where applicable). We don't just farm; we preserve a legacy of agricultural excellence in Rafah. Our soil is enriched with organic compost, ensuring every bite is packed with the nutrients nature intended.
            </p>
            <Link href="/about" className="inline-flex items-center space-x-2 text-garden-green font-bold group">
              <span>Learn about our process</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/3 opacity-20 hidden lg:block">
            <Image 
              src="/images/farm-landscape.png" 
              alt="Farm" 
              fill 
              className="object-cover"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
