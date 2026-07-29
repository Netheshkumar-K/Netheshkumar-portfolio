"use client";

import { useState } from "react";
import { addSocial, updateSocial, deleteSocial } from "@/app/actions/socials";
import { Plus, Trash2, Edit2, Check, X, Share2, ExternalLink } from "lucide-react";

type Social = {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  isVisible: boolean;
};

type Props = {
  initialSocials: Social[];
};

export default function SocialsClient({ initialSocials }: Props) {
  const [socials, setSocials] = useState<Social[]>(initialSocials);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    icon: "github",
    isVisible: true,
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addSocial(formData);
    if (res.success) {
      setIsAdding(false);
      setFormData({ platform: "", url: "", icon: "github", isVisible: true });
      window.location.reload();
    }
  };

  const handleUpdate = async (id: string) => {
    const res = await updateSocial(id, formData);
    if (res.success) {
      setEditingId(null);
      window.location.reload();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this social link?")) {
      const res = await deleteSocial(id);
      if (res.success) {
        setSocials((prev) => prev.filter((s) => s.id !== id));
      }
    }
  };

  const startEdit = (s: Social) => {
    setEditingId(s.id);
    setFormData({
      platform: s.platform,
      url: s.url,
      icon: s.icon || "github",
      isVisible: s.isVisible,
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center pb-4 border-b border-[#37B7C3]/20">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Social Media Links</h1>
          <p className="text-sm text-gray-400">Add, edit, or remove your social media profiles.</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => {
              setIsAdding(true);
              setFormData({ platform: "", url: "", icon: "github", isVisible: true });
            }}
            className="btn-glow py-2 px-4 flex items-center space-x-2 text-sm font-semibold"
          >
            <Plus size={18} />
            <span>Add Social Link</span>
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="glass p-6 rounded-xl space-y-4">
          <h3 className="text-lg font-bold text-white mb-4">Add New Social Link</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Platform Name</label>
              <input
                type="text"
                required
                placeholder="e.g. GitHub, LinkedIn, Instagram"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Profile URL</label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Icon Identifier</label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3] [&>option]:bg-[#071952]"
            >
              <option value="github">GitHub</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter / X</option>
              <option value="email">Email / Contact</option>
              <option value="other">Other / Generic</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-lg text-gray-400 hover:text-white text-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn-glow py-2 px-6 text-sm font-semibold">
              Save Link
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socials.length === 0 ? (
          <div className="glass p-8 text-center text-gray-400 col-span-2">
            No social media links added yet. Click &quot;Add Social Link&quot; to create one.
          </div>
        ) : (
          socials.map((social) => (
            <div key={social.id} className="glass p-5 rounded-xl flex items-center justify-between space-x-4">
              {editingId === social.id ? (
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full px-3 py-1 bg-black/40 border border-white/20 rounded text-sm"
                  />
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-3 py-1 bg-black/40 border border-white/20 rounded text-sm"
                  />
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => setEditingId(null)} className="p-1 text-gray-400 hover:text-white">
                      <X size={18} />
                    </button>
                    <button onClick={() => handleUpdate(social.id)} className="p-1 text-[#37B7C3]">
                      <Check size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3 truncate">
                    <div className="p-2.5 rounded-lg bg-[#37B7C3]/10 text-[#37B7C3]">
                      <Share2 size={20} />
                    </div>
                    <div className="truncate">
                      <h4 className="font-bold text-white text-base">{social.platform}</h4>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-cyan-400 hover:underline flex items-center space-x-1 truncate"
                      >
                        <span className="truncate">{social.url}</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => startEdit(social)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(social.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
