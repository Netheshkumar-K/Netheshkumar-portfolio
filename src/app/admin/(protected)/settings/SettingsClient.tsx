"use client";

import { useState } from "react";
import { updateSettings } from "@/app/actions/settings";
import MediaInput from "@/components/admin/MediaInput";
import { Save, CheckCircle2, Home, User, FileText } from "lucide-react";

type Props = {
  initialSettings: Record<string, string>;
};

export default function SettingsClient({ initialSettings }: Props) {
  const [settings, setSettings] = useState<Record<string, string>>({
    HERO_NAME_FIRST: initialSettings.HERO_NAME_FIRST || "Netheshkumar",
    HERO_NAME_LAST: initialSettings.HERO_NAME_LAST || ".K",
    HERO_STATUS: initialSettings.HERO_STATUS || "Available for Work",
    HERO_DESCRIPTION: initialSettings.HERO_DESCRIPTION || "Building next-generation digital experiences with clean code, modern design, and AI-powered solutions that scale.",
    HERO_IMAGE: initialSettings.HERO_IMAGE || "/avatar.png",

    ABOUT_NAME: initialSettings.ABOUT_NAME || "Netheshkumar.K",
    ABOUT_ROLE: initialSettings.ABOUT_ROLE || "Software Developer",
    ABOUT_LOCATION: initialSettings.ABOUT_LOCATION || "Tamil Nadu, India",
    ABOUT_EMAIL: initialSettings.ABOUT_EMAIL || "netheshkumark@gmail.com",
    ABOUT_WEBSITE: initialSettings.ABOUT_WEBSITE || "netheshkumar.dev",
    ABOUT_EXPERIENCE: initialSettings.ABOUT_EXPERIENCE || "3+ Years",
    ABOUT_HEADING: initialSettings.ABOUT_HEADING || "I build things for the web.",
    ABOUT_SUBTITLE: initialSettings.ABOUT_SUBTITLE || "Passionate developer who loves turning ideas into reality through code.",
    ABOUT_BIO: initialSettings.ABOUT_BIO || "I'm a passionate Software Developer with over 3 years of experience in building web applications. I specialize in full-stack development, cloud solutions, and creating intuitive user interfaces that leave lasting impressions.\n\nWhen I'm not coding, you'll find me exploring new technologies, contributing to open source, and constantly pushing the boundaries of what's possible in the digital world.",
    ABOUT_IMAGE: initialSettings.ABOUT_IMAGE || "/avatar.png",

    RESUME_URL: initialSettings.RESUME_URL || "/resume.pdf",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateSettings(settings);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center pb-4 border-b border-[#37B7C3]/20">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Site Content Settings</h1>
          <p className="text-sm text-gray-400">Manage all text, images, and resume link displayed on your portfolio.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="btn-glow py-2.5 px-6 flex items-center space-x-2 text-sm font-semibold"
        >
          {saved ? <CheckCircle2 size={18} className="text-green-400" /> : <Save size={18} />}
          <span>{saving ? "Saving..." : saved ? "Saved!" : "Save All Changes"}</span>
        </button>
      </div>

      {/* Hero Section Card */}
      <div className="glass p-6 rounded-xl space-y-6">
        <div className="flex items-center space-x-2 text-[#37B7C3]">
          <Home size={20} />
          <h2 className="text-lg font-bold text-white">Hero Page Content</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#EBF4F6] mb-2">First Name (Glowing)</label>
            <input
              type="text"
              value={settings.HERO_NAME_FIRST}
              onChange={(e) => handleChange("HERO_NAME_FIRST", e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#EBF4F6] mb-2">Last Name / Suffix</label>
            <input
              type="text"
              value={settings.HERO_NAME_LAST}
              onChange={(e) => handleChange("HERO_NAME_LAST", e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#EBF4F6] mb-2">Status Badge Text</label>
          <input
            type="text"
            value={settings.HERO_STATUS}
            onChange={(e) => handleChange("HERO_STATUS", e.target.value)}
            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#EBF4F6] mb-2">Hero Description Paragraph</label>
          <textarea
            rows={3}
            value={settings.HERO_DESCRIPTION}
            onChange={(e) => handleChange("HERO_DESCRIPTION", e.target.value)}
            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
          />
        </div>

        <MediaInput
          label="Hero Profile Image URL / Google Drive Link"
          value={settings.HERO_IMAGE}
          onChange={(url) => handleChange("HERO_IMAGE", url)}
        />
      </div>

      {/* About Section Card */}
      <div className="glass p-6 rounded-xl space-y-6">
        <div className="flex items-center space-x-2 text-[#37B7C3]">
          <User size={20} />
          <h2 className="text-lg font-bold text-white">About Me Page Content</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#EBF4F6] mb-2">Display Name</label>
            <input
              type="text"
              value={settings.ABOUT_NAME}
              onChange={(e) => handleChange("ABOUT_NAME", e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#EBF4F6] mb-2">Primary Designation / Role</label>
            <input
              type="text"
              value={settings.ABOUT_ROLE}
              onChange={(e) => handleChange("ABOUT_ROLE", e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#EBF4F6] mb-2">Location</label>
            <input
              type="text"
              value={settings.ABOUT_LOCATION}
              onChange={(e) => handleChange("ABOUT_LOCATION", e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#EBF4F6] mb-2">Public Contact Email</label>
            <input
              type="email"
              value={settings.ABOUT_EMAIL}
              onChange={(e) => handleChange("ABOUT_EMAIL", e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#EBF4F6] mb-2">Website Domain</label>
            <input
              type="text"
              value={settings.ABOUT_WEBSITE}
              onChange={(e) => handleChange("ABOUT_WEBSITE", e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#EBF4F6] mb-2">Years of Experience</label>
            <input
              type="text"
              value={settings.ABOUT_EXPERIENCE}
              onChange={(e) => handleChange("ABOUT_EXPERIENCE", e.target.value)}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#EBF4F6] mb-2">About Section Heading</label>
          <input
            type="text"
            value={settings.ABOUT_HEADING}
            onChange={(e) => handleChange("ABOUT_HEADING", e.target.value)}
            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#EBF4F6] mb-2">About Section Subtitle</label>
          <input
            type="text"
            value={settings.ABOUT_SUBTITLE}
            onChange={(e) => handleChange("ABOUT_SUBTITLE", e.target.value)}
            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#EBF4F6] mb-2">Full Bio / Description</label>
          <textarea
            rows={5}
            value={settings.ABOUT_BIO}
            onChange={(e) => handleChange("ABOUT_BIO", e.target.value)}
            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
          />
        </div>

        <MediaInput
          label="About Me Photo URL / Google Drive Link"
          value={settings.ABOUT_IMAGE}
          onChange={(url) => handleChange("ABOUT_IMAGE", url)}
        />
      </div>

      {/* Resume Link Card */}
      <div className="glass p-6 rounded-xl space-y-6">
        <div className="flex items-center space-x-2 text-[#37B7C3]">
          <FileText size={20} />
          <h2 className="text-lg font-bold text-white">Resume Document File</h2>
        </div>

        <MediaInput
          label="Resume File URL / Google Drive Link (PDF)"
          value={settings.RESUME_URL}
          onChange={(url) => handleChange("RESUME_URL", url)}
          placeholder="https://drive.google.com/file/d/... or /resume.pdf"
        />
      </div>
    </form>
  );
}
