"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sprout, Users, Heart, ShieldCheck, Leaf } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/farm-landscape.png"
          alt="Rafah Garden Farm"
          fill
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center text-white space-y-4 px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-dragonfruit-pink font-black uppercase tracking-[0.3em] text-sm"
          >
            Since 2012
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter"
          >
            Rooted in Rafah.
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-garden-green leading-tight">
              A legacy of <br /> sustainable growth.
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Rafah Garden started with a single dragon fruit cutting and a vision to transform local agriculture. Our founder, motivated by the unique biodiversity of the Rafah region, sought to create a farm that didn't just produce food, but nurtured the environment.
              </p>
              <p>
                Today, we manage over 50 acres of premium dragon fruit orchards. Our practices are 100% organic, utilizing solar energy for irrigation and traditional composting methods to enrich our soil.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-4xl font-black text-dragonfruit-pink">50+</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Acres of Orchards</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-black text-dragonfruit-pink">12k</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Trees Harvested</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden">
            <Image
              src="/images/hero-dragon-fruit.png"
              alt="Farm Life"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-garden-green/10" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black text-garden-green">Values We Cultivate</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Everything we do is guided by our commitment to quality, community, and the planet.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Leaf />, title: "Pure Organic", text: "Zero pesticides, zero chemicals. Only the purity of nature in every harvest." },
              { icon: <Heart />, title: "Community First", text: "We employ local families and support Rafah's growing agricultural industry." },
              { icon: <Sprout />, title: "Innovation", text: "Using smart-farming tech to minimize water waste and maximize nutritional value." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6"
              >
                <div className="w-14 h-14 bg-garden-green/10 rounded-2xl flex items-center justify-center text-garden-green">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto bg-garden-green text-white rounded-[4rem] p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Users size={400} className="absolute -bottom-20 -right-20" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black max-w-3xl mx-auto leading-tight">
            Join us in our journey to greener tables.
          </h2>
          <p className="text-xl text-cream/70 max-w-xl mx-auto">
            Whether you're a customer, partner, or fellow farmer, we'd love to connect.
          </p>
          <div className="flex justify-center pt-8">
            <button className="bg-dragonfruit-pink text-white px-12 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-dragonfruit-pink/20 transition-all">
              Visit Our Farm
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
