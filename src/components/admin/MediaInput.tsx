"use client";

import { useState } from "react";
import { Link2, HardDrive, Image as ImageIcon } from "lucide-react";

type MediaInputProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
};

export default function MediaInput({ label, value, onChange, placeholder }: MediaInputProps) {
  const [mode, setMode] = useState<"url" | "gdrive">("url");
  const [driveUrl, setDriveUrl] = useState("");

  const convertDriveUrl = (url: string) => {
    // Converts https://drive.google.com/file/d/1A2B3C.../view?usp=sharing
    // to https://drive.google.com/uc?export=view&id=1A2B3C...
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  };

  const handleDriveSubmit = () => {
    if (!driveUrl) return;
    const formatted = convertDriveUrl(driveUrl);
    onChange(formatted);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[#EBF4F6]">{label}</label>
        <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-1 rounded flex items-center space-x-1 transition-colors ${
              mode === "url" ? "bg-[#37B7C3] text-black font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            <Link2 size={12} />
            <span>Direct URL</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("gdrive")}
            className={`px-2 py-1 rounded flex items-center space-x-1 transition-colors ${
              mode === "gdrive" ? "bg-[#37B7C3] text-black font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            <HardDrive size={12} />
            <span>Google Drive</span>
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "https://example.com/image.jpg"}
            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex space-x-2">
            <input
              type="text"
              value={driveUrl}
              onChange={(e) => setDriveUrl(e.target.value)}
              placeholder="Paste Google Drive Share Link..."
              className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
            />
            <button
              type="button"
              onClick={handleDriveSubmit}
              className="px-4 py-2 bg-[#37B7C3] text-black font-semibold rounded-lg text-sm hover:bg-[#37B7C3]/90 transition-colors"
            >
              Apply Link
            </button>
          </div>
          <p className="text-xs text-gray-400">
            Ensure the Google Drive file permission is set to <strong>&quot;Anyone with the link can view&quot;</strong>.
          </p>
        </div>
      )}

      {value && (
        <div className="mt-2 text-xs text-[#37B7C3] flex items-center space-x-1 truncate">
          <ImageIcon size={12} />
          <span className="truncate">Current: {value}</span>
        </div>
      )}
    </div>
  );
}
