"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, Trophy, Award, Code2, Swords } from "lucide-react";
import {
  addAchievement,
  updateAchievement,
  deleteAchievement,
  toggleAchievementVisibility,
} from "@/app/actions/achievements";
import MediaInput from "@/components/admin/MediaInput";

const TYPES = [
  { value: "HACKATHON", label: "Hackathon", icon: Code2, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
  { value: "COMPETITION", label: "Competition", icon: Swords, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
  { value: "AWARD", label: "Award", icon: Award, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
  { value: "CODING_BADGE", label: "Coding Badge", icon: Trophy, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30" },
];

type Achievement = {
  id: string;
  title: string;
  type: string;
  description: string | null;
  organizer: string | null;
  date: string | null;
  position: string | null;
  badgeUrl: string | null;
  certificateUrl: string | null;
  isVisible: boolean;
};

const getTypeInfo = (type: string) =>
  TYPES.find((t) => t.value === type) || TYPES[0];

const emptyForm = {
  title: "",
  type: "HACKATHON",
  description: "",
  organizer: "",
  date: "",
  position: "",
  badgeUrl: "",
  certificateUrl: "",
};

export default function AchievementsClient({ initialData }: { initialData: Achievement[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingData, setEditingData] = useState<Achievement | null>(null);
  const [form, setForm] = useState(emptyForm);

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const openAdd = () => {
    setEditingData(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (a: Achievement) => {
    setEditingData(a);
    setForm({
      title: a.title,
      type: a.type,
      description: a.description || "",
      organizer: a.organizer || "",
      date: a.date || "",
      position: a.position || "",
      badgeUrl: a.badgeUrl || "",
      certificateUrl: a.certificateUrl || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      title: form.title,
      type: form.type,
      description: form.description || undefined,
      organizer: form.organizer || undefined,
      date: form.date || undefined,
      position: form.position || undefined,
      badgeUrl: form.badgeUrl || undefined,
      certificateUrl: form.certificateUrl || undefined,
    };
    if (editingData) {
      await updateAchievement(editingData.id, payload);
    } else {
      await addAchievement(payload);
    }
    setIsModalOpen(false);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this achievement?")) await deleteAchievement(id);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <button onClick={openAdd} className="btn-glow flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* Type Filter Pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        {TYPES.map((t) => {
          const count = initialData.filter((a) => a.type === t.value).length;
          const Icon = t.icon;
          return (
            <div key={t.value} className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-medium ${t.bg} ${t.color}`}>
              <Icon size={12} />
              <span>{t.label}</span>
              <span className="bg-white/10 px-1.5 py-0.5 rounded-full">{count}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {initialData.length === 0 ? (
          <div className="glass p-8 text-center text-gray-400 col-span-full">
            No achievements yet. Start adding your hackathons, awards, and badges!
          </div>
        ) : (
          initialData.map((a) => {
            const typeInfo = getTypeInfo(a.type);
            const Icon = typeInfo.icon;
            return (
              <div key={a.id} className="glass-card p-5 flex flex-col group relative">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`p-2 rounded-lg border ${typeInfo.bg} ${typeInfo.color} shrink-0`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => toggleAchievementVisibility(a.id, !a.isVisible)} className="p-1.5 hover:bg-white/10 rounded-full" title="Toggle">
                      {a.isVisible ? <Eye size={15} className="text-[#37B7C3]" /> : <EyeOff size={15} className="text-gray-500" />}
                    </button>
                    <button onClick={() => openEdit(a)} className="p-1.5 hover:bg-white/10 rounded-full text-blue-400" title="Edit">
                      <Edit2 size={15} />
                    </button>
                    <button onClick={() => handleDelete(a.id)} className="p-1.5 hover:bg-red-500/20 rounded-full text-red-400" title="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${typeInfo.color}`}>{typeInfo.label}</span>
                <h3 className="text-base font-bold text-white leading-tight mb-1">{a.title}</h3>
                {a.position && <p className="text-xs text-yellow-400 font-semibold mb-1">🏆 {a.position}</p>}
                {a.organizer && <p className="text-xs text-gray-400 mb-1">{a.organizer}</p>}
                {a.date && <p className="text-xs text-gray-500">{a.date}</p>}
                {a.description && <p className="text-xs text-gray-300 mt-2 line-clamp-2">{a.description}</p>}

                {a.certificateUrl && (
                  <a href={a.certificateUrl} target="_blank" rel="noreferrer" className="mt-3 text-xs text-[#37B7C3] hover:underline">
                    View Certificate →
                  </a>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gradient">
              {editingData ? "Edit Achievement" : "Add Achievement"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="e.g. 1st Place at HackIndia 2024" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Type *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {TYPES.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button key={t.value} type="button" onClick={() => set("type", t.value)}
                        className={`flex flex-col items-center py-3 px-2 rounded-xl border transition-all ${form.type === t.value ? `${t.bg} border-current ${t.color}` : "border-white/10 text-gray-400 hover:border-white/30"}`}>
                        <Icon size={18} />
                        <span className="text-xs mt-1 font-medium">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Organizer / Platform</label>
                  <input value={form.organizer} onChange={(e) => set("organizer", e.target.value)} placeholder="e.g. HackerEarth, NPTEL" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="e.g. March 2024" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position / Rank</label>
                  <input value={form.position} onChange={(e) => set("position", e.target.value)} placeholder="e.g. 1st Place, Runner-up, Finalist" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                <textarea rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Brief description..." className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
              </div>

              <MediaInput label="Badge / Trophy Image" value={form.badgeUrl} onChange={(v) => set("badgeUrl", v)} placeholder="Badge image URL..." />
              <MediaInput label="Certificate URL" value={form.certificateUrl} onChange={(v) => set("certificateUrl", v)} placeholder="Certificate link..." />

              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="btn-glow !py-2">
                  {loading ? "Saving..." : editingData ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
