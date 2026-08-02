// File: E:\quintos_ai\components\marketing\hero\HeroBackground.tsx

export default function HeroBackground() {
  return (
    <>
      {/* Blue Glow */}
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-[140px]" />

      {/* Purple Glow */}
      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-violet-500/20 blur-[160px]" />

      {/* Cyan Glow */}
      <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[150px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #94a3b8 1px, transparent 1px),
            linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </>
  );
}