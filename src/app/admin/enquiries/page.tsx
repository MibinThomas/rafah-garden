"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Search, 
  CheckCircle2, 
  X,
  Loader2,
  Mail,
  User,
  Calendar
} from "lucide-react";
import { getEnquiries, updateEnquiry } from "@/lib/actions";

export default function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getEnquiries().then((data) => {
      setEnquiries(data);
      setLoading(false);
    });
  }, []);

  const markAsRead = async (id: string) => {
    const enquiry = enquiries.find(e => e.id === id);
    if (enquiry) {
      const updated = { ...enquiry, status: "Read" };
      await updateEnquiry(updated);
      setEnquiries(enquiries.map(e => e.id === id ? updated : e));
    }
  };

  const filteredEnquiries = enquiries.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-dragonfruit-pink" size={40} />
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-[#001D3D]">Customer Enquiries</h2>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Listen to your harvest customers</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredEnquiries.map((enquiry) => (
          <div 
            key={enquiry.id} 
            className={`bg-white rounded-[2.5rem] p-8 shadow-sm border transition-all cursor-pointer group hover:shadow-xl ${
              enquiry.status === 'New' ? 'border-dragonfruit-pink/20 bg-dragonfruit-pink/[0.02]' : 'border-gray-100'
            }`}
            onClick={() => {
              setSelectedEnquiry(enquiry);
              if (enquiry.status === "New") markAsRead(enquiry.id);
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  enquiry.status === 'New' ? 'bg-dragonfruit-pink text-white' : 'bg-[#F8F9FA] text-gray-400'
                }`}>
                  <User size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-black text-gray-900">{enquiry.name}</h3>
                    {enquiry.status === 'New' && (
                      <span className="bg-dragonfruit-pink text-white text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full">New</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 text-sm font-bold">
                    <span className="flex items-center gap-1"><Mail size={14} /> {enquiry.email}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {enquiry.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 font-bold line-clamp-1 flex-1 md:max-w-md lg:max-w-xl md:px-8">
                {enquiry.message}
              </p>
              <div className="flex items-center gap-2">
                 <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-dragonfruit-pink transition-colors group-hover:border-dragonfruit-pink/30">
                   <MessageSquare size={18} />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEnquiry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-garden-green/40 backdrop-blur-md" onClick={() => setSelectedEnquiry(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <header className="p-8 border-b border-gray-50 flex justify-between items-center shrink-0">
              <h3 className="text-2xl font-black text-[#001D3D]">Enquiry Details</h3>
              <button onClick={() => setSelectedEnquiry(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </header>
            
            <div className="p-8 space-y-8 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-garden-green">
                    <User size={32} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-gray-900">{selectedEnquiry.name}</p>
                    <p className="font-bold text-gray-400">{selectedEnquiry.email}</p>
                  </div>
                </div>
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-50">Message Body</p>
                <div className="bg-[#F8F9FA] p-8 rounded-3xl border border-gray-100 text-gray-700 font-bold leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>
            </div>

            <footer className="p-8 border-t border-gray-50 bg-[#F8F9FA] shrink-0">
               <button 
                  onClick={() => setSelectedEnquiry(null)}
                  className="w-full bg-garden-green text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 hover:shadow-xl hover:shadow-garden-green/20 transition-all"
                >
                  <CheckCircle2 size={24} />
                  <span>Mark as Resolved</span>
                </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
