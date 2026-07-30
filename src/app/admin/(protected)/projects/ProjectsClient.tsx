"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, ExternalLink, Code2 } from "lucide-react";
import { deleteProject, toggleProjectVisibility, addProject, updateProject } from "@/app/actions/projects";
import MediaInput from "@/components/admin/MediaInput";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  videoUrl: string | null;
  technologies: string | null;
  liveDemoUrl: string | null;
  githubUrl: string | null;
  isVisible: boolean;
};

export default function ProjectsClient({ initialData }: { initialData: Project[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingData, setEditingData] = useState<Project | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleToggle = async (id: string, currentStatus: boolean) => {
    await toggleProjectVisibility(id, !currentStatus);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
    }
  };

  const openAddModal = () => {
    setEditingData(null);
    setImageUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingData(proj);
    setImageUrl(proj.imageUrl || "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    
    const payload = {
      title: rawData.title as string,
      description: rawData.description as string,
      imageUrl: imageUrl || undefined,
      videoUrl: (rawData.videoUrl as string) || undefined,
      technologies: (rawData.technologies as string) || undefined,
      liveDemoUrl: (rawData.liveDemoUrl as string) || undefined,
      githubUrl: (rawData.githubUrl as string) || undefined,
    };

    if (editingData) {
      await updateProject(editingData.id, payload);
    } else {
      await addProject(payload);
    }
    
    setIsModalOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <button onClick={openAddModal} className="btn-glow flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialData.length === 0 ? (
          <div className="glass p-8 text-center text-gray-400 col-span-2">
            No projects found. Add your first showcase project!
          </div>
        ) : (
          initialData.map((proj) => (
            <div key={proj.id} className="glass-card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                  <h3 className="text-xl font-bold text-[#EBF4F6]">{proj.title}</h3>
                  <div className="flex items-center space-x-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity w-full md:w-auto justify-end">
                    <button onClick={() => handleToggle(proj.id, proj.isVisible)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors" title="Toggle Visibility">
                      {proj.isVisible ? <Eye size={18} className="text-[#37B7C3]" /> : <EyeOff size={18} className="text-gray-500" />}
                    </button>
                    <button onClick={() => openEditModal(proj)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-blue-400" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(proj.id)} className="p-1.5 hover:bg-red-500/20 rounded-full transition-colors text-red-400" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{proj.description}</p>
                {proj.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.technologies.split(",").map((tech, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-[#37B7C3]/10 border border-[#37B7C3]/30 rounded-full text-[#37B7C3]">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 border-t border-white/10 pt-4 mt-2 text-sm text-gray-400">
                {proj.liveDemoUrl && (
                  <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-[#37B7C3] transition-colors">
                    <ExternalLink size={14} />
                    <span>Visit Link</span>
                  </a>
                )}
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-[#37B7C3] transition-colors">
                    <Code2 size={14} />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6 text-gradient">
              {editingData ? "Edit Project" : "Add Project"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input name="title" defaultValue={editingData?.title} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea name="description" defaultValue={editingData?.description} rows={3} required className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
                  <input name="technologies" defaultValue={editingData?.technologies || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="Next.js, Tailwind, Three.js" />
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <MediaInput 
                    label="Project Image" 
                    value={imageUrl} 
                    onChange={setImageUrl} 
                    placeholder="Upload or enter URL..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Visit Link URL (Live Demo)</label>
                  <input name="liveDemoUrl" defaultValue={editingData?.liveDemoUrl || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub URL</label>
                  <input name="githubUrl" defaultValue={editingData?.githubUrl || ""} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" placeholder="https://github.com/..." />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Cancel</button>
                <button type="submit" disabled={loading} className="btn-glow !py-2">
                  {loading ? "Saving..." : (editingData ? "Update Project" : "Save Project")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
