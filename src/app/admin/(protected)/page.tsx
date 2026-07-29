import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/auth";
import Link from "next/link";
import { ExternalLink, FolderGit2, MessageSquare, Star, Briefcase } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  const [projectCount, messageCount, testimonialCount, experienceCount] = await Promise.all([
    prisma.project.count(),
    prisma.message.count({ where: { isRead: false } }),
    prisma.testimonial.count(),
    prisma.experience.count(),
  ]);

  const stats = [
    { label: "Projects", value: projectCount, icon: FolderGit2, color: "text-[#37B7C3]" },
    { label: "Unread Messages", value: messageCount, icon: MessageSquare, color: "text-amber-400" },
    { label: "Testimonials", value: testimonialCount, icon: Star, color: "text-purple-400" },
    { label: "Experience Entries", value: experienceCount, icon: Briefcase, color: "text-green-400" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Overview</h1>
          <p className="text-gray-400 mt-1">Welcome back, {session?.user?.name} 👋</p>
        </div>
        <Link
          href="/"
          className="btn-glow flex items-center space-x-2 !py-2 !px-5 text-sm"
        >
          <ExternalLink size={16} />
          <span>View Portfolio</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass p-6 flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass p-6">
        <h2 className="text-xl font-bold mb-3">Getting Started</h2>
        <p className="text-gray-300 leading-relaxed">
          Use the sidebar to manage your portfolio content — add projects, update your experience, 
          manage testimonials, and reply to messages. Changes are reflected instantly on the portfolio.
        </p>
        <p className="text-gray-500 text-sm mt-3">
          🔒 Admin panel is hidden from public view. Access it directly at <code className="text-[#37B7C3]">/admin/login</code>
        </p>
      </div>
    </div>
  );
}
