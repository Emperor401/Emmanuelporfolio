import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import avatar from "../../assets/port.png";
import {
  Github,
  Linkedin,
  ArrowRight,
  Code2,
  Database,
  Globe,
  Cpu,
  Layers,
  Terminal,
  Braces,
  Server,
} from "lucide-react";
import { personalInfo } from "../../data/portfolioData";

const TYPING_STRINGS = personalInfo.taglines;

const FLOATING_ICONS = [
  { Icon: Code2,    top: "15%", left: "8%",   delay: 0,    color: "#00f5ff" },
  { Icon: Database, top: "70%", left: "5%",   delay: 0.5,  color: "#8b00ff" },
  { Icon: Globe,    top: "20%", right: "7%",  delay: 1,    color: "#0080ff" },
  { Icon: Cpu,      top: "75%", right: "6%",  delay: 1.5,  color: "#ff00c8" },
  { Icon: Layers,   top: "45%", left: "3%",   delay: 2,    color: "#00f5ff" },
  { Icon: Terminal, top: "40%", right: "4%",  delay: 0.8,  color: "#8b00ff" },
  { Icon: Braces,   top: "85%", left: "15%",  delay: 1.2,  color: "#0080ff" },
  { Icon: Server,   top: "10%", right: "18%", delay: 1.8,  color: "#ff00c8" },
];

const TypingText = ({ strings }) => {
  const [text, setText] = useState("");
  const [strIndex, setStrIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorTimer = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    const current = strings[strIndex];
    let timeout;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 60);
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex));
        setCharIndex((c) => c - 1);
      }, 35);
    } else {
      setDeleting(false);
      setStrIndex((s) => (s + 1) % strings.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, strIndex, strings]);

  return (
    <span className="neon-text-cyan font-mono">
      {text}
      <span
        className="inline-block w-0.5 h-5 bg-neon-cyan ml-0.5 align-middle"
        style={{ opacity: showCursor ? 1 : 0 }}
      />
    </span>
  );
};

const Hero = () => {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-cyan opacity-[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-violet opacity-[0.05] blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-blue opacity-[0.03] blur-[120px] pointer-events-none" />

      {/* Floating icons — hidden on mobile */}
      <div className="hidden md:block">
        {FLOATING_ICONS.map(({ Icon, top, left, right, delay, color }, i) => (
          <motion.div
            key={i}
            className="absolute z-10"
            style={{ top, left, right }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              y: [0, -15, 0],
            }}
            transition={{
              delay,
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center glass"
              style={{
                border: `1px solid ${color}33`,
                boxShadow: `0 0 12px ${color}22`,
              }}
            >
              <Icon size={18} style={{ color }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass neon-border-cyan mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-neon-cyan" />
          <span className="font-mono text-xs text-neon-cyan tracking-widest">
            AVAILABLE FOR WORK
          </span>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-8"
        >
          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #ffffff, #cccccc, #ffffff, #888888, #ffffff",
              padding: "2px",
              borderRadius: "9999px",
            }}
          >
            <div className="w-full h-full rounded-full bg-navy-950" />
          </motion.div>

          {/* Pulse rings */}
          <div className="absolute -inset-6 rounded-full border border-neon-cyan/10 animate-ping" />
          <div className="absolute -inset-10 rounded-full border border-neon-violet/5" />

          {/* Avatar circle */}
          <div
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0a1628, #0d1f3c)",
              boxShadow: "0 0 30px #00f5ff22, 0 0 60px #8b00ff11",
            }}
          >
            <img
            src={avatar}
             alt="Alex Morgan"
             className="w-full h-full rounded-full object-cover"
/>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
        >
          <span className="text-white">Hi, I'm </span>
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-lg sm:text-xl md:text-2xl text-slate-300 font-medium tracking-wide mb-4"
        >
          {personalInfo.role}
        </motion.div>

        {/* Typing tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-mono text-base sm:text-lg text-slate-400 mb-10 h-8 flex items-center"
        >
          <span className="text-neon-cyan/50 mr-2">&gt;</span>
          <TypingText strings={TYPING_STRINGS} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12"
        >
          <button
            onClick={() => scrollTo("#projects")}
            className="flex items-center gap-2 px-6 py-3 rounded font-body font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105"
            style={{
              background: "#ffffff",
              boxShadow: "0 0 20px #ffffff33",
              color: "#000000",
            }}
          >
            View Projects
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            className="flex items-center gap-2 px-6 py-3 rounded font-body font-semibold text-sm sm:text-base text-neon-cyan neon-border-cyan hover:bg-neon-cyan/10 transition-all duration-300 hover:scale-105"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          {[
            { Icon: Github,   href: personalInfo.github,   color: "#00f5ff" },
            { Icon: Linkedin, href: personalInfo.linkedin, color: "#0080ff" },
          ].map(({ Icon, href, color }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = color;
                e.currentTarget.style.borderColor = color + "66";
                e.currentTarget.style.boxShadow = `0 0 15px ${color}44`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <Icon size={18} />
            </a>
          ))}

          <div className="w-px h-6 bg-white/10" />

          <span className="font-mono text-xs text-slate-500">
            {personalInfo.location}
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-slate-600 tracking-widest">
            SCROLL DOWN
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-neon-cyan to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
