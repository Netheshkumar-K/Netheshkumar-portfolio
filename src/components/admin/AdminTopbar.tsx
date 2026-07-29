"use client";

import { Bell, Search, Menu } from "lucide-react";
import Link from "next/link";

export default function AdminTopbar({ user }: { user?: { name?: string | null } }) {
  return (
    <header className="h-16 border-b border-[#37B7C3]/30 bg-[#071952]/50 backdrop-blur-md flex items-center justify-between px-6 z-10">
      <div className="flex items-center">
        <button className="md:hidden text-gray-300 hover:text-white mr-4">
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm focus:outline-none focus:border-[#37B7C3] transition-colors w-64 text-white"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="text-gray-300 hover:text-[#37B7C3] transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#071952]"></span>
        </button>
        
        <div className="flex items-center space-x-3 border-l border-[#37B7C3]/30 pl-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#088395] to-[#37B7C3] flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(55,183,195,0.5)]">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.name || "Admin"}</p>
            <p className="text-xs text-[#37B7C3]">Administrator</p>
          </div>
        </div>
        
        <Link href="/" target="_blank" className="text-xs btn-glow !px-3 !py-1.5 !rounded-md">
          View Site
        </Link>
      </div>
    </header>
  );
}
