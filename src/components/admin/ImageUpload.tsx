"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/lib/actions";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  dimensions?: string;
  className?: string;
}

export default function ImageUpload({ value, onChange, label, dimensions, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImage(formData);
    if (result.success && result.url) {
      onChange(result.url);
    } else {
      alert("Upload failed: " + result.error);
    }
    setIsUploading(false);
  };

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-end mb-2">
          <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">{label}</label>
          {dimensions && (
            <span className="text-[10px] bg-garden-green/5 text-garden-green px-2 py-0.5 rounded-full font-bold">
              REC: {dimensions}
            </span>
          )}
        </div>
      )}
      
      <div 
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`
          relative aspect-video rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
          ${value ? 'border-garden-green/20' : 'border-gray-200 hover:border-dragonfruit-pink/50 bg-[#F8F9FA]'}
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        {value ? (
          <>
            <Image src={value} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-bold text-sm flex items-center gap-2">
                <Upload size={16} />
                Change Image
              </p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 space-y-2">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-300">
              <ImageIcon size={24} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest">Click to Upload</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <Loader2 className="animate-spin text-dragonfruit-pink" size={32} />
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
      </div>

      {value && (
        <button 
          onClick={() => onChange("")}
          className="mt-2 text-[10px] font-bold text-red-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-1"
        >
          <X size={10} />
          Remove Image
        </button>
      )}
    </div>
  );
}
