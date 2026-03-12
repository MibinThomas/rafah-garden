"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown, LayoutGrid, List } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import products from "@/lib/data.json";
import { cn } from "@/lib/utils";

const categories = ["All", "Fruit", "Preserves", "Powder", "Snacks"];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Shop Header */}
      <section className="bg-garden-green text-white pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Shop the Harvest</h1>
            <p className="text-cream/70 max-w-lg text-lg">
              Explore our premium collection of fresh dragon fruits and artisanal products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-20 z-30 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-garden-green/20 focus:bg-white transition-all text-sm"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center space-x-2 px-4 py-3 bg-gray-100 rounded-xl text-sm font-bold"
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-gray-100 rounded-xl text-sm font-bold focus:outline-none cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" size={16} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex gap-12">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 space-y-10 shrink-0">
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <LayoutGrid size={20} className="text-dragonfruit-pink" />
              <span>Categories</span>
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl transition-all font-medium text-sm",
                    selectedCategory === category
                      ? "bg-garden-green text-white shadow-lg shadow-garden-green/20"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-cream rounded-3xl border border-garden-green/5 space-y-4 text-center">
            <h4 className="font-bold text-garden-green">Bulk Inquiries?</h4>
            <p className="text-xs text-gray-500">Contact our B2B team for special wholesale pricing.</p>
            <button className="w-full bg-white text-garden-green py-2 rounded-xl text-xs font-bold border border-garden-green/10 hover:bg-garden-green hover:text-white transition-all">
              Contact Us
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-dragonfruit-pink font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
