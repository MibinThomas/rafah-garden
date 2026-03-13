"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, CreditCard, Shield, Globe, Lock } from "lucide-react";
import { getSettings, updateSettings } from "@/lib/actions";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("payment");

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await updateSettings(settings);
    setIsSaving(false);
  };

  if (!settings) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-dragonfruit-pink" size={40} />
    </div>
  );

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-[#001D3D]">System Settings</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Configure your farm operations</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-garden-green text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:shadow-xl hover:shadow-garden-green/20 disabled:opacity-50 transition-all"
        >
          {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
          <span>Save Settings</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-50 p-2 gap-2 bg-[#F8F9FA]">
          <button
            onClick={() => setActiveTab("payment")}
            className={`flex items-center space-x-2 px-8 py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-xs ${activeTab === "payment" ? "bg-white text-garden-green shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            <CreditCard size={16} />
            <span>Payment Gateway</span>
          </button>
          <button
            onClick={() => setActiveTab("general")}
            className={`flex items-center space-x-2 px-8 py-4 rounded-2xl font-bold transition-all uppercase tracking-widest text-xs ${activeTab === "general" ? "bg-white text-garden-green shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            <Globe size={16} />
            <span>General / SEO</span>
          </button>
        </div>

        <div className="p-8 md:p-12">
          {activeTab === "payment" && (
            <div className="space-y-8">
               <div className="flex items-center space-x-4 p-6 bg-blue-50 text-blue-700 rounded-3xl border border-blue-100">
                  <Shield size={24} className="shrink-0" />
                  <p className="text-sm font-medium">Configure your API credentials here to enable automated checkout processing for customers.</p>
               </div>

               <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Gateway API Connection URL</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">
                        <Globe size={20} />
                      </div>
                      <input 
                        type="url"
                        placeholder="https://api.paymentgateway.com/v1"
                        value={settings.payment?.api_url || ""} 
                        onChange={(e) => setSettings({...settings, payment: {...settings.payment, api_url: e.target.value}})}
                        className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl pl-16 pr-6 py-5 text-gray-900 focus:outline-none focus:border-garden-green transition-colors font-bold"
                      />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Private API Key / Secret</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">
                        <Lock size={20} />
                      </div>
                      <input 
                        type="password"
                        placeholder="sk_live_..."
                        value={settings.payment?.api_key || ""} 
                        onChange={(e) => setSettings({...settings, payment: {...settings.payment, api_key: e.target.value}})}
                        className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl pl-16 pr-6 py-5 text-gray-900 focus:outline-none focus:border-garden-green transition-colors font-bold"
                      />
                    </div>
                    <p className="text-xs text-gray-400 ml-1 font-medium italic mt-2">Your API key is stored securely and never exposed to the client side.</p>
                 </div>
               </div>
            </div>
          )}

          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Site SEO Title</label>
                <input 
                  value={settings.site?.seo_title || ""} 
                  onChange={(e) => setSettings({...settings, site: {...settings.site, seo_title: e.target.value}})}
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-garden-green transition-colors font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Meta Description</label>
                <textarea 
                  rows={4}
                  value={settings.site?.seo_description || ""} 
                  onChange={(e) => setSettings({...settings, site: {...settings.site, seo_description: e.target.value}})}
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:border-garden-green transition-colors font-bold resize-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
