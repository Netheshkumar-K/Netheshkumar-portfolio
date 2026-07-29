"use client";

import { useState } from "react";
import { addRole, updateRole, deleteRole } from "@/app/actions/roles";
import { Plus, Trash2, Edit2, Check, X, List } from "lucide-react";

type RoleItem = {
  id: string;
  text: string;
};

type Props = {
  initialRoles: RoleItem[];
};

export default function RolesClient({ initialRoles }: Props) {
  const [roles, setRoles] = useState<RoleItem[]>(initialRoles);
  const [newRoleText, setNewRoleText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleText.trim()) return;
    const res = await addRole(newRoleText.trim());
    if (res.success) {
      setNewRoleText("");
      window.location.reload();
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editText.trim()) return;
    const res = await updateRole(id, editText.trim());
    if (res.success) {
      setEditingId(null);
      window.location.reload();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this role?")) {
      const res = await deleteRole(id);
      if (res.success) {
        setRoles((prev) => prev.filter((r) => r.id !== id));
      }
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-4 border-b border-[#37B7C3]/20">
        <h1 className="text-2xl font-bold text-gradient">Animated Typing Roles</h1>
        <p className="text-sm text-gray-400">Add or manage the animated role titles displayed in your Hero section.</p>
      </div>

      <form onSubmit={handleAdd} className="glass p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-bold text-white mb-2">Add New Role Title</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            required
            placeholder="e.g. <Full Stack Architect/>"
            value={newRoleText}
            onChange={(e) => setNewRoleText(e.target.value)}
            className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#37B7C3]"
          />
          <button type="submit" className="btn-glow py-2 px-6 flex items-center space-x-2 text-sm font-semibold">
            <Plus size={18} />
            <span>Add Role</span>
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {roles.length === 0 ? (
          <div className="glass p-8 text-center text-gray-400">
            No roles added yet. Standard default roles will be displayed until you add customized ones.
          </div>
        ) : (
          roles.map((role) => (
            <div key={role.id} className="glass p-4 rounded-xl flex items-center justify-between space-x-4">
              {editingId === role.id ? (
                <div className="flex-1 flex items-center space-x-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-3 py-1 bg-black/40 border border-white/20 rounded text-sm text-white focus:outline-none"
                  />
                  <button onClick={() => setEditingId(null)} className="p-1 text-gray-400 hover:text-white">
                    <X size={18} />
                  </button>
                  <button onClick={() => handleUpdate(role.id)} className="p-1 text-[#37B7C3]">
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-[#37B7C3]/10 text-[#37B7C3]">
                      <List size={18} />
                    </div>
                    <span className="font-mono text-cyan-300 font-semibold text-base">{role.text}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(role.id);
                        setEditText(role.text);
                      }}
                      className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(role.id)}
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
