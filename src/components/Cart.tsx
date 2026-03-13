"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    isCartOpen, 
    setIsCartOpen, 
    cartTotal 
  } = useCart();

  const isEmpty = items.length === 0;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="text-garden-green" />
                <h2 className="text-xl font-bold">Your Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {isEmpty ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center">
                    <ShoppingBag size={48} className="text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">Your cart is empty</p>
                    <p className="text-sm text-gray-500">
                      Looks like you haven&apos;t added anything to your cart yet.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-garden-green text-white px-8 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex space-x-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-cream shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-gray-900 leading-tight">
                              {item.name}
                            </h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          {item.variant && (
                            <p className="text-xs text-gray-500 mt-1">{item.variant}</p>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3 border rounded-lg px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-gray-500 hover:text-garden-green"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-gray-500 hover:text-garden-green"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="font-bold text-garden-green">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!isEmpty && (
              <div className="p-6 border-t bg-gray-50 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-garden-green">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-dragonfruit-pink text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-dragonfruit-pink/20 transition-all">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
