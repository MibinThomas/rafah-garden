import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProductShowcase from "@/components/ProductShowcase";
import Experience from "@/components/Experience";
import Benefits from "@/components/Benefits";
import Gallery from "@/components/Gallery";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      {/* 
      <About />
      <ProductShowcase />
      <Experience />
      <Benefits />
      <Gallery />
      <CtaSection />
      <Footer />
      */}
    </main>
  );
}
