"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import { Star, Send, ExternalLink, Code2, CheckCircle2, Trophy, Award, Swords, BadgeCheck, Download } from "lucide-react";
import { sendMessage } from "@/app/actions/messages";
import Hero from "./Hero";
import AboutSection from "./AboutSection";

// Dynamic import for ThreeCanvas to avoid SSR WebGL issues
const ThreeCanvas = dynamic(() => import("@/components/canvas/ThreeCanvas"), { ssr: false });

type PortfolioProps = {
  education: Array<{
    id: string;
    degree: string;
    department: string;
    collegeName: string;
    university: string;
    startYear: string;
    endYear: string | null;
    cgpa: string | null;
    status: string;
  }>;
  experience: Array<{
    id: string;
    designation: string;
    companyName: string;
    employmentType: string;
    startDate: string;
    endDate: string | null;
    currentlyWorking: boolean;
    description: string | null;
    technologiesUsed: string | null;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string | null;
    liveDemoUrl: string | null;
    githubUrl: string | null;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    feedback: string;
    rating: number;
    designation: string | null;
    company: string | null;
  }>;
  skills: Array<{
    id: string;
    name: string;
    percentage: number;
  }>;
  settings: Record<string, string>;
  roles: Array<{ id: string; text: string }>;
  socials: Array<{ id: string; platform: string; url: string; icon: string | null }>;
  achievements: Array<{
    id: string;
    title: string;
    type: string;
    description: string | null;
    organizer: string | null;
    date: string | null;
    position: string | null;
    badgeUrl: string | null;
    certificateUrl: string | null;
  }>;
  certifications: Array<{
    id: string;
    courseName: string;
    organization: string;
    issueDate: string;
    expiryDate: string | null;
    certificateUrl: string | null;
    credentialId: string | null;
    credentialUrl: string | null;
  }>;
};

