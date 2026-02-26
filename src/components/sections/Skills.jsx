import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "../../data/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const colorMap = {
  cyan:    { text: "#00ff88", border: "#00ff8833", shadow: "#00ff8822", bg: "#00ff880a", glow: "#00ff8866" },
  blue:    { text: "#0066ff", border: "#0066ff33", shadow: "#0066ff22", bg: "#0066ff0a", glow: "#0066ff66" },
  violet:  { text: "#00ccff", border: "#00ccff33", shadow: "#00ccff22", bg: "#00ccff0a", glow: "#00ccff66" },
  magenta: { text: "#00ff66", border: "#00ff6633", shadow: "#00ff6622", bg: "#00ff660a", glow: "#00ff6666" },
};

const techStack = [
  { name: "HTML",        color: "#E34F26", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS",         color: "#1572B6", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript",  color: "#F7DF1E", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript",  color: "#3178C6", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React",       color: "#61DAFB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Tailwind CSS",color: "#06B6D4", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap",   color: "#7952B3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Node.js",     color: "#339933", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express",     color: "#ffffff", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
];

const SkillBar = ({ name, level, color, inView, index }) => {
  const c = colorMap[color] || colorMap.cyan;
  return (
    <motion.div variants={fadeUp} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-body text-sm text-slate-300 group-hover:text-white transition-colors duration-200">
          {name}
        </span>
        <span className="font-mono text-xs" style={{ color: c.text }}>{level}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${c.text}, ${c.text}88)`,
            boxShadow: `0 0 8px ${c.glow}`,
          }}
        />
      </div>
    </motion.div>
  );
};

const SkillCard = ({ category, color, items, inView }) => {
  const c = colorMap[color] || colorMap.cyan;
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 20px ${c.shadow}`,
        backdropFilter: "blur(16px)",
      }}
      whileHover={{ boxShadow: `0 0 40px ${c.shadow}` }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-2 h-8 rounded-full"
          style={{
            background: `linear-gradient(180deg, ${c.text}, ${c.text}44)`,
            boxShadow: `0 0 12px ${c.glow}`,
          }}
        />
        <h3
          className="font-display text-lg font-bold"
          style={{ color: c.text, textShadow: `0 0 15px ${c.glow}` }}
        >
          {category}
        </h3>
        <div
          className="ml-auto px-2 py-0.5 rounded font-mono text-xs"
          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
        >
          {items.length} skills
        </div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="space-y-4"
      >
        {items.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={color}
            inView={inView}
            index={i}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const TechCard = ({ tech }) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.08, y: -4 }}
      className="flex flex-col items-center gap-3 p-4 rounded-2xl cursor-default transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${tech.color}33`,
        boxShadow: `0 0 15px ${tech.color}11`,
        minWidth: "90px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px ${tech.color}44`;
        e.currentTarget.style.borderColor = tech.color + "88";
        e.currentTarget.style.background = tech.color + "0a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 15px ${tech.color}11`;
        e.currentTarget.style.borderColor = tech.color + "33";
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      }}
    >
      <img
        src={tech.logo}
        alt={tech.name}
        className="w-10 h-10 object-contain"
        style={{ filter: tech.name === "Express" ? "invert(1)" : "none" }}
      />
      <span className="font-mono text-xs font-medium text-center" style={{ color: tech.color }}>
        {tech.name}
      </span>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative section-padding overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#0066ff40" }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: "#0066ff" }}>
              WHAT I KNOW
            </span>
            <div className="w-8 h-px" style={{ background: "#0066ff40" }} />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Technical <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-slate-400 max-w-xl mx-auto text-base sm:text-lg"
          >
            A comprehensive toolkit built across the frontend and backend.
          </motion.p>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {skills.map((skillGroup) => (
            <SkillCard
              key={skillGroup.category}
              category={skillGroup.category}
              color={skillGroup.color}
              items={skillGroup.items}
              inView={inView}
            />
          ))}
        </motion.div>

        {/* Tech stack with logos */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="text-center"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "#00ff8840" }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: "#00ff88" }}>
              TECH STACK
            </span>
            <div className="w-8 h-px" style={{ background: "#00ff8840" }} />
          </motion.div>

          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <TechCard key={tech.name} tech={tech} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
