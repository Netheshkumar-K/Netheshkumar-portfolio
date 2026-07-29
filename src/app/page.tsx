import { prisma } from "@/lib/auth";
import PortfolioClient from "@/components/portfolio/PortfolioClient";
import Navbar from "@/components/portfolio/Navbar";
import CustomCursor from "@/components/portfolio/CustomCursor";
import AuroraBackground from "@/components/portfolio/AuroraBackground";
import { getSettings } from "@/app/actions/settings";

export default async function Home() {
  const education = await prisma.education.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });

  const experience = await prisma.experience.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });

  const projects = await prisma.project.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });

  const testimonials = await prisma.testimonial.findMany({
    where: { isFeatured: true },
  });

  const skills = await prisma.skill.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });

  const settings = await getSettings();
  
  const roles = await prisma.role.findMany({
    orderBy: { order: "asc" }
  });

  const socials = await prisma.socialMedia.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" }
  });

  const achievements = await prisma.achievement.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });

  const certifications = await prisma.certification.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
  });

  return (
    <main className="relative min-h-screen bg-[#06122b] text-slate-100 selection:bg-cyan-400 selection:text-slate-950 overflow-x-hidden">
      <CustomCursor />
      <AuroraBackground />
      <Navbar />
      <PortfolioClient
        education={education}
        experience={experience}
        projects={projects}
        testimonials={testimonials}
        skills={skills}
        settings={settings}
        roles={roles}
        socials={socials}
        achievements={achievements}
        certifications={certifications}
      />
    </main>
  );
}
