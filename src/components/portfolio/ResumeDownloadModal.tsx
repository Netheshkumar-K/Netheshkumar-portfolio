"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, CheckCircle2 } from "lucide-react";
import { requestResume } from "@/app/actions/resume";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ResumeDownloadModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", purpose: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await requestResume(formData);
    if (res.success) {
      setSuccess(true);
      setResumeUrl(res.resumeUrl || "#");
    }
    setLoading(false);
  };

  const handleDownloadComplete = () => {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: "", email: "", purpose: "", message: "" });
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg bg-[#0a1930] border border-cyan-500/30 rounded-2xl shadow-2xl p-6 overflow-hidden z-10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>

            {success ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 size={56} className="text-cyan-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                <p className="text-slate-300 mb-6">Your request has been sent.</p>
                <a
                  href={resumeUrl && resumeUrl !== "#" ? resumeUrl : "/resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Resume.pdf"
                  onClick={handleDownloadComplete}
                  className="px-8 py-3 rounded-full bg-cyan-500 text-slate-900 font-bold hover:bg-cyan-400 transition-colors inline-flex items-center space-x-2"
                >
                  <Download size={18} />
                  <span>Download Resume Now</span>
                </a>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Download Resume</h3>
                <p className="text-slate-400 text-sm mb-6">Please provide your details to download the resume.</p>
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Purpose of Download</label>
                    <select
                      required
                      value={formData.purpose}
                      onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-400 focus:outline-none [&>option]:bg-[#0a1930]"
                    >
                      <option value="">Select a purpose...</option>
                      <option value="Hiring / Recruitment">Hiring / Recruitment</option>
                      <option value="Freelance Project">Freelance Project</option>
                      <option value="Networking">Networking</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Message (Optional)</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-bold hover:opacity-90 transition-opacity mt-4 flex justify-center items-center"
                  >
                    {loading ? "Processing..." : "Submit & Download"}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
