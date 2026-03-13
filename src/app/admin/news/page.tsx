"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Loader2, 
  Bell, 
  Search,
  Calendar
} from "lucide-react";
import { getNews, updateNewsItem, deleteNewsItem } from "@/lib/actions";

export default function NewsManagement() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await getNews();
    setNews(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateNewsItem(editingNews);
    setEditingNews(null);
    loadNews();
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this news item?")) {
      await deleteNewsItem(id);
      loadNews();
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-[#001D3D]">News & Announcements</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Keep your community updated</p>
        </div>
        <button 
          onClick={() => setEditingNews({ id: `news-${Date.now()}`, title: "", content: "", date: new Date().toISOString().split('T')[0] })}
          className="bg-garden-green text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Announcement</span>
        </button>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex justify-between items-center group hover:shadow-xl transition-all">
            <div className="flex items-center gap-8">
              <div className="w-14 h-14 bg-dragonfruit-pink/10 text-dragonfruit-pink rounded-2xl flex items-center justify-center shrink-0">
                <Bell size={24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                   <h3 className="text-xl font-black text-gray-900">{item.title}</h3>
                   <span className="text-[10px] font-black text-gray-400 flex items-center gap-1 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-full"><Calendar size={10} /> {item.date}</span>
                </div>
                <p className="text-gray-500 font-bold">{item.content}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setEditingNews(item)}
                className="p-4 bg-cream text-garden-green rounded-2xl hover:bg-garden-green hover:text-white transition-all transform hover:scale-105"
              >
                <Edit2 size={20} />
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="p-4 bg-white border border-gray-100 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-105"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-garden-green/40 backdrop-blur-md" onClick={() => setEditingNews(null)} />
          <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden">
            <header className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-2xl font-black text-[#001D3D]">Edit Announcement</h3>
              <button onClick={() => setEditingNews(null)} className="text-gray-400 hover:text-red-500 transition-colors"><X size={24} /></button>
            </header>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Title</label>
                <input value={editingNews.title} onChange={e => setEditingNews({...editingNews, title: e.target.value})} className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Content</label>
                <textarea rows={4} value={editingNews.content} onChange={e => setEditingNews({...editingNews, content: e.target.value})} className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 font-bold resize-none" />
              </div>
            </div>
            <footer className="p-8 border-t border-gray-50 bg-[#F8F9FA]">
               <button onClick={handleSave} disabled={isSaving} className="w-full bg-garden-green text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3">
                  {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                  <span>Publish Update</span>
                </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
