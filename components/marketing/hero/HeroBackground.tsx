"use client";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* Scientific Technical Grid */}
      <div className="absolute inset-0 tech-grid opacity-70" />

      {/* Radial Gradient Ambient Lighting */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent blur-3xl" />
      <div className="absolute top-[30%] -right-[10%] h-[450px] w-[450px] rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="absolute top-[40%] -left-[10%] h-[450px] w-[450px] rounded-full bg-violet-400/8 blur-3xl" />

      {/* Subtle Coordinate Axis / Framing Lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}