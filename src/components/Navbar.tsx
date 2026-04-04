"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/#products" },
  { name: "Experience", href: "/#experience" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-white/10 py-4"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 max-w-[1600px] mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/Rafah logo.webp"
              alt="Rafah Garden"
              width={130}
              height={44}
              className="w-auto h-8 md:h-9 object-contain brightness-0 invert"
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center gap-8"
        >
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#products"
            className="flex items-center gap-2 text-white border border-white/30 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-200"
          >
            <ShoppingBag size={12} />
            Shop
          </Link>
        </motion.nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-black/50 backdrop-blur-xl border-t border-white/10"
      >
        <nav className="flex flex-col items-center py-6 gap-5">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white text-sm uppercase tracking-[0.2em] font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#products"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-white border border-white/30 rounded-full px-5 py-2 text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            <ShoppingBag size={12} />
            Shop
          </Link>
        </nav>
      </motion.div>
    </motion.header>
  );
}
