"use client";

import { useState, useEffect, useRef } from "react";
import { Link2, HardDrive, Image as ImageIcon, FolderOpen, Upload, Loader2 } from "lucide-react";
import { getPublicFiles, uploadFile } from "@/app/actions/files";

type MediaInputProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
};

export default function MediaInput({ label, value, onChange, placeholder }: MediaInputProps) {
  const [mode, setMode] = useState<"url" | "gdrive" | "existing" | "upload">("url");
  const [driveUrl, setDriveUrl] = useState("");
  const [existingFiles, setExistingFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === "existing" && existingFiles.length === 0) {
      getPublicFiles().then(setExistingFiles);
    }
  }, [mode, existingFiles.length]);

  const convertDriveUrl = (url: string) => {
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadFile(formData);
    setIsUploading(false);

    if (res.success && res.url) {
      onChange(res.url);
      setMode("url"); // switch back to URL to show it
      // refresh existing files for later
      getPublicFiles().then(setExistingFiles);
    } else {
      alert("Failed to upload file");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[#EBF4F6]">{label}</label>
        <div className="flex flex-wrap items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-1 rounded flex items-center space-x-1 transition-colors ${
              mode === "url" ? "bg-[#37B7C3] text-black font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            <Link2 size={12} />
            <span className="hidden sm:inline">URL</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("gdrive")}
            className={`px-2 py-1 rounded flex items-center space-x-1 transition-colors ${
              mode === "gdrive" ? "bg-[#37B7C3] text-black font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            <HardDrive size={12} />
            <span className="hidden sm:inline">Drive</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("existing")}
            className={`px-2 py-1 rounded flex items-center space-x-1 transition-colors ${
              mode === "existing" ? "bg-[#37B7C3] text-black font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            <FolderOpen size={12} />
            <span className="hidden sm:inline">Existing</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-1 rounded flex items-center space-x-1 transition-colors ${
              mode === "upload" ? "bg-[#37B7C3] text-black font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            <Upload size={12} />
            <span className="hidden sm:inline">Upload</span>
          </button>
        </div>
      </div>

      {mode === "url" && (
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "https://example.com/image.jpg"}
            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
          />
        </div>
      )}

      {mode === "gdrive" && (
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

      {mode === "existing" && (
        <div className="relative">
          <select
            value={value.startsWith("/") ? value.replace("/", "") : ""}
            onChange={(e) => {
              if (e.target.value) {
                onChange(`/${e.target.value}`);
              }
            }}
            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3] [&>option]:bg-[#071952]"
          >
            <option value="">-- Select a file from public folder --</option>
            {existingFiles.map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>
        </div>
      )}

      {mode === "upload" && (
        <div className="relative border-2 border-dashed border-white/20 rounded-lg p-6 flex flex-col items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2 text-[#37B7C3]">
              <Loader2 className="animate-spin w-8 h-8" />
              <span className="text-sm font-medium">Uploading...</span>
            </div>
          ) : (
            <div 
              className="flex flex-col items-center space-y-3 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="p-3 bg-[#37B7C3]/10 rounded-full text-[#37B7C3]">
                <Upload size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-white">Click to upload file from your device</p>
                <p className="text-xs text-gray-400 mt-1">Supports images, PDFs, etc.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {value && (
        <div className="mt-2 text-xs text-[#37B7C3] flex items-center space-x-1 truncate">
          <ImageIcon size={12} className="shrink-0" />
          <span className="truncate">Current: {value}</span>
        </div>
      )}
    </div>
  );
}
