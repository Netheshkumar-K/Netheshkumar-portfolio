"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  MessageSquare, 
  Settings,
  LogOut,
  Star,
  Cpu,
  ExternalLink,
  Share2,
  List,
  FileText,
  Trophy,
  BadgeCheck
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
  { name: "Roles", href: "/admin/roles", icon: List },
  { name: "Social Media", href: "/admin/socials", icon: Share2 },
  { name: "Skills", href: "/admin/skills", icon: Cpu },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Achievements", href: "/admin/achievements", icon: Trophy },
  { name: "Certifications", href: "/admin/certifications", icon: BadgeCheck },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Resume Downloads", href: "/admin/resume-requests", icon: FileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-[#071952] border-r border-[#37B7C3]/30 flex flex-col transition-all duration-300">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gradient">AI CMS</h2>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-[#37B7C3]/20 text-[#37B7C3] border border-[#37B7C3]/50 shadow-[0_0_10px_rgba(55,183,195,0.2)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={20} className={isActive ? "animate-pulse" : ""} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#37B7C3]/30 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-[#37B7C3] hover:bg-[#37B7C3]/10 transition-colors"
        >
          <ExternalLink size={20} />
          <span className="font-medium">View Portfolio</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
