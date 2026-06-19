"use client";

import React, { useRef } from "react";
import { Upload, RotateCw, ZoomIn, Move, Image as ImageIcon, Download, Sparkles, RefreshCw } from "lucide-react";

interface ControlPanelProps {
  recipientName: string;
  setRecipientName: (val: string) => void;
  message: string;
  setMessage: (val: string) => void;
  weddingDate: string;
  setWeddingDate: (val: string) => void;
  brideName: string;
  setBrideName: (val: string) => void;
  groomName: string;
  setGroomName: (val: string) => void;
  photo: string;
  setPhoto: (val: string) => void;
  theme: "gold-ivory" | "emerald-gold" | "midnight-gold" | "blush-rose";
  setTheme: (val: "gold-ivory" | "emerald-gold" | "midnight-gold" | "blush-rose") => void;
  signatureStyle: "cursive" | "signature" | "none";
  setSignatureStyle: (val: "cursive" | "signature" | "none") => void;
  qrCodeLink: string;
  setQrCodeLink: (val: string) => void;
  photoZoom: number;
  setPhotoZoom: (val: number) => void;
  photoX: number;
  setPhotoX: (val: number) => void;
  photoY: number;
  setPhotoY: (val: number) => void;
  photoRotate: number;
  setPhotoRotate: (val: number) => void;
  onDownload: () => void;
  isDownloading: boolean;
}

export default function ControlPanel({
  recipientName,
  setRecipientName,
  message,
  setMessage,
  weddingDate,
  setWeddingDate,
  brideName,
  setBrideName,
  groomName,
  setGroomName,
  photo,
  setPhoto,
  theme,
  setTheme,
  signatureStyle,
  setSignatureStyle,
  qrCodeLink,
  setQrCodeLink,
  photoZoom,
  setPhotoZoom,
  photoX,
  setPhotoX,
  photoY,
  setPhotoY,
  photoRotate,
  setPhotoRotate,
  onDownload,
  isDownloading,
}: ControlPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        // Reset crop offsets on new photo upload
        setPhotoZoom(1.2);
        setPhotoX(0);
        setPhotoY(0);
        setPhotoRotate(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhotoAdjustments = () => {
    setPhotoZoom(1.2);
    setPhotoX(0);
    setPhotoY(0);
    setPhotoRotate(0);
  };

  const defaultMessageText =
    "We appreciate the excellent service you provided in successfully organizing our wedding, which was held on 25.06.2026. We are especially grateful to you for the friendly and responsible manner of your staff, which made our work a success. Thank you for that.";

  return (
    <div className="w-full flex flex-col gap-6 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2 text-stone-800 dark:text-stone-100">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Card Customization
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Customize the card content, photo, typography, and premium wedding themes.
        </p>
      </div>

      {/* Theme Selection */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 block">
          Card Theme
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2">
          {[
            { id: "gold-ivory", name: "Gold & Ivory", color: "bg-white border-[#dfba6b] text-stone-800" },
            { id: "emerald-gold", name: "Royal Green", color: "bg-[#03221b] border-[#e5c17d] text-stone-100" },
            { id: "midnight-gold", name: "Midnight Gold", color: "bg-[#090d16] border-[#dfba6b] text-zinc-100" },
            { id: "blush-rose", name: "Blush Rose", color: "bg-[#fff5f5] border-[#e0a899] text-rose-950" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTheme(item.id as any)}
              className={`p-2 rounded-lg border text-left text-xs font-medium transition-all ${
                theme === item.id
                  ? "ring-2 ring-amber-500 scale-[1.02] shadow-sm"
                  : "hover:border-zinc-300 dark:hover:border-zinc-700"
              } ${item.color}`}
            >
              <div className="w-3 h-3 rounded-full border border-black/10 gold-gradient-bg mb-1" />
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Image Upload & Adjustments */}
      <div className="p-4 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 block">
          Couple Photo
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition"
          >
            <Upload className="w-4 h-4" />
            Upload New Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {photo && (
            <button
              onClick={handleResetPhotoAdjustments}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
              title="Reset Zoom & Crop"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Crop
            </button>
          )}
        </div>

        {/* Photo Adjustments Panel */}
        {photo && (
          <div className="mt-4 flex flex-col gap-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/80">
            <span className="text-[10px] uppercase font-bold text-zinc-400">Position & Scale Adjustments</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Zoom slider */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                  <span className="flex items-center gap-1"><ZoomIn className="w-3.5 h-3.5" /> Zoom</span>
                  <span>{photoZoom.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.05"
                  value={photoZoom}
                  onChange={(e) => setPhotoZoom(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              {/* Rotation slider */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                  <span className="flex items-center gap-1"><RotateCw className="w-3.5 h-3.5" /> Rotate</span>
                  <span>{photoRotate}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="5"
                  value={photoRotate}
                  onChange={(e) => setPhotoRotate(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              {/* X position slider */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                  <span className="flex items-center gap-1"><Move className="w-3.5 h-3.5" /> Move X</span>
                  <span>{photoX}px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  step="2"
                  value={photoX}
                  onChange={(e) => setPhotoX(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              {/* Y position slider */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 mb-1">
                  <span className="flex items-center gap-1"><Move className="w-3.5 h-3.5" /> Move Y</span>
                  <span>{photoY}px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  step="2"
                  value={photoY}
                  onChange={(e) => setPhotoY(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recipient Input */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 block">
          Presented To (Recipient)
        </label>
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          placeholder="E.g., Elegant Weddings & Events (Pvt) Ltd"
          className="w-full px-4 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />
      </div>

      {/* Appreciation Message */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
            Appreciation Message
          </label>
          <button
            onClick={() => setMessage(defaultMessageText)}
            className="text-[10px] text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 font-medium"
          >
            Reset to default text
          </button>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none leading-relaxed"
        />
      </div>

      {/* Wedding Details Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 block">
            Bride Name
          </label>
          <input
            type="text"
            value={brideName}
            onChange={(e) => setBrideName(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 block">
            Groom Name
          </label>
          <input
            type="text"
            value={groomName}
            onChange={(e) => setGroomName(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 block">
            Wedding Date
          </label>
          <input
            type="date"
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          />
        </div>
      </div>

      {/* Signature & QR Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 block">
            Signature Font Style
          </label>
          <select
            value={signatureStyle}
            onChange={(e) => setSignatureStyle(e.target.value as any)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          >
            <option value="none">Standard Elegant Serif</option>
            <option value="cursive">Alex Brush Cursive</option>
            <option value="signature">Great Vibes Luxury Signature</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 block">
            Optional QR Code Link
          </label>
          <input
            type="url"
            value={qrCodeLink}
            onChange={(e) => setQrCodeLink(e.target.value)}
            placeholder="E.g., link to photos or wedding site"
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
          />
        </div>
      </div>

      {/* Download Action */}
      <div className="pt-2">
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="w-full gold-gradient-bg hover:opacity-90 active:scale-[0.98] text-stone-900 font-semibold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          {isDownloading ? "Generating high-res PNG..." : "Download Appreciation Card"}
        </button>
        <span className="text-[10px] text-zinc-400 text-center block mt-2">
          Generates a high-quality 1200x1500px card (perfect for print & sharing).
        </span>
      </div>
    </div>
  );
}
