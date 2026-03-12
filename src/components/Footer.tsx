import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-garden-green text-white pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold tracking-tighter">
              Rafah<span className="text-dragonfruit-pink">Garden</span>
            </span>
          </Link>
          <p className="text-cream/80 text-sm leading-relaxed">
            Premium farm-to-table dragon fruit products, grown with love and sustainable practices in our local orchards.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-dragonfruit-pink transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-dragonfruit-pink transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-dragonfruit-pink transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-cream/80 text-sm">
            <li><Link href="/shop" className="hover:text-dragonfruit-pink transition-colors">Shop All</Link></li>
            <li><Link href="/about" className="hover:text-dragonfruit-pink transition-colors">Our Story</Link></li>
            <li><Link href="/gallery" className="hover:text-dragonfruit-pink transition-colors">Farm Gallery</Link></li>
            <li><Link href="/b2b" className="hover:text-dragonfruit-pink transition-colors">Bulk Orders</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-cream/80 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-dragonfruit-pink shrink-0" />
              <span>123 Orchard Lane, Rafah Farming District</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-dragonfruit-pink shrink-0" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-dragonfruit-pink shrink-0" />
              <span>hello@rafahgarden.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Join the Harvest</h4>
          <p className="text-cream/80 text-sm mb-4">Subscribe for seasonal updates and exclusive offers.</p>
          <div className="flex flex-col space-y-2">
            <input 
              type="email" 
              placeholder="Your email address"
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-dragonfruit-pink transition-colors"
            />
            <button className="bg-dragonfruit-pink text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-cream/60 text-xs">
        <p>&copy; {new Date().getFullYear()} Rafah Garden. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
