"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteSkill, toggleSkillVisibility, addSkill, updateSkill } from "@/app/actions/skills";

type Skill = {
  id: string;
  name: string;
  percentage: number;
  iconUrl: string | null;
  isVisible: boolean;
};

export default function SkillsClient({ initialData }: { initialData: Skill[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingData, setEditingData] = useState<Skill | null>(null);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    await toggleSkillVisibility(id, !currentStatus);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      await deleteSkill(id);
    }
  };

  const openAddModal = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingData(skill);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    
    const payload = {
      name: rawData.name as string,
      percentage: Number(rawData.percentage) || 0,
      iconUrl: (rawData.iconUrl as string) || undefined,
    };

    if (editingData) {
      await updateSkill(editingData.id, payload);
    } else {
      await addSkill(payload);
    }
    
    setIsModalOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <button onClick={openAddModal} className="btn-glow flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {initialData.length === 0 ? (
          <div className="glass p-8 text-center text-gray-400 col-span-3">
            No skills added yet.
          </div>
        ) : (
          initialData.map((skill) => (
            <div key={skill.id} className="glass-card p-4 flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-[#EBF4F6]">{skill.name}</h3>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleToggle(skill.id, skill.isVisible)} className="p-1 hover:bg-white/10 rounded-full" title="Toggle Visibility">
                      {skill.isVisible ? <Eye size={16} className="text-[#37B7C3]" /> : <EyeOff size={16} className="text-gray-500" />}
                    </button>
                    <button onClick={() => openEditModal(skill)} className="p-1 hover:bg-white/10 rounded-full text-blue-400" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(skill.id)} className="p-1 hover:bg-red-500/20 rounded-full text-red-400" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-1">
                  <div className="bg-gradient-to-r from-[#088395] to-[#37B7C3] h-full rounded-full" style={{ width: `${skill.percentage}%` }} />
                </div>
                <span className="text-xs text-[#37B7C3] font-semibold">{skill.percentage}%</span>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gradient">
              {editingData ? "Edit Skill" : "Add Skill"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Skill Name</label>
                <input name="name" defaultValue={editingData?.name} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="e.g. React, TypeScript, Python" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Proficiency Percentage (0-100)</label>
                <input type="number" min="0" max="100" name="percentage" defaultValue={editingData?.percentage || 80} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon URL (optional)</label>
                <input name="iconUrl" defaultValue={editingData?.iconUrl || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="https://..." />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="btn-glow !py-2">
                  {loading ? "Saving..." : (editingData ? "Update Skill" : "Save Skill")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
