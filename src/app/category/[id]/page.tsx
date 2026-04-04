"use client";

import { useParams } from "next/navigation";
import { categories } from "@/data/categories";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowLeft, ShoppingBag } from "lucide-react";

// ─── Minimal Category Navbar ─────────────────────────────────────────────────

function CategoryNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/#products" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 md:px-12 py-6 md:py-8">
        {/* Logo / Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="flex items-center gap-3 text-white group">
            <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center transition-all group-hover:bg-white/20 flex-shrink-0">
              <ArrowLeft size={14} />
            </span>
            <Image
              src="/logos/Rafah logo.webp"
              alt="Rafah Garden"
              width={110}
              height={36}
              className="w-auto h-7 object-contain brightness-0 invert"
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop links */}
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
            className="flex items-center gap-2 text-white border border-white/30 rounded-full px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
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

      {/* Mobile nav drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-black/40 backdrop-blur-xl border-t border-white/10"
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
          </nav>
        </motion.div>
      )}
    </header>
  );
}

// ─── Per-category variation data ─────────────────────────────────────────────

const categoryVariations: Record<string, string[]> = {
  crush:  ["500ML", "250ML", "1L"],
  jam:    ["200G",  "400G"],
  fruits: ["1KG",   "2KG",  "5KG"],
  plants: ["Small", "Med",   "Large"],
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CategoryPage() {
  const params = useParams();
  const id = params.id as string;
  const [activeVariation, setActiveVariation] = useState(0);

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

  const variations = categoryVariations[id] || ["Standard"];
  const bgWord = category.title.split(" ")[0].toUpperCase();

  return (
    <div className="overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION — full viewport height, coloured background
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative h-screen min-h-[600px] w-full overflow-hidden"
        style={{ backgroundColor: category.bgColor }}
      >
        {/* Transparent navbar */}
        <CategoryNavbar />

        {/* Subtle grain texture overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            opacity: 0.035,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* ── MASSIVE BACKGROUND WORD ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="text-white font-avant font-black uppercase leading-none whitespace-nowrap"
            style={{
              fontSize: "clamp(100px, 27vw, 400px)",
              letterSpacing: "-0.03em",
            }}
          >
            {bgWord}
          </motion.span>
        </div>

        {/* ── CENTERED PRODUCT IMAGE ── */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="relative"
            style={{ width: "min(420px, 70vw)", height: "min(520px, 80vh)" }}
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-contain"
              style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.45))" }}
              priority
            />
          </motion.div>
        </div>

        {/* ── RIGHT SIDE: VARIATION PILLS ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3"
        >
          <span
            className="text-white/40 text-[9px] uppercase tracking-[0.25em] font-medium mb-1"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Size
          </span>
          {variations.map((v, i) => (
            <button
              key={v}
              onClick={() => setActiveVariation(i)}
              className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[10px] font-bold uppercase tracking-wide transition-all duration-300 focus:outline-none ${
                activeVariation === i
                  ? "bg-white text-gray-900 scale-110 shadow-lg"
                  : "bg-white/15 text-white/70 hover:bg-white/30 hover:text-white border border-white/20"
              }`}
            >
              {v}
            </button>
          ))}
        </motion.div>

        {/* ── BOTTOM ROW: content left + scroll indicator right ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 flex items-end justify-between px-6 md:px-12 pb-8 md:pb-12">
          {/* Bottom-left: title, description, CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-[260px] md:max-w-sm"
          >
            <span className="block text-white/45 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium mb-2">
              {category.number} — {category.subtitle}
            </span>
            <h1 className="text-white font-avant font-black text-xl md:text-2xl lg:text-3xl uppercase leading-tight mb-3 tracking-tight">
              {category.title}
            </h1>
            <p className="text-white/60 text-[11px] md:text-sm leading-relaxed mb-5 line-clamp-3">
              {category.description}
            </p>
            <Link
              href="#category-details"
              className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-full px-5 py-2.5 text-[11px] md:text-xs font-bold uppercase tracking-widest transition-all hover:bg-white/90 hover:scale-[1.03] active:scale-[0.98] shadow-md"
            >
              See More
              <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Bottom-right: Scroll down indicator */}
          <motion.a
            href="#category-details"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="hidden md:flex flex-col items-center gap-2 group"
            aria-label="Scroll down for more details"
          >
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm transition-all group-hover:bg-white/20 group-hover:border-white/50">
              <motion.svg
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
            <span className="text-white/40 text-[9px] uppercase tracking-[0.2em]">Scroll</span>
          </motion.a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DETAILS SECTION — below the fold
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="category-details"
        className="bg-white pt-24 pb-20 px-6 md:px-12"
        style={{ scrollMarginTop: "0px" }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span
              className="block text-xs uppercase tracking-[0.3em] font-bold mb-4"
              style={{ color: category.bgColor }}
            >
              About This Product
            </span>
            <h2 className="text-4xl md:text-6xl font-avant font-black uppercase text-foreground leading-tight">
              Crafting<br />Quality
            </h2>
            <div className="w-12 h-1 mt-6 rounded-full" style={{ backgroundColor: category.bgColor }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Left: prose */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              <p className="text-gray-500 text-base leading-relaxed">
                Our {category.title} line is the result of years of dedicated research and a commitment to Kerala&apos;s
                rich agricultural heritage. We source every ingredient directly from local farms, ensuring that what
                reaches your home is as fresh as if you had picked it yourself.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                Whether you&apos;re looking for vibrant refreshment or a touch of nature for your living space, Rafah
                Garden provides unparalleled quality and taste that defines the modern organic lifestyle.
              </p>
            </motion.div>

            {/* Right: quality bullets */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6">Why Choose Rafah?</h3>
              <ul className="space-y-4">
                {["100% Organic Certified", "Farm-to-Table Logistics", "Sustainable Practices", "Artisanal Preparation"].map(
                  (item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-4"
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: category.bgColor }} />
                      <span className="text-gray-700 text-sm font-medium">{item}</span>
                    </motion.li>
                  )
                )}
              </ul>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: category.bgColor }}>
                  Rafah Garden Standard · Kerala, India
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer link */}
        <div className="max-w-5xl mx-auto mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-foreground text-xs uppercase tracking-[0.2em] font-bold transition-colors group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Rafah Garden
          </Link>
          <span className="text-xs text-gray-300 uppercase tracking-widest">{category.number}</span>
        </div>
      </section>
    </div>
  );
}
