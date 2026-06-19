"use client";

import React, { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Moon, Sun, Info } from "lucide-react";
import AppreciationCard from "@/components/AppreciationCard";
import ControlPanel from "@/components/ControlPanel";

export default function Home() {
  // Main form and preview state
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState(
    "We appreciate the excellent service you provided in successfully organizing our wedding, which was held on 25.06.2026. We are especially grateful to you for the friendly and responsible manner of your staff, which made our work a success. Thank you for that."
  );
  const [weddingDate, setWeddingDate] = useState("2026-06-25");
  const [brideName, setBrideName] = useState("Nilushika");
  const [groomName, setGroomName] = useState("Dilanga");
  const [photo, setPhoto] = useState("/default-couple.png");
  const [theme, setTheme] = useState<"gold-ivory" | "emerald-gold" | "midnight-gold" | "blush-rose">("gold-ivory");
  const [signatureStyle, setSignatureStyle] = useState<"cursive" | "signature" | "none">("signature");
  const [qrCodeLink, setQrCodeLink] = useState("");

  // Crop / scale adjustments
  const [photoZoom, setPhotoZoom] = useState(1.2);
  const [photoX, setPhotoX] = useState(0);
  const [photoY, setPhotoY] = useState(0);
  const [photoRotate, setPhotoRotate] = useState(0);

  // Layout UI state
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.85);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Compute scale to fit preview card on different screens dynamically using ResizeObserver
  useEffect(() => {
    if (!previewContainerRef.current) return;

    const handleResizeWidth = (width: number) => {
      // Available width is the container width minus padding (e.g. 48px)
      const scale = (width - 48) / 640;
      // Limit scale to a range of 0.30 to 0.95
      setPreviewScale(Math.max(0.3, Math.min(scale, 0.95)));
    };

    // Initial measurement
    handleResizeWidth(previewContainerRef.current.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        handleResizeWidth(entry.contentRect.width);
      }
    });

    observer.observe(previewContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // One-click Download as Image function
  const downloadImage = async () => {
    const node = document.getElementById("certificate");
    if (!node) return;

    try {
      setIsDownloading(true);

      // Wait for fonts to be ready before rendering the image to ensure correct typography
      if (typeof document !== "undefined" && document.fonts) {
        await document.fonts.ready;
      }

      // Briefly wait to ensure UI state renders
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Generate PNG using html-to-image with premium settings
      const dataUrl = await toPng(node, {
        quality: 1.0,
        pixelRatio: 2.5, // 640x800 at 2.5x = 1600x2000px high-resolution export
        cacheBust: true,
        style: {
          transform: "scale(1)",
          transformOrigin: "center center",
          boxShadow: "none",
        },
      });

      // Create download link and trigger download
      const link = document.createElement("a");
      link.download = `wedding-appreciation-${brideName.toLowerCase()}-${groomName.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();

      // Premium celebratory confetti burst
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#bf953f", "#fcf6ba", "#b38728", "#fbf5b7", "#aa771c", "#ff4e50", "#f9d423"],
      });
    } catch (error) {
      console.error("Oops, something went wrong with the card download!", error);
      alert("Failed to download image. Please try again or upload a different image format.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full min-h-screen bg-stone-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Premium Header */}
      {/* Main Workspace */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">

        {/* Left column: Controls Forms (5 cols) */}
        <div className="md:col-span-5 order-2 md:order-1 flex flex-col justify-start">
          <ControlPanel
            recipientName={recipientName}
            setRecipientName={setRecipientName}
            message={message}
            setMessage={setMessage}
            weddingDate={weddingDate}
            brideName={brideName}
            groomName={groomName}
            photo={photo}
            setPhoto={setPhoto}
            theme={theme}
            setTheme={setTheme}
            signatureStyle={signatureStyle}
            setSignatureStyle={setSignatureStyle}
            qrCodeLink={qrCodeLink}
            setQrCodeLink={setQrCodeLink}
            photoZoom={photoZoom}
            setPhotoZoom={setPhotoZoom}
            photoX={photoX}
            setPhotoX={setPhotoX}
            photoY={photoY}
            setPhotoY={setPhotoY}
            photoRotate={photoRotate}
            setPhotoRotate={setPhotoRotate}
            onDownload={downloadImage}
            isDownloading={isDownloading}
          />
        </div>

        {/* Right column: Interactive Premium Live Preview (7 cols) */}
        <div className="md:col-span-7 order-1 md:order-2 flex flex-col items-center justify-start md:sticky md:top-[90px] self-start py-4 md:py-0 w-full">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-semibold tracking-[4px] text-amber-600 dark:text-amber-500 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-current" /> Interactive Live Preview
            </span>
            <p className="text-xs text-zinc-400 mt-1">
              Perfectly auto-scales to fit your screen. Card will download in original high-resolution.
            </p>
          </div>

          {/* Wrapper container to measure width */}
          <div ref={previewContainerRef} className="w-full flex justify-center items-center">
            {/* Scaled Preview Frame */}
            <div
              className="relative flex items-center justify-center rounded-2xl bg-zinc-200/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-inner overflow-hidden transition-all duration-300"
              style={{
                width: `${640 * previewScale + 48}px`,
                height: `${800 * previewScale + 48}px`,
              }}
            >
              <div
                className="absolute origin-center transition-all duration-300"
                style={{
                  transform: `scale(${previewScale})`,
                }}
              >
                <AppreciationCard
                  recipientName={recipientName}
                  message={message}
                  weddingDate={weddingDate}
                  brideName={brideName}
                  groomName={groomName}
                  photo={photo}
                  theme={theme}
                  signatureStyle={signatureStyle}
                  qrCodeLink={qrCodeLink}
                  photoZoom={photoZoom}
                  photoX={photoX}
                  photoY={photoY}
                  photoRotate={photoRotate}
                />
              </div>
            </div>
          </div>

          {/* Quick Help Tip */}
          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 bg-amber-500/5 dark:bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/10">
            <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
            <span>You can click and drag sliders in the Couple Photo crop panel to center the portrait correctly.</span>
          </div>
        </div>

      </main>

      {/* Elegant footer */}
      <footer className="py-6 text-center text-xs text-zinc-400 border-t border-zinc-200/50 dark:border-zinc-800/50 mt-12">
        <p>© 2026 Aura Premium Cards. Crafted with ❤️ for memorable moments.</p>
      </footer>
    </div>
  );
}
