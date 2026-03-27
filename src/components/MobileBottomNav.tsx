"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, LayoutGrid, Tag, User, ShoppingCart } from "lucide-react";

export default function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Categories", href: "#categories", icon: LayoutGrid },
    { name: "Deals", href: "#deals", icon: Tag },
    { name: "Account", href: "#account", icon: User },
    { name: "Cart", href: "#cart", icon: ShoppingCart, badge: 1 },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-[60] px-2 pt-3 pb-4">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={() => setActiveTab(item.name)}
              className={`flex flex-col items-center justify-center w-full gap-1 transition-colors duration-200 ${
                isActive ? "text-brand-pink" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <div className="relative">
                <Icon 
                  size={24} 
                  className={isActive ? "stroke-[2.5px] fill-brand-pink/10" : "stroke-2"} 
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-[#4285F4] text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
