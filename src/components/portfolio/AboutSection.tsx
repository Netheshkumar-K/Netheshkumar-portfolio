"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { 
  User, 
  MapPin, 
  Globe, 
  Briefcase, 
  Mail, 
  Calendar,
  Code,
  Zap,
  ShieldCheck,
  Lightbulb,
  Download
} from "lucide-react";
import ResumeDownloadModal from "./ResumeDownloadModal";

type AboutProps = {
  settings: Record<string, string>;
};

export default function AboutSection({ settings }: AboutProps) {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const infoDetails = [
    { icon: User, label: "Name", value: settings["ABOUT_NAME"] || "Netheshkumar.K" },
    { icon: Briefcase, label: "Role", value: settings["ABOUT_ROLE"] || "Software Developer" },
    { icon: MapPin, label: "Location", value: settings["ABOUT_LOCATION"] || "Tamil Nadu, India" },
    { icon: Mail, label: "Email", value: settings["ABOUT_EMAIL"] || "nethesh@email.com" },
    { icon: Globe, label: "Website", value: settings["ABOUT_WEBSITE"] || "netheshkumar.dev" },
    { icon: Calendar, label: "Experience", value: settings["ABOUT_EXPERIENCE"] || "3+ Years" },
  ];

  const highlights = [
    { icon: Code, title: "Clean Code" },
    { icon: Zap, title: "Fast Delivery" },
    { icon: ShieldCheck, title: "Reliable" },
    { icon: Lightbulb, title: "Creative" },
  ];

  return (
    <section id="about" className="py-20 relative z-10 max-w-6xl mx-auto px-6">
      <ResumeDownloadModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
      {/* Section Title */}
      <div className="text-center space-y-3 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-widest"
        >
          Who I Am
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-white"
        >
          About <span className="text-cyan-400">Me</span>
        </motion.h2>

        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          {settings["ABOUT_SUBTITLE"] || "Passionate developer who loves turning ideas into reality through code."}
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-400" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Card & 4 Stat Cards */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Main Photo Card */}
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#091b3e]/80 p-3 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] group">
            <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden">
              <Image
                src={settings["ABOUT_IMAGE"] || "/avatar.png"}
                alt="Profile Photo"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06122b] via-transparent to-transparent opacity-90" />
              
              {/* Image Overlay Text */}
              <div className="absolute bottom-4 left-5">
                <h3 className="text-xl font-bold text-white tracking-wide">{settings["ABOUT_NAME"] || "Netheshkumar.K"}</h3>
                <p className="text-cyan-400 text-sm font-medium">{settings["ABOUT_ROLE"] || "Software Developer"}</p>
              </div>
            </div>
          </div>

          {/* 4 Feature Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-[#091b3e]/60 border border-cyan-500/20 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-2 hover:border-cyan-400/50 hover:bg-[#091b3e]/90 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{item.title}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Bio & Info Items Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 pt-2"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {settings["ABOUT_HEADING"] || "I build things for the web."}
          </h3>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {settings["ABOUT_BIO"] || "I'm a passionate Software Developer with over 3 years of experience in building web applications. I specialize in full-stack development, cloud solutions, and creating intuitive user interfaces that leave lasting impressions.\n\nWhen I'm not coding, you'll find me exploring new technologies, contributing to open source, and constantly pushing the boundaries of what's possible in the digital world."}
          </div>

          {/* 6 Info Grid Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
            {infoDetails.map((detail, idx) => {
              const Icon = detail.icon;
              return (
                <div key={idx} className="flex items-center space-x-3.5 p-2.5 rounded-lg bg-[#091b3e]/30 border border-cyan-500/10">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{detail.label}</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-100">{detail.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </button>
            <a
              href="#contact"
              className="px-7 py-3 rounded-xl bg-slate-900/80 border border-cyan-500/40 text-cyan-300 font-semibold text-sm backdrop-blur-md hover:bg-cyan-500/10 hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
