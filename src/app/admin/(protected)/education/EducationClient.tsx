"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteEducation, toggleEducationVisibility, addEducation, updateEducation } from "@/app/actions/education";

type Education = {
  id: string;
  degree: string;
  department: string;
  collegeName: string;
  university: string;
  startYear: string;
  endYear: string | null;
  cgpa: string | null;
  status: string;
  description: string | null;
  isVisible: boolean;
};

export default function EducationClient({ initialData }: { initialData: Education[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingData, setEditingData] = useState<Education | null>(null);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    await toggleEducationVisibility(id, !currentStatus);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      await deleteEducation(id);
    }
  };

  const openAddModal = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (edu: Education) => {
    setEditingData(edu);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    
    const payload = {
      degree: rawData.degree as string,
      department: rawData.department as string,
      collegeName: rawData.collegeName as string,
      university: rawData.university as string,
      startYear: rawData.startYear as string,
      endYear: (rawData.endYear as string) || undefined,
      cgpa: (rawData.cgpa as string) || undefined,
      status: rawData.status as string,
      description: (rawData.description as string) || undefined,
    };

    if (editingData) {
      await updateEducation(editingData.id, payload);
    } else {
      await addEducation(payload);
    }
    
    setIsModalOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6">
        <button onClick={openAddModal} className="btn-glow flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-4">
        {initialData.length === 0 ? (
          <div className="glass p-8 text-center text-gray-400">
            No education records found. Add your first degree!
          </div>
        ) : (
          initialData.map((edu) => (
            <div key={edu.id} className="glass-card p-6 flex justify-between items-center group">
              <div>
                <h3 className="text-xl font-bold text-[#EBF4F6]">{edu.degree} in {edu.department}</h3>
                <p className="text-[#37B7C3]">{edu.collegeName}, {edu.university}</p>
                <p className="text-sm text-gray-400 mt-1">{edu.startYear} - {edu.endYear || "Present"} | CGPA: {edu.cgpa}</p>
              </div>
              
              <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleToggle(edu.id, edu.isVisible)} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Toggle Visibility">
                  {edu.isVisible ? <Eye size={18} className="text-[#37B7C3]" /> : <EyeOff size={18} className="text-gray-500" />}
                </button>
                <button onClick={() => openEditModal(edu)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-blue-400" title="Edit">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(edu.id)} className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-400" title="Delete">
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
              {editingData ? "Edit Education" : "Add Education"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Degree</label>
                  <input name="degree" defaultValue={editingData?.degree} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="e.g. B.Tech" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <input name="department" defaultValue={editingData?.department} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="e.g. Computer Science" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">College Name</label>
                  <input name="collegeName" defaultValue={editingData?.collegeName} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">University</label>
                  <input name="university" defaultValue={editingData?.university} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Year</label>
                  <input name="startYear" defaultValue={editingData?.startYear} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Year</label>
                  <input name="endYear" defaultValue={editingData?.endYear || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="Leave blank if present" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CGPA / Percentage</label>
                  <input name="cgpa" defaultValue={editingData?.cgpa || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select name="status" defaultValue={editingData?.status || "Completed"} className="w-full px-3 py-2 bg-[#071952] border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]">
                    <option value="Completed">Completed</option>
                    <option value="Studying">Studying</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea name="description" defaultValue={editingData?.description || ""} rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="Optional achievements or details" />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="btn-glow !py-2">
                  {loading ? "Saving..." : (editingData ? "Update Education" : "Save Education")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
