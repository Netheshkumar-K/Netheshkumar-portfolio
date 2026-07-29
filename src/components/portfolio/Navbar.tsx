"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoTap = useCallback(() => {
    setTapCount(prev => {
      const next = prev + 1;
      // Reset timer on each tap
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
      tapTimerRef.current = setTimeout(() => setTapCount(0), 2000);

      if (next >= 5) {
        clearTimeout(tapTimerRef.current!);
        setTapCount(0);
        router.push("/admin/login");
      }
      return next >= 5 ? 0 : next;
    });
  }, [router]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#06122b]/85 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo — tap 5 times quickly to access Admin */}
        <Link href="/" className="flex items-center space-x-3 group" onClick={handleLogoTap}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-teal-400 p-[2px] shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.9)] transition-all duration-300">
            <div className="w-full h-full bg-[#071952] rounded-full flex items-center justify-center font-extrabold text-cyan-400 text-lg">
              N
            </div>
          </div>
          <span className="text-xl font-bold tracking-wide text-white">
            Nethesh<span className="text-cyan-400 font-semibold">.dev</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-cyan-400 transition-colors py-1 relative group">
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 rounded-full scale-x-100 transition-transform origin-left" />
          </a>
          <a href="#about" className="hover:text-cyan-400 transition-colors py-1 relative group">
            <span>About</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 rounded-full group-hover:w-full transition-all duration-300 origin-left" />
          </a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors py-1 relative group">
            <span>Skills</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 rounded-full group-hover:w-full transition-all duration-300 origin-left" />
          </a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors py-1 relative group">
            <span>Projects</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 rounded-full group-hover:w-full transition-all duration-300 origin-left" />
          </a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors py-1 relative group">
            <span>Experience</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 rounded-full group-hover:w-full transition-all duration-300 origin-left" />
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors py-1 relative group">
            <span>Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 rounded-full group-hover:w-full transition-all duration-300 origin-left" />
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex px-5 py-2 rounded-full border border-cyan-500/40 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}


