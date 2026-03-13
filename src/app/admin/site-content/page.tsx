"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, Image as ImageIcon, Plus, Trash2, LayoutGrid, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSiteContent, updateSiteContent } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";

export default function SiteContentEditor() {
  const [content, setContent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    getSiteContent().then(setContent);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await updateSiteContent(content);
    setIsSaving(false);
  };

  if (!content) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-dragonfruit-pink" size={40} />
    </div>
  );

  const renderSectionHeader = (title: string, subtitle: string) => (
    <div className="mb-8 p-6 bg-cream/50 rounded-3xl border border-garden-green/5">
      <h3 className="text-xl font-black text-garden-green">{title}</h3>
      <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
    </div>
  );

  const renderHeroEditor = () => (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {renderSectionHeader("Hero Text Content", "Manage main headlines and call-to-actions")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Hero Badge</label>
              <input 
                value={content.hero.badge} 
                onChange={(e) => setContent({...content, hero: {...content.hero, badge: e.target.value}})}
                className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Hero Title</label>
              <textarea 
                rows={2}
                value={content.hero.title} 
                onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})}
                className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold resize-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Hero Subtitle</label>
            <textarea 
              rows={3}
              value={content.hero.subtitle} 
              onChange={(e) => setContent({...content, hero: {...content.hero, subtitle: e.target.value}})}
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold resize-none"
            />
          </div>
        </div>
        <div className="space-y-6">
          {renderSectionHeader("Hero Visual", "1920x1080px recommended")}
          <ImageUpload 
            value={content.hero.image} 
            dimensions="1920x1080"
            label="Background Image"
            onChange={(url) => setContent({...content, hero: {...content.hero, image: url}})}
          />
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">SEO Alt Text</label>
            <input 
              value={content.hero.alt} 
              placeholder="Describe this image for search engines..."
              onChange={(e) => setContent({...content, hero: {...content.hero, alt: e.target.value}})}
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAboutEditor = () => (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-6">
            {renderSectionHeader("Rooted in Rafah (About Page Hero)", "Main header for the About page")}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Hero Title</label>
                <input 
                  value={content.about_page.hero_title} 
                  onChange={(e) => setContent({...content, about_page: {...content.about_page, hero_title: e.target.value}})}
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Hero Badge</label>
                <input 
                  value={content.about_page.hero_badge} 
                  onChange={(e) => setContent({...content, about_page: {...content.about_page, hero_badge: e.target.value}})}
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {renderSectionHeader("Our Story Content", "Tell the history of Rafah Garden")}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Story Title</label>
              <input 
                value={content.about_page.story_title} 
                onChange={(e) => setContent({...content, about_page: {...content.about_page, story_title: e.target.value}})}
                className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold"
              />
            </div>
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Story Paragraphs</label>
              {content.about_page.story_paragraphs.map((p: string, i: number) => (
                <div key={i} className="flex gap-4 group">
                  <textarea 
                    rows={2}
                    value={p} 
                    onChange={(e) => {
                      const newPs = [...content.about_page.story_paragraphs];
                      newPs[i] = e.target.value;
                      setContent({...content, about_page: {...content.about_page, story_paragraphs: newPs}});
                    }}
                    className="flex-1 bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold resize-none"
                  />
                  <button 
                    onClick={() => {
                      const newPs = content.about_page.story_paragraphs.filter((_: any, idx: number) => idx !== i);
                      setContent({...content, about_page: {...content.about_page, story_paragraphs: newPs}});
                    }}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all self-start p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => {
                  const newPs = [...content.about_page.story_paragraphs, ""];
                  setContent({...content, about_page: {...content.about_page, story_paragraphs: newPs}});
                }}
                className="flex items-center space-x-2 text-dragonfruit-pink font-bold uppercase tracking-widest text-xs py-2 px-4 rounded-xl border border-dashed border-dragonfruit-pink/30 hover:bg-dragonfruit-pink/5 transition-colors"
              >
                <Plus size={14} />
                <span>Add Paragraph</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            {renderSectionHeader("About Hero Image", "1920x1080px")}
            <ImageUpload 
              value={content.about_page.hero_image} 
              dimensions="1920x1080"
              onChange={(url) => setContent({...content, about_page: {...content.about_page, hero_image: url}})}
            />
            <input 
              value={content.about_page.hero_alt} 
              placeholder="About Hero Alt Text..."
              onChange={(e) => setContent({...content, about_page: {...content.about_page, hero_alt: e.target.value}})}
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-xl px-4 py-2 text-sm"
            />
          </div>
          <div className="space-y-4">
            {renderSectionHeader("Story Side Image", "800x800px recommended")}
            <ImageUpload 
              value={content.about_page.story_image} 
              dimensions="800x800"
              onChange={(url) => setContent({...content, about_page: {...content.about_page, story_image: url}})}
            />
            <input 
              value={content.about_page.story_alt} 
              placeholder="Story Image Alt Text..."
              onChange={(e) => setContent({...content, about_page: {...content.about_page, story_alt: e.target.value}})}
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-xl px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderGalleryEditor = () => (
    <div className="space-y-8">
      {renderSectionHeader("Gallery Header & Settings", "Manage the Visual Journey grid")}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Gallery Title</label>
            <input 
              value={content.gallery.title} 
              onChange={(e) => setContent({...content, gallery: {...content.gallery, title: e.target.value}})}
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold"
            />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Gallery Subtitle</label>
            <input 
              value={content.gallery.subtitle} 
              onChange={(e) => setContent({...content, gallery: {...content.gallery, subtitle: e.target.value}})}
              className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-dragonfruit-pink transition-colors font-bold"
            />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Grid Elements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.gallery.items.map((item: any, i: number) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm space-y-4 relative group">
              <button 
                onClick={() => {
                  const newItems = content.gallery.items.filter((_: any, idx: number) => idx !== i);
                  setContent({...content, gallery: {...content.gallery, items: newItems}});
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white p-1.5 rounded-full transition-all"
              >
                <X size={14} />
              </button>
              <ImageUpload 
                value={item.src} 
                dimensions="Grid Item"
                onChange={(url) => {
                  const newItems = [...content.gallery.items];
                  newItems[i] = {...newItems[i], src: url};
                  setContent({...content, gallery: {...content.gallery, items: newItems}});
                }}
              />
              <input 
                value={item.title} 
                onChange={(e) => {
                  const newItems = [...content.gallery.items];
                  newItems[i] = {...newItems[i], title: e.target.value};
                  setContent({...content, gallery: {...content.gallery, items: newItems}});
                }}
                className="w-full text-sm font-bold text-garden-green border-none bg-transparent focus:ring-0 p-0"
              />
            </div>
          ))}
          <button 
            onClick={() => {
              const newItems = [...content.gallery.items, { src: "", title: "New Item", size: "col-span-1 row-span-1" }];
              setContent({...content, gallery: {...content.gallery, items: newItems}});
            }}
            className="border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center p-12 text-gray-300 hover:text-dragonfruit-pink hover:border-dragonfruit-pink/30 hover:bg-dragonfruit-pink/5 transition-all space-y-2"
          >
            <Plus size={32} />
            <p className="font-bold uppercase tracking-widest text-xs">Add New Image</p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-[#001D3D] tracking-tighter">Site Content Manager</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2">Design, Words & Visual Storytelling</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full md:w-auto bg-garden-green text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-garden-green/30 disabled:opacity-50 transition-all active:scale-95"
        >
          {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
          <span>Push Changes Live</span>
        </button>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-50 p-2 gap-2 bg-[#F8F9FA] overflow-x-auto no-scrollbar">
          {[
            { id: "hero", label: "Home Page", icon: ImageIcon },
            { id: "about", label: "About Page", icon: Type },
            { id: "gallery", label: "Gallery Grid", icon: LayoutGrid },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center space-x-3 px-8 py-5 rounded-[1.5rem] font-bold transition-all uppercase tracking-widest text-xs whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-white text-garden-green shadow-xl shadow-garden-green/5" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
              )}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-8 md:p-16">
          {activeTab === "hero" && renderHeroEditor()}
          {activeTab === "about" && renderAboutEditor()}
          {activeTab === "gallery" && renderGalleryEditor()}
        </div>
      </div>
    </div>
  );
}

// Custom lucide simple icon component or just import the correct ones as used above
function X({ size }: { size: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>; }
