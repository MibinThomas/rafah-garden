"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CategoryContextType {
  activeCategoryId: string;
  setActiveCategoryId: (id: string) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [activeCategoryId, setActiveCategoryId] = useState("crush");

  return (
    <CategoryContext.Provider value={{ activeCategoryId, setActiveCategoryId }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}
