import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import HeroExperience from "../components/models/hero_models/HeroExperience";
import AnimatedCounter from "../components/AnimatedCounter";
import CinematicBackground from "../components/CinematicBackground";
import { PrimaryCTA, SecondaryCTA } from "../components/ElectricButton";
import ElectricSkillPill from "../components/ElectricSkillPill";
import ElectricBadge from "../components/ElectricBadge";

const DOMAINS = [
  { label: "Full-Stack Dev", icon: "⚡" },
  { label: "Machine Learning", icon: "🧠" },
  { label: "Cloud Computing", icon: "☁️" },
];

const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".hero-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      .fromTo(".hero-heading", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.2")
      .fromTo(".hero-subtitle", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.3")
      .fromTo(".hero-pills", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.2")
      .fromTo(".hero-ctas", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.2")
      .fromTo(".hero-3d-container", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2 }, "-=0.8")
      .fromTo(".hero-scroll-indicator", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.1");

    gsap.to(".hero-orb-1", { y: -24, x: 12, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-orb-2", { y: 20, x: -16, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
  });

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col overflow-hidden bg-black">
      {/* ── BACKGROUND LAYERS (z-0) ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <CinematicBackground />
      </div>

      {/* ── MAIN CONTENT GRID (z-10) ── */}
      <div className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center min-h-[calc(100vh-16rem)]">
          
          {/* ── LEFT COLUMN: Content ── */}
          <div className="flex flex-col gap-8 lg:gap-10">
            
            {/* Education Badge */}
            <div className="hero-badge flex justify-center lg:justify-start">
              <ElectricBadge>
                B.Tech ISE • BMSCE Bangalore • 2027
              </ElectricBadge>
            </div>

            {/* Large Heading */}
            <div className="hero-heading">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
                <span className="text-white">Rohan</span>
                <br />
                <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                  Kumar
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="hero-subtitle">
              <p className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-xl">
                Building systems that are{" "}
                <span className="text-cyan-300 font-semibold">fast</span>,{" "}
                <span className="text-cyan-300 font-semibold">intelligent</span>, and{" "}
                <span className="text-cyan-300 font-semibold">built to scale</span>.
              </p>
            </div>

            {/* Skill Pills */}
            <div className="hero-pills flex flex-wrap gap-3">
              {DOMAINS.map(({ label, icon }, idx) => (
                <ElectricSkillPill
                  key={label}
                  icon={icon}
                  label={label}
                  delay={0.1 * idx}
                />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hero-ctas flex flex-wrap items-center gap-4">
              <PrimaryCTA href="#work">
                <span>View My Work</span>
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </PrimaryCTA>

              <SecondaryCTA href="https://github.com/rohan-k-dev" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </SecondaryCTA>

              <SecondaryCTA href="https://linkedin.com/in/rohan19725" target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </SecondaryCTA>
            </div>
          </div>

          {/* ── RIGHT COLUMN: 3D Visual ── */}
          <div className="hero-3d-container relative lg:h-[600px] xl:h-[700px] h-[400px] md:h-[500px]">
            {/* Glow Effect Behind 3D */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-3xl opacity-60 animate-pulse" style={{ animationDuration: '4s' }} />
            
            {/* 3D Model Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <HeroExperience />
            </div>

            {/* Decorative Frame */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 blur-xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2" aria-hidden="true">
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse" style={{ animationDuration: '2s' }} />
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Scroll</span>
      </div>

      {/* ── STATS COUNTER ── */}
      <div className="relative z-20">
        <AnimatedCounter />
      </div>
    </section>
  );
};

export default Hero;
