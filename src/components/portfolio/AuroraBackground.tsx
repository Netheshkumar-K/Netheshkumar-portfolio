"use client";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#06122b]">
      {/* Full Page Cyber Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f2757_1px,transparent_1px),linear-gradient(to_bottom,#0f2757_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />

      {/* Ambient Radial Cyan Glowing Orbs */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/15 rounded-full blur-[150px] animate-pulse" 
        style={{ animationDuration: "8s" }} 
      />
      <div 
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] animate-pulse" 
        style={{ animationDuration: "12s", animationDelay: "2s" }} 
      />
      <div 
        className="absolute bottom-10 -left-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] animate-pulse" 
        style={{ animationDuration: "10s", animationDelay: "4s" }} 
      />
    </div>
  );
}
