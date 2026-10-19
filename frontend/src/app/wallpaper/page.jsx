
"use client";

import { useState, useRef } from "react";
import {
  X,
  Check,
  ImagePlus,
  RotateCcw,
  Palette,
  Sparkles,
} from "lucide-react";

const wallpapers = [
  {
    name: "Default",
    background: "#e8e3dc",
    type: "solid",
  },
  {
    name: "Sky",
    background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    type: "gradient",
  },
  {
    name: "Sage",
    background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
    type: "gradient",
  },
  {
    name: "Midnight",
    background: "linear-gradient(135deg, #0f172a, #334155)",
    type: "gradient",
  },
  {
    name: "Blush",
    background: "linear-gradient(135deg, #fce7f3, #fbcfe8)",
    type: "gradient",
  },
  {
    name: "Lavender",
    background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
    type: "gradient",
  },
];

export default function WallpaperModal({
  onClose,
  onApply,
  initialWallpaper = "#e8e3dc",
}) {
  const [selected, setSelected] = useState(initialWallpaper);
  const [customImage, setCustomImage] = useState("");
  const fileRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5 MB");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setCustomImage(reader.result);
      setSelected(reader.result);
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const applyWallpaper = () => {
    onApply?.(selected);
    onClose?.();
  };

  const resetWallpaper = () => {
    setSelected("#e8e3dc");
    setCustomImage("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallpaper-title"
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <Palette className="h-5 w-5 text-slate-700" />
            </div>

            <div>
              <h2
                id="wallpaper-title"
                className="font-semibold text-slate-900"
              >
                Chat wallpaper
              </h2>
              <p className="text-xs text-slate-500">
                Personalize your conversation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close wallpaper settings"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-800">
            Preview
          </h3>

          {/* Chat preview */}
          <div
            className="flex min-h-48 flex-col justify-end gap-4 rounded-xl border border-slate-200 bg-cover bg-center p-4 transition-all duration-300"
            style={{
              background: selected,
            }}
          >
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-slate-900 px-4 py-3 text-sm text-white shadow-sm">
                Hey! How&apos;s your day going?
                <p className="mt-1 text-right text-[10px] text-slate-300">
                  10:30 AM
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm text-slate-800 shadow-sm">
                Pretty good! 😊
                <p className="mt-1 text-right text-[10px] text-slate-400">
                  10:31 AM
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-slate-900 px-4 py-3 text-sm text-white shadow-sm">
                Let&apos;s catch up later!
              </div>
            </div>
          </div>

          {/* Presets */}
          <div className="mb-3 mt-6 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">
              Choose a wallpaper
            </h3>
            <span className="text-xs text-slate-400">
              {wallpapers.length} themes
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {wallpapers.map((wallpaper) => (
              <button
                key={wallpaper.name}
                type="button"
                onClick={() => {
                  setSelected(wallpaper.background);
                  setCustomImage("");
                }}
                aria-label={`Select ${wallpaper.name} wallpaper`}
                aria-pressed={selected === wallpaper.background}
                className={`group relative overflow-hidden rounded-xl border-2 p-1 transition ${
                  selected === wallpaper.background
                    ? "border-slate-900 ring-2 ring-slate-200"
                    : "border-transparent hover:border-slate-300"
                }`}
              >
                <div
                  className="flex aspect-1.5/1 items-center justify-center rounded-lg"
                  style={{ background: wallpaper.background }}
                >
                  {selected === wallpaper.background && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow">
                      <Check className="h-4 w-4 text-slate-900" />
                    </span>
                  )}
                </div>

                <span className="block truncate px-1 py-2 text-xs font-medium text-slate-600">
                  {wallpaper.name}
                </span>
              </button>
            ))}
          </div>

          {/* Custom image and reset */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <ImagePlus className="h-4 w-4" />
              Custom image
            </button>

            <button
              type="button"
              onClick={resetWallpaper}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <Sparkles className="h-3.5 w-3.5" />
            Images up to 5 MB are supported.
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-slate-100 bg-white p-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={applyWallpaper}
            className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 active:scale-[0.98]"
          >
            Apply wallpaper
          </button>
        </div>
      </div>
    </div>
  );
}
