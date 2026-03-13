"use client";

import React, { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Clock, 
  X,
  Loader2
} from "lucide-react";
import { getOrders, updateOrder } from "@/lib/actions";

export default function OrderManagement() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const updated = { ...order, status: newStatus };
      await updateOrder(updated);
      setOrders(orders.map(o => o.id === orderId ? updated : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updated);
      }
    }
  };

  const filteredOrders = orders.filter(o => 
    o.customer.toLowerCase().includes(search.toLowerCase()) || 
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-dragonfruit-pink" size={40} />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-[#001D3D]">Order Management</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Track & fulfill customer purchases</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            placeholder="Search by Order ID or Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F8F9FA] border-b border-gray-100">
            <tr>
              <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Order ID</th>
              <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Customer</th>
              <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Date</th>
              <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Amount</th>
              <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-8 py-6 font-bold text-gray-900">{order.id}</td>
                <td className="px-8 py-6 font-bold text-gray-900">{order.customer}</td>
                <td className="px-8 py-6 text-gray-500 font-medium">{order.date}</td>
                <td className="px-8 py-6 font-black text-garden-green">${order.total.toFixed(2)}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="p-3 bg-cream text-garden-green rounded-xl hover:bg-garden-green hover:text-white transition-all transform hover:scale-105"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-garden-green/40 backdrop-blur-md" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden">
            <header className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-2xl font-black text-[#001D3D]">Order Details: {selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </header>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                  <p className="text-lg font-black text-gray-900">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Date</p>
                  <p className="text-lg font-black text-gray-900">{selectedOrder.date}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Items</p>
                  <p className="text-lg font-bold text-gray-700">{selectedOrder.items}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Update Order Status</p>
                <div className="flex gap-4">
                  {['Processing', 'Shipped', 'Delivered'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedOrder.id, status)}
                      className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
                        selectedOrder.status === status 
                          ? 'bg-garden-green text-white shadow-lg' 
                          : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
