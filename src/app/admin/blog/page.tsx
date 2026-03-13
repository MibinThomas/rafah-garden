"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Loader2, 
  FileText, 
  Search,
  Calendar,
  Tag
} from "lucide-react";
import Image from "next/image";
import { getBlogPosts, updateBlogPost, deleteBlogPost } from "@/lib/actions";

export default function BlogManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await getBlogPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateBlogPost(editingPost);
    setEditingPost(null);
    loadPosts();
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this post?")) {
      await deleteBlogPost(id);
      loadPosts();
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-[#001D3D]">Blog Management</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Share your harvest stories</p>
        </div>
        <button 
          onClick={() => setEditingPost({ id: `post-${Date.now()}`, title: "", excerpt: "", content: "", category: "General", date: new Date().toISOString().split('T')[0], image: "" })}
          className="bg-garden-green text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Post</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-6 py-4 font-bold shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 group">
            <div className="relative aspect-video bg-cream">
               {post.image && <Image src={post.image} alt={post.title} fill className="object-cover" />}
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-1"><Tag size={14} /> {post.category}</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 line-clamp-2">{post.title}</h3>
              <p className="text-gray-500 font-bold text-sm line-clamp-2">{post.excerpt}</p>
              <div className="flex gap-2 pt-4 border-t border-gray-50">
                <button onClick={() => setEditingPost(post)} className="flex-1 py-3 bg-cream text-garden-green rounded-xl font-bold hover:bg-garden-green hover:text-white transition-all flex items-center justify-center gap-2">
                  <Edit2 size={16} /> Edit
                </button>
                <button onClick={() => handleDelete(post.id)} className="p-3 text-red-400 hover:text-red-600">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-garden-green/40 backdrop-blur-md" onClick={() => setEditingPost(null)} />
          <div className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <header className="p-8 border-b border-gray-50 flex justify-between items-center shrink-0">
              <h3 className="text-2xl font-black text-[#001D3D]">Edit Blog Post</h3>
              <button onClick={() => setEditingPost(null)} className="text-gray-400 hover:text-red-500 transition-colors"><X size={24} /></button>
            </header>
            <div className="p-8 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Title</label>
                  <input value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Category</label>
                  <input value={editingPost.category} onChange={e => setEditingPost({...editingPost, category: e.target.value})} className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Excerpt</label>
                <textarea rows={2} value={editingPost.excerpt} onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 font-bold resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Content (Markdown supported)</label>
                <textarea rows={10} value={editingPost.content} onChange={e => setEditingPost({...editingPost, content: e.target.value})} className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 font-bold resize-none" />
              </div>
            </div>
            <footer className="p-8 border-t border-gray-50 bg-[#F8F9FA] shrink-0">
               <button onClick={handleSave} disabled={isSaving} className="w-full bg-garden-green text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3">
                  {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                  <span>Save Post</span>
                </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
