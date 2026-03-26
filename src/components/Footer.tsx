import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-oswald text-3xl font-bold text-white tracking-tight uppercase">
                Rafah <span className="text-brand-green">Garden</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-md font-light leading-relaxed mb-6">
              Nature&apos;s sweetness in every drink. Premium, organic dragon fruit products grown with passion in Kerala.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors text-sm font-bold">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors text-sm font-bold">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors text-sm font-bold">
                X
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-oswald text-white text-xl mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#home" className="hover:text-brand-pink transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-brand-pink transition-colors">Our Story</Link></li>
              <li><Link href="#products" className="hover:text-brand-pink transition-colors">Shop</Link></li>
              <li><Link href="#experience" className="hover:text-brand-pink transition-colors">Experience</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-oswald text-white text-xl mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>Email: hello@rafahgarden.com</li>
              <li>Phone: +91 123 456 7890</li>
              <li>Location: Kerala, India</li>
            </ul>
          </div>

        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Rafah Garden. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
