"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut, 
  Globe, 
  ChevronRight,
  Menu,
  X,
  ShoppingCart,
  MessageSquare,
  FileText,
  Bell,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Page Content", href: "/admin/site-content", icon: Globe },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "News", href: "/admin/news", icon: Bell },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-garden-green text-white p-4 flex justify-between items-center">
        <span className="text-xl font-black tracking-tighter">
          Rafah<span className="text-dragonfruit-pink">Admin</span>
        </span>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "bg-garden-green text-white w-full md:w-72 flex-shrink-0 transition-all duration-300 md:relative fixed inset-0 z-50 transform md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-8 hidden md:block">
          <Link href="/admin">
            <span className="text-2xl font-black tracking-tighter">
              Rafah<span className="text-dragonfruit-pink">Admin</span>
            </span>
          </Link>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all",
                  isActive 
                    ? "bg-white text-garden-green shadow-xl shadow-black/10 scale-[1.02]" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={20} />
                <span>{link.name}</span>
                {isActive && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-4">
          <Link
            href="/"
            className="flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold text-white/40 hover:text-dragonfruit-pink hover:bg-white/5 transition-all"
          >
            <LogOut size={20} />
            <span>View Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto max-h-screen">
        <header className="bg-white border-b border-gray-100 p-8 hidden md:block">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black text-[#001D3D]">
              {sidebarLinks.find(l => l.href === pathname)?.name || "Dashboard"}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-400">Main Orchardist</p>
              </div>
              <div className="w-10 h-10 bg-dragonfruit-pink rounded-xl flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
