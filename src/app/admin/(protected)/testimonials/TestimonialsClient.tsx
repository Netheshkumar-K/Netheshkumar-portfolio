"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Star } from "lucide-react";
import { deleteTestimonial, toggleTestimonialFeatured, addTestimonial, updateTestimonial } from "@/app/actions/testimonials";

type Testimonial = {
  id: string;
  name: string;
  feedback: string;
  company: string | null;
  designation: string | null;
  rating: number;
  profilePhoto: string | null;
  isFeatured: boolean;
  status: string;
};

export default function TestimonialsClient({ initialData }: { initialData: Testimonial[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingData, setEditingData] = useState<Testimonial | null>(null);

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    await toggleTestimonialFeatured(id, !currentStatus);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      await deleteTestimonial(id);
    }
  };

  const openAddModal = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingData(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    
    const payload = {
      name: rawData.name as string,
      feedback: rawData.feedback as string,
      company: (rawData.company as string) || undefined,
      designation: (rawData.designation as string) || undefined,
      rating: Number(rawData.rating) || 5,
      profilePhoto: (rawData.profilePhoto as string) || undefined,
      isFeatured: rawData.isFeatured === "true",
    };

    if (editingData) {
      await updateTestimonial(editingData.id, payload);
    } else {
      await addTestimonial(payload);
    }
    
    setIsModalOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <button onClick={openAddModal} className="btn-glow flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialData.length === 0 ? (
          <div className="glass p-8 text-center text-gray-400 col-span-2">
            No testimonials found. Add your first review!
          </div>
        ) : (
          initialData.map((item) => (
            <div key={item.id} className="glass-card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#EBF4F6]">{item.name}</h3>
                    <p className="text-[#37B7C3] text-sm">{item.designation} {item.company ? `@ ${item.company}` : ""}</p>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleToggleFeatured(item.id, item.isFeatured)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors" title="Toggle Featured">
                      <Star size={18} className={item.isFeatured ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} />
                    </button>
                    <button onClick={() => openEditModal(item)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-blue-400" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 hover:bg-red-500/20 rounded-full transition-colors text-red-400" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex text-yellow-400 space-x-1 my-2">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic">&quot;{item.feedback}&quot;</p>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gradient">
              {editingData ? "Edit Testimonial" : "Add Testimonial"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input name="name" defaultValue={editingData?.name} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                  <input type="number" min="1" max="5" name="rating" defaultValue={editingData?.rating || 5} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input name="company" defaultValue={editingData?.company || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Designation</label>
                  <input name="designation" defaultValue={editingData?.designation || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Profile Photo URL</label>
                  <input name="profilePhoto" defaultValue={editingData?.profilePhoto || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Featured on Homepage?</label>
                  <select name="isFeatured" defaultValue={editingData?.isFeatured ? "true" : "false"} className="w-full px-3 py-2 bg-[#071952] border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]">
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Feedback</label>
                <textarea name="feedback" defaultValue={editingData?.feedback} rows={4} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="btn-glow !py-2">
                  {loading ? "Saving..." : (editingData ? "Update Testimonial" : "Save Testimonial")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
