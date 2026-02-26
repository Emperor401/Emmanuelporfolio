import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, ChevronUp, Calendar, MapPin } from "lucide-react";
import { experience } from "../../data/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const nodeColors = ["#00f5ff", "#0080ff", "#8b00ff", "#ff00c8"];

const TimelineItem = ({ item, index, isLast }) => {
  const [expanded, setExpanded] = useState(index === 0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const color = nodeColors[index % nodeColors.length];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex items-start gap-0 w-full"
    >
      {/* Timeline line + node — desktop layout */}
      <div className="hidden md:flex flex-col items-center w-16 flex-shrink-0 relative">
        {/* Vertical line above node */}
        {index > 0 && (
          <div
            className="w-px flex-1 min-h-[2rem]"
            style={{ background: `linear-gradient(180deg, ${nodeColors[(index - 1) % nodeColors.length]}44, ${color}44)` }}
          />
        )}

        {/* Node */}
        <motion.div
          animate={inView ? { scale: [0, 1.3, 1] } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `radial-gradient(circle, ${color}22, #020818)`,
            border: `2px solid ${color}`,
            boxShadow: `0 0 20px ${color}66, 0 0 40px ${color}22`,
          }}
        >
          <Briefcase size={16} style={{ color }} />

          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: color }}
          />
        </motion.div>

        {/* Vertical line below node */}
        {!isLast && (
          <div
            className="w-px flex-1 min-h-[2rem]"
            style={{ background: `linear-gradient(180deg, ${color}44, ${nodeColors[(index + 1) % nodeColors.length]}44)` }}
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 mb-8 md:mb-0 md:ml-6 md:pb-8">
        <motion.div
          className="glass rounded-2xl overflow-hidden transition-all duration-300"
          style={{
            border: `1px solid ${color}33`,
            boxShadow: expanded ? `0 0 30px ${color}22` : "none",
          }}
          whileHover={{ boxShadow: `0 0 30px ${color}22` }}
        >
          {/* Card header */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full p-5 sm:p-6 flex items-start justify-between gap-4 text-left"
          >
            <div className="flex items-start gap-4">
              {/* Mobile node */}
              <div
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: `radial-gradient(circle, ${color}22, #020818)`,
                  border: `2px solid ${color}`,
                  boxShadow: `0 0 15px ${color}44`,
                }}
              >
                <Briefcase size={14} style={{ color }} />
              </div>

              <div>
                <div className="font-display text-base sm:text-lg font-bold text-white mb-1">
                  {item.role}
                </div>
                <div
                  className="font-body text-sm font-semibold mb-2"
                  style={{ color }}
                >
                  {item.company}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
                    <Calendar size={12} />
                    {item.period}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
              style={{
                background: color + "15",
                border: `1px solid ${color}33`,
                color,
              }}
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {/* Expandable content */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                  {/* Divider */}
                  <div
                    className="w-full h-px mb-4"
                    style={{ background: `linear-gradient(90deg, ${color}44, transparent)` }}
                  />

                  {/* Description */}
                  <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Tech stack */}
                  <div>
                    <div className="font-mono text-xs text-slate-500 tracking-widest mb-3">
                      TECHNOLOGIES
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full font-mono text-xs transition-all duration-200 hover:scale-105"
                          style={{
                            background: color + "15",
                            border: `1px solid ${color}33`,
                            color,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020818 0%, #050f2e 50%, #020818 100%)" }}
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-neon-magenta/20 to-transparent" />
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-neon-cyan opacity-[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-neon-violet opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-neon-magenta/40" />
            <span className="font-mono text-xs text-neon-magenta tracking-widest">MY JOURNEY</span>
            <div className="w-8 h-px bg-neon-magenta/40" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Work <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-slate-400 max-w-xl mx-auto text-base sm:text-lg"
          >
            A timeline of roles, companies, and impactful projects that shaped my career.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop center line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, transparent, #00f5ff22, #8b00ff22, #ff00c822, transparent)" }}
          />

          <div className="space-y-0">
            {experience.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLast={index === experience.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full neon-border-cyan">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="font-mono text-xs text-slate-400">
              Currently at{" "}
              <span className="text-neon-cyan font-semibold">NeonTech Labs</span>
              {" "}— Open to new opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
