"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset tap count after 1.5 seconds of inactivity
  useEffect(() => {
    if (tapCount > 0) {
      const timer = setTimeout(() => setTapCount(0), 1500);
      return () => clearTimeout(timer);
    }
  }, [tapCount]);

  const handleLogoTap = (e: React.MouseEvent) => {
    e.preventDefault();
    setTapCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        window.location.href = "/admin/login";
        return 0;
      }
      return newCount;
    });
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#06122b]/90 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">

        {/* Brand Logo */}
        <Link href="/" onClick={handleLogoTap} className="flex items-center space-x-2 sm:space-x-3 group select-none">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-teal-400 p-[2px] shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.9)] transition-all duration-300 cursor-pointer shrink-0">
            <div className="w-full h-full bg-[#071952] rounded-full flex items-center justify-center font-extrabold text-cyan-400 text-base sm:text-lg">
              N
            </div>
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-wide text-white cursor-pointer">
            Nethesh<span className="text-cyan-400 font-semibold">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-cyan-400 transition-colors py-1 relative group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 rounded-full group-hover:w-full transition-all duration-300 origin-left" />
            </a>
          ))}
        </nav>

        {/* Desktop Hire Me Button */}
        <div className="hidden lg:flex items-center">
          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#06122b]/95 backdrop-blur-xl border-t border-cyan-500/20 px-4 pt-4 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              className="flex items-center px-4 py-3 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10">
            <a
              href="#contact"
              onClick={closeMobile}
              className="flex items-center justify-center w-full px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
