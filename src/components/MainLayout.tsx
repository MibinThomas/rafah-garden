"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cart from "./Cart";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Cart />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
