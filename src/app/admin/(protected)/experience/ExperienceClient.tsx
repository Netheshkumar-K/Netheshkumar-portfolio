"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteExperience, toggleExperienceVisibility, addExperience, updateExperience } from "@/app/actions/experience";

type Experience = {
  id: string;
  companyName: string;
  designation: string;
  employmentType: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  description: string | null;
  technologiesUsed: string | null;
  isVisible: boolean;
};

export default function ExperienceClient({ initialData }: { initialData: Experience[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingData, setEditingData] = useState<Experience | null>(null);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    await toggleExperienceVisibility(id, !currentStatus);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      await deleteExperience(id);
    }
  };

  const openAddModal = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingData(exp);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    
    const payload = {
      companyName: rawData.companyName as string,
      designation: rawData.designation as string,
      employmentType: rawData.employmentType as string,
      location: (rawData.location as string) || undefined,
      startDate: rawData.startDate as string,
      endDate: (rawData.endDate as string) || undefined,
      currentlyWorking: rawData.currentlyWorking === "true",
      description: (rawData.description as string) || undefined,
      technologiesUsed: (rawData.technologiesUsed as string) || undefined,
    };

    if (editingData) {
      await updateExperience(editingData.id, payload);
    } else {
      await addExperience(payload);
    }
    
    setIsModalOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6">
        <button onClick={openAddModal} className="btn-glow flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {initialData.length === 0 ? (
          <div className="glass p-8 text-center text-gray-400">
            No experience records found. Add your first job!
          </div>
        ) : (
          initialData.map((exp) => (
            <div key={exp.id} className="glass-card p-6 flex justify-between items-center group">
              <div>
                <h3 className="text-xl font-bold text-[#EBF4F6]">{exp.designation} at {exp.companyName}</h3>
                <p className="text-[#37B7C3]">{exp.employmentType} • {exp.location || "Remote"}</p>
                <p className="text-sm text-gray-400 mt-1">{exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}</p>
              </div>
              
              <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleToggle(exp.id, exp.isVisible)} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Toggle Visibility">
                  {exp.isVisible ? <Eye size={18} className="text-[#37B7C3]" /> : <EyeOff size={18} className="text-gray-500" />}
                </button>
                <button onClick={() => openEditModal(exp)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-blue-400" title="Edit">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(exp.id)} className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-400" title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gradient">
              {editingData ? "Edit Experience" : "Add Experience"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <input name="companyName" defaultValue={editingData?.companyName} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Designation</label>
                  <input name="designation" defaultValue={editingData?.designation} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Employment Type</label>
                  <select name="employmentType" defaultValue={editingData?.employmentType || "Full-time"} className="w-full px-3 py-2 bg-[#071952] border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input name="location" defaultValue={editingData?.location || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input name="startDate" defaultValue={editingData?.startDate} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="e.g. Jan 2022" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input name="endDate" defaultValue={editingData?.endDate || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="Leave blank if present" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Currently Working?</label>
                  <select name="currentlyWorking" defaultValue={editingData?.currentlyWorking ? "true" : "false"} className="w-full px-3 py-2 bg-[#071952] border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]">
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Technologies Used</label>
                  <input name="technologiesUsed" defaultValue={editingData?.technologiesUsed || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="React, Node.js, Next.js" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea name="description" defaultValue={editingData?.description || ""} rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="Responsibilities and achievements" />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="btn-glow !py-2">
                  {loading ? "Saving..." : (editingData ? "Update Experience" : "Save Experience")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
