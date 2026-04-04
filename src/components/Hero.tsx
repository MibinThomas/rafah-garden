"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { categories } from "@/data/categories";
import { useCategory } from "@/context/CategoryContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/#products" },
];

// Floating nav rendered inside the active drawer
function DrawerNav() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-5 md:py-7"
    >
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/logos/Rafah logo.webp"
          alt="Rafah Garden"
          width={120}
          height={40}
          className="w-auto h-7 md:h-8 object-contain brightness-0 invert"
          priority
        />
      </Link>

      {/* Desktop links */}
      <nav className="hidden md:flex items-center gap-7">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-white/65 hover:text-white text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
        <Link
          href="/#products"
          className="flex items-center gap-1.5 text-white border border-white/30 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all"
        >
          <ShoppingBag size={11} />
          Shop
        </Link>
      </nav>
    </motion.div>
  );
}

export default function Hero() {
  const { activeCategoryId, setActiveCategoryId } = useCategory();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="hero" className="relative h-screen min-h-[600px] w-full overflow-hidden bg-background">
      <div className="flex h-full w-full flex-col md:flex-row">
        {categories.map((category) => {
          const isActive = activeCategoryId === category.id;
          return (
            <CategoryItem
              key={category.id}
              category={category}
              isActive={isActive}
              isHovered={hoveredId === category.id}
              onActivate={() => setActiveCategoryId(category.id)}
              onHover={(id) => setHoveredId(id)}
              className={!isActive ? "hidden md:flex" : "flex"}
            />
          );
        })}
      </div>
    </section>
  );
}

function CategoryItem({ 
  category, 
  isActive,
  isHovered,
  onActivate,
  onHover,
  className = ""
}: { 
  category: typeof categories[0], 
  isActive: boolean,
  isHovered: boolean,
  onActivate: () => void,
  onHover: (id: string | null) => void,
  className?: string
}) {
  // For inactive panels: base grey + a soft colour wash that fades in on hover
  const inactiveBg = isHovered
    ? `color-mix(in srgb, ${category.bgColor} 18%, #f8f8f8)`
    : "#f8f8f8";

  return (
    <motion.div
      // Touch fallback — tap still works on mobile
      onClick={onActivate}
      onHoverStart={() => {
        onActivate();          // expand this drawer
        onHover(category.id);  // apply highlight tint
      }}
      onHoverEnd={() => onHover(null)} // clear highlight; drawer stays open
      layout
      initial={false}
      animate={{
        flex: isActive ? 4 : 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }}
      className={`relative h-full cursor-pointer overflow-hidden border-r border-white/10 last:border-0 transition-colors duration-500 ${className}`}
      style={{ backgroundColor: isActive ? category.bgColor : inactiveBg }}
    >
      {/* Background Text Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <h2 className="text-[20vw] font-black text-white whitespace-nowrap uppercase tracking-tighter">
              {category.id}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer nav — only in the active/expanded panel */}
      <AnimatePresence>
        {isActive && <DrawerNav />}
      </AnimatePresence>

      <div className="relative z-10 flex h-full w-full flex-col p-6 pt-20 md:p-12 md:pt-24">
        {/* Number & Basic Info (Preview) */}
        <motion.div
          animate={{ y: !isActive && isHovered ? -6 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`mb-8 md:mb-12 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400'}`}
        >
          <span
            className="block text-4xl md:text-6xl font-oswald font-bold opacity-50 mb-2 md:mb-4 transition-all duration-300"
            style={{
              color: isActive ? 'white' : category.bgColor,
              opacity: isHovered && !isActive ? 0.8 : undefined,
            }}
          >
            {category.number}
          </span>
          <h3 className={`text-xl md:text-3xl font-bold uppercase tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-foreground'}`}>
            {category.title}
          </h3>
          <p className={`text-[10px] md:text-sm opacity-60 uppercase tracking-widest mt-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400'}`}>
            {category.subtitle}
          </p>
        </motion.div>

        {/* Hover accent bar — only visible on inactive hovered panels */}
        {!isActive && (
          <motion.div
            animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
            initial={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 h-1 origin-left rounded-full"
            style={{ backgroundColor: category.bgColor }}
          />
        )}

        {/* Expanded Content — image fills space, button stays visible */}
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex-1 flex flex-col min-h-0"
            >
              {/* Product image — grows to fill available height */}
              <div className="relative flex-1 min-h-0 w-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                  priority
                />
              </div>

              {/* Description + CTA — anchored at bottom, never clipped */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pb-6 md:pb-10 pt-2 flex-shrink-0"
              >
                <p className="text-white/75 text-[11px] md:text-sm font-light leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
                  {category.description}
                </p>
                {/* ── Enhanced View More Button ── */}
                <ViewMoreButton
                  href={category.id === 'crush' ? `/product/1` : `/category/${category.id}`}
                  bgColor={category.bgColor}
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-end"
            >
              <div className="w-full h-1 md:h-2 rounded-full bg-black/5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Enhanced View More Button ────────────────────────────────────────────────
// Responsive across three breakpoints:
//   mobile  (<md)  → full-width white pill CTA at the bottom
//   tablet  (md)   → compact pill, bottom-left aligned
//   desktop (lg+)  → split button: circle icon + label with hover-slide animation

function ViewMoreButton({ href, bgColor }: { href: string; bgColor: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative inline-flex items-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-full
        /* mobile: full-width pill */
        w-full justify-center gap-3 bg-white text-gray-900 px-5 py-3 text-xs font-bold uppercase tracking-widest
        /* tablet: auto-width compact */
        md:w-auto md:px-6 md:py-3 md:text-[11px]
        /* desktop: larger with extended label */
        lg:px-0 lg:py-0 lg:bg-transparent lg:text-white lg:gap-0
        transition-colors duration-300 hover:bg-white/90 md:hover:bg-white/90 lg:hover:bg-transparent"
    >
      {/* ── Circle icon (all sizes, but styled differently on lg) ── */}
      <span
        className="
          relative flex-shrink-0 flex items-center justify-center rounded-full
          /* mobile + tablet */
          w-5 h-5 bg-gray-900 text-white
          /* desktop: larger, white ring */
          lg:w-12 lg:h-12 lg:bg-white lg:text-gray-900
          transition-all duration-500 lg:group-hover:scale-110"
      >
        {/* Spinning border on desktop hover */}
        <motion.span
          animate={hovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="absolute inset-0 rounded-full hidden lg:block"
          style={{ border: `2px solid ${bgColor}`, opacity: hovered ? 1 : 0, transition: "opacity 0.25s" }}
        />
        <motion.svg
          animate={hovered ? { x: 2 } : { x: 0 }}
          transition={{ duration: 0.25 }}
          className="w-3 h-3 lg:w-4 lg:h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </motion.svg>
      </span>

      {/* ── Label ── */}
      {/* Mobile + tablet: plain text beside icon */}
      <span className="lg:hidden">View more</span>

      {/* Desktop: sliding label that appears on hover */}
      <motion.span
        animate={hovered ? { width: "auto", opacity: 1, marginLeft: 12 } : { width: 0, opacity: 0, marginLeft: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="hidden lg:block overflow-hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-widest"
      >
        View more
      </motion.span>

      {/* ── Shimmer sweep (mobile + tablet only) ── */}
      <span
        className="pointer-events-none absolute inset-0 lg:hidden overflow-hidden rounded-full"
        aria-hidden="true"
      >
        <motion.span
          animate={hovered ? { x: "150%" } : { x: "-150%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 w-1/3 bg-white/30 skew-x-[-20deg]"
        />
      </span>
    </Link>
  );
}
