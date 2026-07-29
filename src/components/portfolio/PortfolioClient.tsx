"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Star, Send, ExternalLink, Code2, CheckCircle2 } from "lucide-react";
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
};

export default function PortfolioClient({ education, experience, projects, testimonials, skills, settings, roles, socials }: PortfolioProps) {
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

      {/* Skills Section */}
      <section id="skills" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Technical <span className="text-gradient">Proficiency</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Mastery in modern software technologies and engineering frameworks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.length === 0 ? (
            ["React / Next.js", "TypeScript", "Node.js", "Three.js / WebGL", "Prisma & Databases", "Tailwind / CSS3"].map((skill, i) => (
              <div key={i} className="glass-card p-6">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">{skill}</span>
                  <span className="text-[#37B7C3]">90%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#088395] to-[#37B7C3] h-full rounded-full w-[90%]" />
                </div>
              </div>
            ))
          ) : (
            skills.map((skill) => (
              <div key={skill.id} className="glass-card p-6">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-[#EBF4F6]">{skill.name}</span>
                  <span className="text-[#37B7C3] font-semibold">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#088395] to-[#37B7C3] h-full rounded-full" style={{ width: `${skill.percentage}%` }} />
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Professional journey and contributions to high-impact software systems.</p>
        </div>

        <div className="relative border-l-2 border-[#37B7C3]/30 ml-4 md:ml-32 space-y-10">
          {experience.length === 0 ? (
            <div className="glass p-6 text-center text-gray-400">No experience records added yet. Add them in the Admin CMS!</div>
          ) : (
            experience.map((exp) => (
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
            ))
          )}
        </div>
      </section>

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
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A showcase of complex software solutions and creative web applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.length === 0 ? (
            <div className="glass p-6 text-center text-gray-400 col-span-2">No projects added yet. Add them in the Admin CMS!</div>
          ) : (
            projects.map((proj) => (
              <div key={proj.id} className="glass-card p-8 flex flex-col justify-between group space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#EBF4F6] group-hover:text-[#37B7C3] transition-colors">{proj.title}</h3>
                  <p className="text-gray-300 text-sm mt-3 leading-relaxed">{proj.description}</p>
                  {proj.technologies && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {proj.technologies.split(",").map((tech: string, i: number) => (
                        <span key={i} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-6 pt-4 border-t border-white/10 text-sm">
                  {proj.liveDemoUrl && (
                    <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-[#37B7C3] hover:underline">
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                      <Code2 size={16} />
                      <span>Source Code</span>
                    </a>
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

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pt-16 border-t border-white/10">
          <p>© {new Date().getFullYear()} Next-Gen Portfolio. Managed by AI Admin CMS.</p>
        </footer>
      </div>
    </div>
  );
}
