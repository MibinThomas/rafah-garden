"use client";

import { useCategory } from "@/context/CategoryContext";
import { categories } from "@/data/categories";
import { GlassWater, Container, Apple, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { id: "crush", label: "Crush", icon: GlassWater },
  { id: "jam", label: "Jam", icon: Container },
  { id: "fruits", label: "Fruits", icon: Apple },
  { id: "plants", label: "Plants", icon: Leaf },
];

export default function MobileBottomNav() {
  const { activeCategoryId, setActiveCategoryId } = useCategory();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-[60] px-4 pt-3 pb-6">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeCategoryId === item.id;
          const category = categories.find(c => c.id === item.id);
          const Icon = item.icon;
          
          return (
            <button 
              key={item.id} 
              onClick={() => setActiveCategoryId(item.id)}
              className="flex flex-col items-center justify-center relative flex-1 gap-1 group"
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${
                isActive ? "bg-brand-pink/10 text-brand-pink" : "text-gray-400 group-hover:text-gray-600"
              }`}>
                <Icon 
                  size={24} 
                  className={isActive ? "stroke-[2.5px]" : "stroke-2"} 
                />
              </div>
              <span className={`text-[10px] uppercase tracking-wider transition-colors duration-300 ${
                isActive ? "text-brand-pink font-bold" : "text-gray-400 font-medium"
              }`}>
                {item.label}
              </span>
              
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-brand-pink"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
