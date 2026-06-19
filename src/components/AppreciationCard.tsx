"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

interface AppreciationCardProps {
  recipientName: string;
  message: string;
  weddingDate: string;
  brideName: string;
  groomName: string;
  photo: string;
  theme: "gold-ivory" | "emerald-gold" | "midnight-gold" | "blush-rose";
  signatureStyle: "cursive" | "signature" | "none";
  qrCodeLink: string;
  photoZoom: number;
  photoX: number;
  photoY: number;
  photoRotate: number;
}

export default function AppreciationCard({
  recipientName,
  message,
  weddingDate,
  brideName,
  groomName,
  photo,
  theme,
  signatureStyle,
  qrCodeLink,
  photoZoom,
  photoX,
  photoY,
  photoRotate,
}: AppreciationCardProps) {
  // Theme color maps
  const themeStyles = {
    "gold-ivory": {
      wrapperBg: "bg-stone-100",
      cardBg: "bg-white",
      borderColor: "border-[#dfba6b]",
      textColorPrimary: "text-stone-800",
      textColorSecondary: "text-stone-500",
      accentText: "text-[#aa771c] gold-gradient-text",
      heartColor: "text-red-500",
      goldFill: "#aa771c",
      dashedBorder: "border-stone-200",
    },
    "emerald-gold": {
      wrapperBg: "bg-stone-100",
      cardBg: "bg-[#03221b] bg-gradient-to-br from-[#021f18] to-[#043329]",
      borderColor: "border-[#e5c17d]",
      textColorPrimary: "text-stone-100",
      textColorSecondary: "text-stone-300/80",
      accentText: "text-[#f3d08c] gold-gradient-text",
      heartColor: "text-red-400",
      goldFill: "#e5c17d",
      dashedBorder: "border-emerald-800/60",
    },
    "midnight-gold": {
      wrapperBg: "bg-zinc-100",
      cardBg: "bg-[#090d16] bg-gradient-to-br from-[#05080e] to-[#111827]",
      borderColor: "border-[#dfba6b]",
      textColorPrimary: "text-zinc-100",
      textColorSecondary: "text-zinc-400",
      accentText: "text-[#f3d08c] gold-gradient-text",
      heartColor: "text-rose-500",
      goldFill: "#dfba6b",
      dashedBorder: "border-zinc-800",
    },
    "blush-rose": {
      wrapperBg: "bg-rose-50/50",
      cardBg: "bg-[#fff5f5] bg-gradient-to-br from-[#fff2f2] to-[#ffe4e6]",
      borderColor: "border-[#e0a899]",
      textColorPrimary: "text-rose-950",
      textColorSecondary: "text-rose-700/70",
      accentText: "text-[#c26556]",
      heartColor: "text-rose-500",
      goldFill: "#e0a899",
      dashedBorder: "border-rose-200",
    },
  };

  const style = themeStyles[theme];

  // Format date display (e.g. 25 June 2026 -> 25 June 2026)
  const formatDate = (dateString: string) => {
    if (!dateString) return "25 June 2026";
    // If it is in standard YYYY-MM-DD, format it beautifully
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const parts = dateString.split("-");
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    return dateString;
  };

  // Inline custom SVG corner decoration for premium look
  const CornerDecor = ({ className, rotation }: { className: string; rotation: string }) => (
    <svg
      className={`absolute w-14 h-14 ${className} ${rotation} pointer-events-none`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer thick L frame */}
      <path
        d="M 12 12 L 85 12 M 12 12 L 12 85"
        stroke={style.goldFill}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Inner thin L frame */}
      <path
        d="M 22 22 L 65 22 M 22 22 L 22 65"
        stroke={style.goldFill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Ornate curly paths */}
      <path
        d="M 12 45 C 16 35, 25 25, 45 12"
        stroke={style.goldFill}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M 12 12 C 30 30, 30 30, 45 45"
        stroke={style.goldFill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Elegant dots */}
      <circle cx="12" cy="12" r="3.5" fill={style.goldFill} />
      <circle cx="85" cy="12" r="2.5" fill={style.goldFill} />
      <circle cx="12" cy="85" r="2.5" fill={style.goldFill} />
      <circle cx="22" cy="22" r="2" fill={style.goldFill} />
      <circle cx="45" cy="45" r="2" fill={style.goldFill} />
    </svg>
  );

  return (
    <div
      id="certificate"
      className={`relative w-[640px] h-[800px] overflow-hidden rounded-[24px] shadow-2xl flex flex-col p-8 bg-petals select-none transition-colors duration-500 ${style.cardBg}`}
    >
      {/* Double Border Frame */}
      <div className={`absolute inset-4 border-2 ${style.borderColor} pointer-events-none rounded-[16px]`}>
        <div className={`absolute inset-1 border ${style.borderColor} opacity-60 pointer-events-none rounded-[12px]`} />
      </div>

      {/* Elegant Corner Ornaments */}
      <CornerDecor className="top-[18px] left-[18px]" rotation="" />
      <CornerDecor className="top-[18px] right-[18px]" rotation="rotate-90" />
      <CornerDecor className="bottom-[18px] left-[18px]" rotation="-rotate-90" />
      <CornerDecor className="bottom-[18px] right-[18px]" rotation="rotate-180" />

      {/* Decorative rose petal elements - very light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[20%] left-[10%] w-6 h-6 bg-rose-200 rounded-full blur-[2px] opacity-20 animate-petal" />
        <div className="absolute top-[50%] right-[15%] w-8 h-8 bg-rose-200 rounded-full blur-[3px] opacity-15 animate-petal" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[20%] left-[20%] w-5 h-5 bg-rose-200 rounded-full blur-[1px] opacity-25 animate-petal" style={{ animationDelay: "4s" }} />
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex flex-col h-full justify-between items-center py-6 px-4">
        
        {/* 1. Couple Portrait Frame */}
        <div className="relative w-full flex justify-center mb-1">
          <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-double border-[#dfba6b] shadow-xl bg-stone-100 flex items-center justify-center">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt="Couple"
                className="absolute object-cover pointer-events-none"
                style={{
                  transform: `translate(${photoX}px, ${photoY}px) scale(${photoZoom}) rotate(${photoRotate}deg)`,
                  width: "100%",
                  height: "100%",
                  transition: "transform 0.1s ease-out",
                }}
              />
            ) : (
              <div className="text-stone-400 flex flex-col items-center justify-center p-4 text-center">
                <Heart className="w-8 h-8 text-stone-300 animate-pulse mb-1" />
                <span className="text-[10px] uppercase tracking-wider">No Photo</span>
              </div>
            )}
          </div>
        </div>

        {/* 2. Header Section */}
        <div className="text-center w-full flex flex-col items-center">
          <span className={`text-[10px] uppercase tracking-[6px] font-sans ${style.textColorSecondary}`}>
            Wedding Appreciation
          </span>
          <h1 className="font-serif text-[42px] font-normal leading-tight mt-1 text-center italic tracking-wide gold-gradient-text gold-gradient-bg bg-clip-text">
            Thank You
          </h1>
          <div className={`w-12 h-[1px] my-2 bg-gradient-to-r from-transparent via-[#dfba6b] to-transparent`} />
        </div>

        {/* 3. Recipient Section */}
        <div className="text-center w-full">
          <span className={`text-[9px] uppercase tracking-[4px] font-sans font-medium block ${style.textColorSecondary}`}>
            Presented With Gratitude To
          </span>
          <h2 className={`text-[26px] font-serif font-semibold mt-2 tracking-wide font-serif leading-tight ${style.textColorPrimary}`}>
            {recipientName || "[ Recipient Name ]"}
          </h2>
        </div>

        {/* 4. Message Body */}
        <div className="w-full px-6 text-center mt-1">
          <p className={`font-serif text-[15px] leading-[1.8] italic select-text ${style.textColorPrimary}`}>
            &ldquo;{message || "Please write your appreciation message here..."}&rdquo;
          </p>
        </div>

        {/* Divider line */}
        <div className={`w-full max-w-[80%] border-t border-dashed ${style.dashedBorder} my-3`} />

        {/* 5. Footer Layout */}
        <div className="w-full flex justify-between items-end px-6 mt-1">
          {/* Left Column: Wedding Date */}
          <div className="flex flex-col text-left max-w-[200px]">
            <span className={`text-[9px] uppercase tracking-wider font-sans ${style.textColorSecondary}`}>
              Wedding Date
            </span>
            <span className={`text-[13px] font-medium font-serif mt-1 ${style.textColorPrimary}`}>
              {formatDate(weddingDate)}
            </span>
          </div>

          {/* Middle Column: Cursive Signatures or Logo/QR Code */}
          <div className="flex flex-col items-center justify-center flex-1 px-2">
            {qrCodeLink ? (
              <div className="bg-white p-1 rounded-lg shadow-sm border border-stone-200/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${encodeURIComponent(qrCodeLink)}`}
                  alt="QR Code"
                  className="w-[45px] h-[45px] block"
                  crossOrigin="anonymous"
                />
              </div>
            ) : (
              <span className={`text-xl ${style.heartColor} animate-pulse`}>❤️</span>
            )}
          </div>

          {/* Right Column: Couple Names */}
          <div className="flex flex-col text-right max-w-[220px]">
            <span className={`text-[9px] uppercase tracking-wider font-sans ${style.textColorSecondary}`}>
              The Couple
            </span>
            {signatureStyle === "none" ? (
              <span className={`text-[13px] font-semibold font-serif mt-1 block truncate ${style.textColorPrimary}`}>
                {brideName || "Bride"} & {groomName || "Groom"}
              </span>
            ) : (
              <span
                className={`text-[20px] leading-tight block mt-1 select-text truncate ${
                  signatureStyle === "signature"
                    ? "font-signature text-[#dfba6b]"
                    : "font-cursive " + style.textColorPrimary
                }`}
              >
                {brideName || "Bride"} & {groomName || "Groom"}
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
