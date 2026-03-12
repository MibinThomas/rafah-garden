import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import MainLayout from "@/components/MainLayout";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rafah Garden | Premium Dragon Fruit Farm-to-Table",
  description: "Experience the freshest dragon fruit products from Rafah Garden. Premium farm-to-table agricultural business specializing in dragon fruit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
      >
        <CartProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </CartProvider>
      </body>
    </html>
  );
}