export default function PortfolioClient({ education, experience, projects, testimonials, skills, settings, roles, socials, achievements, certifications }: PortfolioProps) {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await sendMessage(formState);
    if (res.success) {
      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", content: "" });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="relative z-10">
      {/* New Interactive Hero Section */}
      <Hero settings={settings} roles={roles} socials={socials} />

      {/* About Me Section */}
      <AboutSection settings={settings} />

      <div className="space-y-32 py-20 px-6 max-w-7xl mx-auto">

      {/* Skills Section — only shown if skills exist in admin */}
      {skills.length > 0 && (
      <section id="skills" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            {settings.SKILLS_HEADING_1 || "Technical"} <span className="text-gradient">{settings.SKILLS_HEADING_2 || "Proficiency"}</span>
          </h2>
          {settings.SKILLS_SUBTITLE && (
            <p className="text-gray-400 max-w-2xl mx-auto">{settings.SKILLS_SUBTITLE}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div key={skill.id} className="glass-card p-6">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-[#EBF4F6]">{skill.name}</span>
                <span className="text-[#37B7C3] font-semibold">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#088395] to-[#37B7C3] h-full rounded-full" style={{ width: `${skill.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Experience Section — only shown if records exist */}
      {experience.length > 0 && (
      <section id="experience" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Professional journey and contributions to high-impact software systems.</p>
        </div>

        <div className="relative border-l-2 border-[#37B7C3]/30 ml-4 md:ml-32 space-y-10">
          {experience.map((exp) => (
            <div key={exp.id} className="relative pl-8 group">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#071952] border-2 border-[#37B7C3] group-hover:bg-[#37B7C3] transition-colors" />
              <div className="glass-card p-6 space-y-2">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#EBF4F6]">{exp.designation}</h3>
                    <p className="text-[#37B7C3] font-medium">{exp.companyName} • {exp.employmentType}</p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">
                    {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.description && <p className="text-gray-300 text-sm">{exp.description}</p>}
                {exp.technologiesUsed && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologiesUsed.split(",").map((tech: string, i: number) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-[#37B7C3]/10 text-[#37B7C3] rounded border border-[#37B7C3]/20">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Education Section */}
      <section id="education" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Education <span className="text-gradient">& Degrees</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Academic background and formal software engineering training.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.length === 0 ? (
            <div className="glass p-6 text-center text-gray-400 col-span-2">No education records added yet. Add them in the Admin CMS!</div>
          ) : (
            education.map((edu) => (
              <div key={edu.id} className="glass-card p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-[#EBF4F6]">{edu.degree}</h3>
                    <p className="text-[#37B7C3]">{edu.department}</p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-[#37B7C3]/20 text-[#37B7C3] rounded-full border border-[#37B7C3]/30">
                    {edu.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm font-medium">{edu.collegeName}, {edu.university}</p>
                <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
                  <span>{edu.startYear} - {edu.endYear || "Present"}</span>
                  {edu.cgpa && <span>CGPA / Grade: {edu.cgpa}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A showcase of complex software solutions and creative web applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <div className="glass p-6 text-center text-gray-400 col-span-full">No projects added yet. Add them in the Admin CMS!</div>
          ) : (
            projects.map((proj) => (
              <div key={proj.id} className="rounded-2xl overflow-hidden bg-[#071933] border border-[#37B7C3]/30 hover:shadow-[0_0_20px_rgba(55,183,195,0.2)] transition-shadow flex flex-col group">
                {/* Project Image */}
                <div className="w-full h-48 relative bg-[#0a2347] overflow-hidden">
                  {proj.imageUrl ? (
                    <Image
                      src={proj.imageUrl}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-500/50 tracking-widest uppercase">ON PROCESS</span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#37B7C3] leading-tight pr-4">{proj.title}</h3>
                    {(proj.liveDemoUrl || proj.githubUrl) && (
                      <a 
                        href={proj.liveDemoUrl || proj.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex-shrink-0 px-4 py-1.5 rounded-full bg-[#37B7C3] text-[#071933] text-sm font-semibold hover:bg-[#2da0ac] transition-colors"
                      >
                        Visit
                      </a>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                    {proj.description}
                  </p>

                  {proj.technologies && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/10">
                      {proj.technologies.split(",").map((tech: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-1 bg-[#37B7C3]/10 text-[#37B7C3] rounded border border-[#37B7C3]/20">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Client <span className="text-gradient">Reviews</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Feedback from collaborators and industry partners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item) => (
              <div key={item.id} className="glass-card p-6 space-y-4">
                <div className="flex text-yellow-400 space-x-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 italic">&quot;{item.feedback}&quot;</p>
                <div>
                  <h4 className="font-bold text-[#EBF4F6]">{item.name}</h4>
                  <p className="text-xs text-[#37B7C3]">{item.designation} {item.company ? `@ ${item.company}` : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements Section — only shown if records exist */}
      {achievements.length > 0 && (
      <section id="achievements" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            My <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Hackathons, competitions, awards, and coding badges I&apos;ve earned.</p>
        </div>

        {/* Group by type */}
        {["HACKATHON","COMPETITION","AWARD","CODING_BADGE"].map((type) => {
          const items = achievements.filter((a) => a.type === type);
          if (items.length === 0) return null;
          const labels: Record<string,string> = { HACKATHON:"Hackathons", COMPETITION:"Competitions", AWARD:"Awards", CODING_BADGE:"Coding Badges" };
          const colors: Record<string,string> = { HACKATHON:"text-purple-400", COMPETITION:"text-blue-400", AWARD:"text-yellow-400", CODING_BADGE:"text-cyan-400" };
          const borders: Record<string,string> = { HACKATHON:"border-purple-500/30", COMPETITION:"border-blue-500/30", AWARD:"border-yellow-500/30", CODING_BADGE:"border-cyan-500/30" };
          const TypeIcon = type === "HACKATHON" ? Code2 : type === "COMPETITION" ? Swords : type === "AWARD" ? Award : Trophy;
          return (
            <div key={type}>
              <div className={`flex items-center space-x-2 mb-4 pb-2 border-b ${borders[type]}`}>
                <TypeIcon size={18} className={colors[type]} />
                <h3 className={`font-bold text-lg ${colors[type]}`}>{labels[type]}</h3>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-400">{items.length}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((a) => (
                  <div key={a.id} className="glass-card p-5 flex flex-col hover:shadow-[0_0_20px_rgba(55,183,195,0.1)] transition-shadow">
                    {a.badgeUrl && (
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden mb-3 bg-white/5">
                        <Image src={a.badgeUrl} alt={a.title} fill className="object-contain p-1" />
                      </div>
                    )}
                    <h4 className="font-bold text-[#EBF4F6] text-sm leading-tight mb-1">{a.title}</h4>
                    {a.position && <p className="text-xs text-yellow-400 font-semibold mb-1">🏆 {a.position}</p>}
                    {a.organizer && <p className="text-xs text-gray-400">{a.organizer}</p>}
                    {a.date && <p className="text-xs text-gray-500">{a.date}</p>}
                    {a.description && <p className="text-xs text-gray-300 mt-2 line-clamp-2">{a.description}</p>}
                    {a.certificateUrl && (
                      <a href={a.certificateUrl} target="_blank" rel="noreferrer"
                        className="mt-3 text-xs text-[#37B7C3] hover:underline flex items-center space-x-1">
                        <ExternalLink size={11} />
                        <span>View Certificate</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
      )}

      {/* Certifications Section — only shown if records exist */}
      {certifications.length > 0 && (
      <section id="certifications" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            My <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Verified courses and professional credentials I&apos;ve completed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((c) => (
            <div key={c.id} className="glass-card p-5 flex flex-col hover:shadow-[0_0_20px_rgba(55,183,195,0.1)] transition-shadow">
              <div className="flex items-center space-x-2 mb-3">
                <BadgeCheck size={18} className="text-[#37B7C3] shrink-0" />
                <span className="text-xs text-[#37B7C3] font-semibold uppercase tracking-wider">{c.organization}</span>
              </div>
              <h4 className="font-bold text-[#EBF4F6] text-sm leading-tight mb-2">{c.courseName}</h4>
              <p className="text-xs text-gray-400 mb-1">Issued: {c.issueDate}{c.expiryDate && ` · Expires: ${c.expiryDate}`}</p>
              {c.credentialId && <p className="text-xs text-gray-500 truncate">ID: {c.credentialId}</p>}
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/10">
                {c.certificateUrl && (
                  <a href={c.certificateUrl} target="_blank" rel="noreferrer"
                    className="flex items-center space-x-1 text-xs text-[#37B7C3] hover:underline">
                    <Download size={11} />
                    <span>Certificate</span>
                  </a>
                )}
                {c.credentialUrl && (
                  <a href={c.credentialUrl} target="_blank" rel="noreferrer"
                    className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white">
                    <ExternalLink size={11} />
                    <span>Verify</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Have a project in mind or want to collaborate? Send a message directly.</p>
        </div>

        <div className="max-w-2xl mx-auto glass-card p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 size={48} className="text-[#37B7C3] mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold text-[#EBF4F6]">Message Sent!</h3>
              <p className="text-gray-300">Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
              <button onClick={() => setSubmitted(false)} className="btn-glow !py-2 !px-6 text-sm mt-4">Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3] transition-colors"
                  placeholder="Project Opportunity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  required
                  value={formState.content}
                  onChange={(e) => setFormState({ ...formState, content: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#37B7C3] transition-colors"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full btn-glow py-3.5 flex items-center justify-center space-x-2">
                <Send size={18} />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      </div>{/* end space-y-32 div */}

      {/* ── PREMIUM FOOTER ── */}
      <footer className="relative mt-0 overflow-hidden">
        {/* Top gradient glow line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60" />

        {/* Subtle radial glow behind the footer */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-teal-400 p-[2px] shadow-[0_0_18px_rgba(6,182,212,0.6)]">
                  <div className="w-full h-full bg-[#071952] rounded-full flex items-center justify-center font-extrabold text-cyan-400 text-lg">
                    N
                  </div>
                </div>
                <span className="text-xl font-bold text-white">
                  Nethesh<span className="text-cyan-400">.dev</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                {settings.HERO_DESCRIPTION
                  ? settings.HERO_DESCRIPTION.slice(0, 100) + (settings.HERO_DESCRIPTION.length > 100 ? "…" : "")
                  : "Building next-generation digital experiences with clean code and modern design."}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Home", href: "#" },
                  { label: "About", href: "#about" },
                  { label: "Skills", href: "#skills" },
                  { label: "Projects", href: "#projects" },
                  { label: "Experience", href: "#experience" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center space-x-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors shrink-0" />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Connect</h4>
              {socials.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      title={s.platform}
                      className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 text-slate-400 transition-all text-xs font-medium"
                    >
                      {s.icon ? (
                        <img src={s.icon} alt={s.platform} className="w-3.5 h-3.5 object-contain" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                      <span>{s.platform}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No social links added yet.</p>
              )}
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors group mt-2"
              >
                <span className="w-4 h-px bg-current transition-all group-hover:w-6" />
                <span>Send a message</span>
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} <span className="text-slate-400 font-medium">{settings.ABOUT_NAME || "Netheshkumar.K"}</span>. All rights reserved.
            </p>
            <p className="text-xs text-slate-600 flex items-center space-x-1">
              <span>Crafted with</span>
              <span className="text-red-500 animate-pulse">♥</span>
              <span>using Next.js &amp; Prisma</span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
