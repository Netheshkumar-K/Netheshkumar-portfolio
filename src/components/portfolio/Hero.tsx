"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { 
  Rocket, 
  Download, 
  Brain, 
  Terminal
} from "lucide-react";
import ResumeDownloadModal from "./ResumeDownloadModal";

type HeroProps = {
  settings: Record<string, string>;
  roles: Array<{ id: string; text: string }>;
  socials: Array<{ id: string; platform: string; url: string; icon: string | null }>;
};

export default function Hero({ settings, roles, socials }: HeroProps) {
  // Typing Effect State
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const roleTexts = useMemo(() => 
    roles.length > 0 ? roles.map(r => r.text) : [
      "<Software Developer/>",
      "<Full Stack Engineer/>",
      "<AI/ML Specialist/>",
      "<UI/UX Creator/>"
    ]
  , [roles]);

  useEffect(() => {
    const handleTyping = () => {
      const currentRoleIndex = loopNum % roleTexts.length;
      const fullText = roleTexts[currentRoleIndex];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 60 : 120);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, roleTexts]);

  // Mouse Parallax Effect Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Card Parallax Transforms
  const leftCardX = useTransform(smoothX, [-500, 500], [-25, 25]);
  const leftCardY = useTransform(smoothY, [-500, 500], [-20, 20]);
  const leftCardRotate = useTransform(smoothX, [-500, 500], [-6, 6]);

  const rightCardX = useTransform(smoothX, [-500, 500], [25, -25]);
  const rightCardY = useTransform(smoothY, [-500, 500], [20, -20]);
  const rightCardRotate = useTransform(smoothX, [-500, 500], [6, -6]);

  const heroImageX = useTransform(smoothX, [-500, 500], [-10, 10]);
  const heroImageY = useTransform(smoothY, [-500, 500], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  const getIcon = (iconName: string | null) => {
    // Basic mapping, could be expanded
    if (iconName === "linkedin") return "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z";
    if (iconName === "github") return "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z";
    if (iconName === "twitter") return "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
    // default generic icon
    return "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z";
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center overflow-hidden bg-transparent text-slate-100"
    >
      <ResumeDownloadModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
      
      {/* Interactive Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f2757_1px,transparent_1px),linear-gradient(to_bottom,#0f2757_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 flex flex-col items-center text-center">

        {/* Available for Work Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-cyan-400 absolute" />
          <span className="pl-2">{settings["HERO_STATUS"] || "Available for Work"}</span>
        </motion.div>

        {/* Floating Profile Avatar Ring */}
        <motion.div
          style={{ x: heroImageX, y: heroImageY }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="relative mb-6 group cursor-pointer"
        >
          {/* Animated Cyan Aura Ring */}
          <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-1000" />
          
          {/* Outer Border Frame with Smooth Rotation (Fixed the artifact issue) */}
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden p-1 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
            {/* Spinning gradient layer */}
            <div className="absolute inset-[-50%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,#06b6d4_90deg,transparent_180deg,#3b82f6_270deg,transparent_360deg)]" />
            
            <div className="w-full h-full rounded-full overflow-hidden relative bg-[#071952] z-10">
              <Image
                src={settings["HERO_IMAGE"] || "/avatar.png"}
                alt="Profile"
                fill
                sizes="(max-width: 768px) 144px, 176px"
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Status Indicator Dot */}
            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-cyan-400 border-2 border-[#06122b] shadow-[0_0_10px_#06b6d4] z-20" />
          </div>
        </motion.div>

        {/* Greeting Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-300 text-sm md:text-base font-medium flex items-center justify-center space-x-2 mb-2"
        >
          <span>👋 Hello, World! I&apos;m</span>
        </motion.p>

        {/* Main Name Heading with Glow */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-3"
        >
          <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(6,182,212,0.6)]">
            {settings["HERO_NAME_FIRST"] || "Netheshkumar"}
          </span>
          <span className="text-white">{settings["HERO_NAME_LAST"] || ".K"}</span>
        </motion.h1>

        {/* Animated Typing Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="h-10 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-mono font-bold text-cyan-400 mb-5"
        >
          <span>{displayText}</span>
          <span className="w-0.5 h-7 bg-cyan-400 ml-1 animate-pulse" />
        </motion.div>

        {/* Description Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed mb-8 font-normal"
        >
          {settings["HERO_DESCRIPTION"] || "Building next-generation digital experiences with clean code, modern design, and AI-powered solutions that scale."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 bg-size-200 text-slate-950 font-bold text-base shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_40px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-2.5"
          >
            <Rocket className="w-5 h-5 fill-slate-950" />
            <span>View Projects</span>
          </a>
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="px-8 py-3.5 rounded-full bg-slate-900/80 border border-cyan-500/40 text-cyan-300 font-semibold text-base backdrop-blur-md hover:bg-cyan-500/10 hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-2.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <Download className="w-5 h-5 text-cyan-400" />
            <span>Download CV</span>
          </button>
        </motion.div>

        {/* Social Links Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center space-x-4"
        >
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.platform}
              className="w-11 h-11 rounded-full bg-slate-900/90 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:bg-cyan-500 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.7)] hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d={getIcon(social.icon)} />
              </svg>
            </a>
          ))}
        </motion.div>
      </div>

      {/* LEFT FLOATING PARALLAX CARD (Code Window) */}
      <motion.div
        style={{ x: leftCardX, y: leftCardY, rotate: leftCardRotate }}
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="hidden lg:block absolute left-6 xl:left-12 top-28 w-64 xl:w-72 p-5 rounded-2xl bg-[#091b3e]/90 border border-cyan-500/30 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] z-20 pointer-events-auto hover:border-cyan-400/70 transition-colors duration-300"
      >
        {/* Card Window Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-3">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/90 inline-block shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/90 inline-block shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-green-500/90 inline-block shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          </div>
          <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-300">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>dev.js</span>
          </div>
        </div>

        {/* Syntax Highlighted Code Content */}
        <div className="font-mono text-xs leading-relaxed space-y-1 text-slate-200">
          <div><span className="text-purple-400 font-semibold">const</span> <span className="text-cyan-300 font-semibold">dev</span> = &#123;</div>
          <div className="pl-4"><span className="text-slate-400">name:</span> <span className="text-teal-300">&quot;Nethesh&quot;</span>,</div>
          <div className="pl-4"><span className="text-slate-400">role:</span> <span className="text-teal-300">&quot;Engineer&quot;</span>,</div>
          <div className="pl-4"><span className="text-slate-400">stack:</span> [<span className="text-amber-300">&quot;React&quot;</span>, <span className="text-amber-300">&quot;Node&quot;</span>, <span className="text-amber-300">&quot;AI&quot;</span>],</div>
          <div className="pl-4"><span className="text-slate-400">status:</span> <span className="text-cyan-400">&quot;open&quot;</span>,</div>
          <div>&#125;;</div>
        </div>
      </motion.div>

      {/* RIGHT FLOATING PARALLAX CARD (AI & ML Analytics) */}
      <motion.div
        style={{ x: rightCardX, y: rightCardY, rotate: rightCardRotate }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="hidden lg:block absolute right-6 xl:right-12 top-28 w-64 xl:w-72 p-5 rounded-2xl bg-[#091b3e]/90 border border-cyan-500/30 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] z-20 pointer-events-auto hover:border-cyan-400/70 transition-colors duration-300"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Brain className="w-6 h-6 animate-pulse text-cyan-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-tight">AI Integration</h4>
            <p className="text-xs text-slate-400">Machine Learning</p>
          </div>
        </div>

        {/* Animated Skill Progress Bars */}
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Frontend Architecture</span>
              <span className="text-cyan-400">90%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/20">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "90%" }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4]" 
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Backend & APIs</span>
              <span className="text-cyan-400">75%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/20">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.2, delay: 1 }}
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4]" 
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">AI & LLM Workflows</span>
              <span className="text-cyan-400">85%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/20">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1.2, delay: 1.2 }}
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-[0_0_10px_#06b6d4]" 
              />
            </div>
          </div>
        </div>

        {/* System Online Badge */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-teal-300 pt-2 border-t border-cyan-500/20">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
          <span>System Online</span>
        </div>
      </motion.div>
    </section>
  );
}
