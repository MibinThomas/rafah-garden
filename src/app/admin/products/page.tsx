"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Loader2, 
  Package, 
  Search,
  Filter
} from "lucide-react";
import Image from "next/image";
import { getProducts, updateProduct, deleteProduct } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";

export default function ProductManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    const res = await updateProduct(editingProduct);
    if (res.success) {
      setEditingProduct(null);
      loadProducts();
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await deleteProduct(id);
      if (res.success) {
        loadProducts();
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-dragonfruit-pink" size={40} />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#001D3D]">Product Catalog</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Manage your harvest & pricing</p>
        </div>
        <button 
          onClick={() => setEditingProduct({ id: `prod-${Date.now()}`, name: "", price: 0, description: "", image: "", alt: "", variants: ["1kg"] })}
          className="bg-garden-green text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 hover:shadow-xl hover:shadow-garden-green/20 transition-all font-bold group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Top Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold shadow-sm"
          />
        </div>
        <button className="bg-white border border-gray-100 p-4 rounded-2xl text-gray-400 hover:text-garden-green transition-colors shadow-sm">
          <Filter size={20} />
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
            <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 bg-cream shadow-inner">
              <Image src={product.image} alt={product.alt || product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingProduct(product)}
                  className="p-3 bg-white text-garden-green rounded-xl shadow-lg hover:bg-garden-green hover:text-white transition-all transform hover:scale-110"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-3 bg-white text-red-500 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-dragonfruit-pink font-black text-xl">${product.price.toFixed(2)}</p>
              <h3 className="text-xl font-black text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">{product.variants.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-garden-green/40 backdrop-blur-md" onClick={() => setEditingProduct(null)} />
          <div className="relative bg-white w-full max-w-4xl rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
            <header className="p-8 border-b border-gray-50 flex justify-between items-center shrink-0">
              <h3 className="text-2xl font-black text-[#001D3D]">{editingProduct.id.startsWith("prod-") ? "New Product" : "Edit Product Details"}</h3>
              <button 
                onClick={() => setEditingProduct(null)} 
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 hover:text-red-500 transition-all text-gray-400"
              >
                <X size={24} />
              </button>
            </header>
            
            <div className="p-8 md:p-12 space-y-8 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <ImageUpload 
                    value={editingProduct.image} 
                    label="Product Display Image"
                    dimensions="800x800px"
                    onChange={(url) => setEditingProduct({...editingProduct, image: url})}
                    className="mb-8"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">SEO Image Alt Text</label>
                    <input 
                      value={editingProduct.alt} 
                      placeholder="e.g. Organic red dragon fruit slice on wooden board"
                      onChange={(e) => setEditingProduct({...editingProduct, alt: e.target.value})}
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Product Name</label>
                      <input 
                        value={editingProduct.name} 
                        onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                        className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Price ($)</label>
                      <input 
                        type="number"
                        value={editingProduct.price} 
                        onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                        className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Description</label>
                    <textarea 
                      rows={6}
                      value={editingProduct.description} 
                      onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold resize-none leading-relaxed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Variants (comma separated)</label>
                    <input 
                      value={editingProduct.variants.join(", ")} 
                      onChange={(e) => setEditingProduct({...editingProduct, variants: e.target.value.split(",").map(v => v.trim())})}
                      className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            <footer className="p-8 md:p-12 border-t border-gray-50 bg-[#F8F9FA] shrink-0">
               <button 
                  onClick={handleUpdate}
                  disabled={isSaving}
                  className="w-full bg-garden-green text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-garden-green/30 disabled:opacity-50 transition-all active:scale-[0.98]"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                  <span>Save Product Details</span>
                </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
