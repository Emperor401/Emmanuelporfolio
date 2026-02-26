import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Calendar, Award, Code2, Users, Star } from "lucide-react";
import { personalInfo, stats } from "../../data/portfolioData";
import avatar from "../../assets/port.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

const CounterStat = ({ value, suffix, label, icon: Icon, color }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  const colorMap = {
    cyan:    { text: "#00f5ff", border: "#00f5ff33", shadow: "#00f5ff22", bg: "#00f5ff0a" },
    blue:    { text: "#0080ff", border: "#0080ff33", shadow: "#0080ff22", bg: "#0080ff0a" },
    violet:  { text: "#8b00ff", border: "#8b00ff33", shadow: "#8b00ff22", bg: "#8b00ff0a" },
    magenta: { text: "#ff00c8", border: "#ff00c833", shadow: "#ff00c822", bg: "#ff00c80a" },
  };

  const c = colorMap[color] || colorMap.cyan;

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="flex flex-col items-center justify-center p-5 rounded-xl glass text-center group hover:scale-105 transition-all duration-300"
      style={{
        border:     `1px solid ${c.border}`,
        boxShadow:  `0 0 20px ${c.shadow}`,
        background: c.bg,
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
        style={{ background: c.bg, border: `1px solid ${c.border}` }}
      >
        <Icon size={18} style={{ color: c.text }} />
      </div>
      <div
        className="font-display text-3xl sm:text-4xl font-bold mb-1"
        style={{ color: c.text, textShadow: `0 0 20px ${c.text}66` }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-body text-sm text-slate-400 font-medium">{label}</div>
    </motion.div>
  );
};

const statIcons  = [Calendar, Code2, Users, Star];
const statColors = ["cyan", "blue", "violet", "magenta"];

const About = () => {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding bg-navy-950 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-neon-violet opacity-[0.04] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[250px] h-[250px] rounded-full bg-neon-cyan opacity-[0.03] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-neon-cyan/40" />
            <span className="font-mono text-xs text-neon-cyan tracking-widest">WHO I AM</span>
            <div className="w-8 h-px bg-neon-cyan/40" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
            Passionate developer crafting digital experiences that blend performance with stunning design.
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">

          {/* Left — visual card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-sm">

              {/* Corner brackets */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-neon-cyan" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-neon-cyan" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-neon-violet" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-neon-violet" />

              {/* Card body */}
              <div className="glass rounded-2xl p-6 sm:p-8 neon-border-cyan">

                {/* Avatar row */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #00f5ff22, #8b00ff22)",
                      border:     "2px solid #00f5ff44",
                      boxShadow:  "0 0 20px #00f5ff22",
                    }}
                  >
                    <img
                      src={avatar}
                      alt="Ifeanyi Emmanuel"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-white">{personalInfo.name}</div>
                    <div className="font-body text-sm text-neon-cyan">{personalInfo.role}</div>
                  </div>
                </div>

                {/* Bio */}
                <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {personalInfo.bio}
                </p>

                {/* Info rows */}
                <div className="space-y-3">
                  {[
                    { Icon: MapPin, label: "Location", value: personalInfo.location, color: "#00f5ff" },
                    { Icon: Mail,   label: "Email",    value: personalInfo.email,    color: "#0080ff" },
                    { Icon: Award,  label: "Status",   value: "Available for hire",  color: "#00ff88" },
                  ].map(({ Icon, label, value, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: color + "15", border: `1px solid ${color}33` }}
                      >
                        <Icon size={14} style={{ color }} />
                      </div>
                      <div>
                        <div className="font-mono text-xs text-slate-500">{label}</div>
                        <div className="font-body text-sm text-slate-300">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -right-5 glass rounded-xl px-4 py-2 neon-border-magenta hidden sm:flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="font-mono text-xs text-neon-green">Open to work</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — text content */}
          <motion.div
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
                Building the <span className="neon-text-cyan">future</span>, one line at a time
              </h3>
              <p className="font-body text-slate-400 text-sm sm:text-base leading-relaxed">
                I've worked across the frontend —
                from crafting pixel-perfect React interfaces to architecting scalable Node.js backends
                and cloud infrastructure. I thrive at the intersection of design and engineering.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="font-body text-slate-400 text-sm sm:text-base leading-relaxed">
                I'm obsessed with performance, clean architecture, and developer experience.
                Whether it's a consumer product serving millions or an internal tool for a small team,
                I bring the same level of craft and attention to every project I touch.
              </p>
            </motion.div>

            {/* Skill bars */}
            <motion.div variants={fadeUp} className="space-y-3">
              {[
                { label: "Frontend Development", pct: 90, color: "#00f5ff" },
                { label: "UI / UX Designs",    pct: 70, color: "#8b00ff" },
                { label: "Graphics Designs",          pct: 78, color: "#ff00c8" },
              ].map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between font-mono text-xs mb-1">
                    <span className="text-slate-400">{label}</span>
                    <span style={{ color }}>{pct}%</span>
                  </div>
                  <div className="w-full h-1 bg-navy-800 rounded overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : {}}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                      className="h-full rounded"
                      style={{
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                        boxShadow:  `0 0 8px ${color}66`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-5 py-2.5 rounded font-body font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "#ffffff",
                  boxShadow:  "0 0 20px #ffffff33",
                  color:      "#000000",
                }}
              >
                View My Work
              </button>
              <a
                href={personalInfo.resumeUrl}
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded font-body font-semibold text-sm text-slate-300 border border-white/10 hover:border-neon-cyan/40 hover:text-neon-cyan transition-all duration-300"
              >
                Download CV
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated stats grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <CounterStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={statIcons[i]}
              color={statColors[i]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
