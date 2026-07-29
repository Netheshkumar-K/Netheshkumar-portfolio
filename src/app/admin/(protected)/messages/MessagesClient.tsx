"use client";

import { Trash2, Mail, MailOpen } from "lucide-react";
import { deleteMessage, toggleMessageRead } from "@/app/actions/messages";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  content: string;
  isRead: boolean;
  createdAt: Date;
};

export default function MessagesClient({ initialData }: { initialData: Message[] }) {
  const handleToggleRead = async (id: string, currentReadState: boolean) => {
    await toggleMessageRead(id, !currentReadState);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteMessage(id);
    }
  };

  return (
    <div className="space-y-4">
      {initialData.length === 0 ? (
        <div className="glass p-8 text-center text-gray-400">
          No messages received yet.
        </div>
      ) : (
        initialData.map((msg) => (
          <div key={msg.id} className={`glass-card p-6 border-l-4 ${msg.isRead ? "border-l-gray-500" : "border-l-[#37B7C3]"} flex flex-col justify-between group`}>
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-[#EBF4F6]">{msg.name}</h3>
                  <p className="text-[#37B7C3] text-sm">{msg.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400 mr-2">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  <button onClick={() => handleToggleRead(msg.id, msg.isRead)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors" title={msg.isRead ? "Mark as Unread" : "Mark as Read"}>
                    {msg.isRead ? <MailOpen size={18} className="text-gray-400" /> : <Mail size={18} className="text-[#37B7C3]" />}
                  </button>
                  <button onClick={() => handleDelete(msg.id)} className="p-1.5 hover:bg-red-500/20 rounded-full transition-colors text-red-400" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              {msg.subject && (
                <p className="text-sm font-semibold text-gray-200 mb-2">Subject: {msg.subject}</p>
              )}
              <p className="text-gray-300 text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
