import type { Metadata } from "next";
import { Outfit, Oswald } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CategoryProvider } from "@/context/CategoryContext";
import MobileBottomNav from "@/components/MobileBottomNav";
import SmoothScroll from "@/components/SmoothScroll";


const avantGarde = localFont({
  src: "../../public/fonts/avant-garde.otf",
  variable: "--font-avant",
  display: "swap",
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rafah Garden | Nature's Sweetness in Every Drink",
  description: "Premium dragon fruit farm products. Fresh, organic, and delicious.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${oswald.variable} ${avantGarde.variable} font-sans antialiased selection:bg-brand-pink selection:text-white`}
      >
        <SmoothScroll>
          <CategoryProvider>
            {children}
            <MobileBottomNav />
          </CategoryProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
