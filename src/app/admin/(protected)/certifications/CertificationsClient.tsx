"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, ExternalLink, Download, BadgeCheck } from "lucide-react";
import {
  addCertification,
  updateCertification,
  deleteCertification,
  toggleCertificationVisibility,
} from "@/app/actions/certifications";
import MediaInput from "@/components/admin/MediaInput";

type Certification = {
  id: string;
  courseName: string;
  organization: string;
  issueDate: string;
  expiryDate: string | null;
  certificateUrl: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  isVisible: boolean;
};

const emptyForm = {
  courseName: "",
  organization: "",
  issueDate: "",
  expiryDate: "",
  certificateUrl: "",
  credentialId: "",
  credentialUrl: "",
};

export default function CertificationsClient({ initialData }: { initialData: Certification[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingData, setEditingData] = useState<Certification | null>(null);
  const [form, setForm] = useState(emptyForm);

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const openAdd = () => {
    setEditingData(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (c: Certification) => {
    setEditingData(c);
    setForm({
      courseName: c.courseName,
      organization: c.organization,
      issueDate: c.issueDate,
      expiryDate: c.expiryDate || "",
      certificateUrl: c.certificateUrl || "",
      credentialId: c.credentialId || "",
      credentialUrl: c.credentialUrl || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      courseName: form.courseName,
      organization: form.organization,
      issueDate: form.issueDate,
      expiryDate: form.expiryDate || undefined,
      certificateUrl: form.certificateUrl || undefined,
      credentialId: form.credentialId || undefined,
      credentialUrl: form.credentialUrl || undefined,
    };
    if (editingData) {
      await updateCertification(editingData.id, payload);
    } else {
      await addCertification(payload);
    }
    setIsModalOpen(false);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this certification?")) await deleteCertification(id);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <button onClick={openAdd} className="btn-glow flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {initialData.length === 0 ? (
          <div className="glass p-8 text-center text-gray-400 col-span-full">
            No certifications yet. Add your course completions and certifications!
          </div>
        ) : (
          initialData.map((c) => (
            <div key={c.id} className="glass-card p-5 flex flex-col group">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                  <BadgeCheck size={18} />
                </div>
                <div className="flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => toggleCertificationVisibility(c.id, !c.isVisible)} className="p-1.5 hover:bg-white/10 rounded-full" title="Toggle">
                    {c.isVisible ? <Eye size={15} className="text-[#37B7C3]" /> : <EyeOff size={15} className="text-gray-500" />}
                  </button>
                  <button onClick={() => openEdit(c)} className="p-1.5 hover:bg-white/10 rounded-full text-blue-400" title="Edit">
                    <Edit2 size={15} />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 hover:bg-red-500/20 rounded-full text-red-400" title="Delete">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-white leading-tight mb-1">{c.courseName}</h3>
              <p className="text-sm text-[#37B7C3] font-medium mb-2">{c.organization}</p>
              <p className="text-xs text-gray-400">
                Issued: {c.issueDate}
                {c.expiryDate && ` · Expires: ${c.expiryDate}`}
              </p>
              {c.credentialId && (
                <p className="text-xs text-gray-500 mt-1 truncate">ID: {c.credentialId}</p>
              )}

              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/10">
                {c.certificateUrl && (
                  <a href={c.certificateUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-xs text-[#37B7C3] hover:underline">
                    <Download size={12} />
                    <span>Certificate</span>
                  </a>
                )}
                {c.credentialUrl && (
                  <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white">
                    <ExternalLink size={12} />
                    <span>Verify</span>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gradient">
              {editingData ? "Edit Certification" : "Add Certification"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Course Name *</label>
                <input value={form.courseName} onChange={(e) => set("courseName", e.target.value)} required placeholder="e.g. Full Stack Web Development" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Organization *</label>
                <input value={form.organization} onChange={(e) => set("organization", e.target.value)} required placeholder="e.g. Coursera, NPTEL, Udemy" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Issue Date *</label>
                  <input value={form.issueDate} onChange={(e) => set("issueDate", e.target.value)} required placeholder="e.g. January 2024" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date (Optional)</label>
                  <input value={form.expiryDate} onChange={(e) => set("expiryDate", e.target.value)} placeholder="e.g. January 2027 or No Expiry" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Credential ID (Optional)</label>
                  <input value={form.credentialId} onChange={(e) => set("credentialId", e.target.value)} placeholder="e.g. UC-XXXX-XXXX" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Verify URL (Optional)</label>
                  <input value={form.credentialUrl} onChange={(e) => set("credentialUrl", e.target.value)} placeholder="https://verify.coursera.org/..." className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3]" />
                </div>
              </div>

              <MediaInput label="Certificate File / Image" value={form.certificateUrl} onChange={(v) => set("certificateUrl", v)} placeholder="Upload or link to certificate..." />

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
