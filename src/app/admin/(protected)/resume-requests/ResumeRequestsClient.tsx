"use client";

import { useState } from "react";
import { deleteResumeRequest } from "@/app/actions/resume";
import { Trash2, FileText, Mail, Calendar, User, Tag } from "lucide-react";

type RequestItem = {
  id: string;
  name: string;
  email: string;
  purpose: string;
  message: string | null;
  createdAt: Date;
};

type Props = {
  initialRequests: RequestItem[];
};

export default function ResumeRequestsClient({ initialRequests }: Props) {
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);

  const handleDelete = async (id: string) => {
    if (confirm("Delete this log record?")) {
      const res = await deleteResumeRequest(id);
      if (res.success) {
        setRequests((prev) => prev.filter((r) => r.id !== id));
      }
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-4 border-b border-[#37B7C3]/20">
        <h1 className="text-2xl font-bold text-gradient">Resume Download Leads</h1>
        <p className="text-sm text-gray-400">View users who requested and downloaded your resume.</p>
      </div>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="glass p-8 text-center text-gray-400">
            No resume download requests logged yet.
          </div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="glass p-6 rounded-xl space-y-3 relative group">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>{req.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-normal">
                        {req.purpose}
                      </span>
                    </h3>
                    <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                      <span className="flex items-center space-x-1">
                        <Mail size={12} />
                        <span>{req.email}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{new Date(req.createdAt).toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(req.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {req.message && (
                <div className="pt-2 text-sm text-slate-300 border-t border-white/5 bg-black/20 p-3 rounded-lg">
                  <p className="font-semibold text-xs text-gray-400 mb-1">Message:</p>
                  <p className="italic">&quot;{req.message}&quot;</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
