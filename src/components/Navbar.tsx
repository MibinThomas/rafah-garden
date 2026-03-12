"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4 md:px-8",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tighter text-garden-green md:text-3xl">
            Rafah<span className="text-dragonfruit-pink">Garden</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-dragonfruit-pink transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dragonfruit-pink transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-5">
          <button className="text-gray-700 hover:text-dragonfruit-pink transition-colors">
            <Search size={22} />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="text-gray-700 hover:text-dragonfruit-pink transition-colors relative"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-dragonfruit-pink text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white overflow-hidden mt-4 rounded-2xl shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-dragonfruit-pink text-white py-3 rounded-xl font-semibold mt-4 text-center block"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
