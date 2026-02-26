import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Server, Palette, CheckCircle2 } from "lucide-react";
import { services } from "../../data/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const colorMap = {
  cyan:    { text: "#00ff88", border: "#00ff8833", shadow: "#00ff8822", bg: "#00ff880a", glow: "#00ff8866" },
  blue:    { text: "#0066ff", border: "#0066ff33", shadow: "#0066ff22", bg: "#0066ff0a", glow: "#0066ff66" },
  violet:  { text: "#00ccff", border: "#00ccff33", shadow: "#00ccff22", bg: "#00ccff0a", glow: "#00ccff66" },
  magenta: { text: "#00ff66", border: "#00ff6633", shadow: "#00ff6622", bg: "#00ff660a", glow: "#00ff6666" },
};

const serviceIcons = {
  "Web Development": Globe,
  "Backend Systems": Server,
  "UI / UX Design":  Palette,
};

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const c = colorMap[service.color] || colorMap.cyan;
  const Icon = serviceIcons[service.title] || Globe;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative rounded-2xl p-6 sm:p-8 group transition-all duration-300 hover:-translate-y-2 overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${c.border}`,
        backdropFilter: "blur(16px)",
      }}
      whileHover={{ boxShadow: `0 0 40px ${c.shadow}, 0 20px 60px ${c.shadow}` }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.text}, transparent)`,
          opacity: 0.6,
        }}
      />

      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${c.bg} 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div className="relative z-10 mb-6">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${c.bg}, ${c.bg}88)`,
            border: `1px solid ${c.border}`,
            boxShadow: `0 0 20px ${c.shadow}`,
          }}
        >
          <Icon size={26} style={{ color: c.text }} />
        </motion.div>
      </div>

      {/* Title */}
      <h3
        className="relative z-10 font-display text-xl font-bold mb-3"
        style={{ color: c.text, textShadow: `0 0 20px ${c.glow}` }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="relative z-10 font-body text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Features list */}
      <ul className="relative z-10 space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            <CheckCircle2 size={14} style={{ color: c.text, flexShrink: 0 }} />
            <span className="font-body text-sm text-slate-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Bottom index number */}
      <div
        className="absolute bottom-4 right-5 font-display text-5xl font-bold pointer-events-none select-none"
        style={{ color: c.text, opacity: 0.04 }}
      >
        0{index + 1}
      </div>
    </motion.div>
  );
};

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative section-padding overflow-hidden"
    >
      {/* Background accents */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "#0066ff", opacity: 0.03 }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "#00ff88", opacity: 0.03 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#00ff8840" }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: "#00ff88" }}>
              WHAT I OFFER
            </span>
            <div className="w-8 h-px" style={{ background: "#00ff8840" }} />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            My <span className="gradient-text">Services</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-slate-400 max-w-xl mx-auto text-base sm:text-lg"
          >
            End-to-end solutions from concept to deployment, built with precision and care.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid #00ff8833",
            boxShadow: "0 0 40px #00ff8811",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, #00ff8808, transparent 70%)" }}
          />

          <div className="relative z-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Have a project in mind?
            </h3>
            <p className="font-body text-slate-400 text-sm sm:text-base mb-6 max-w-lg mx-auto">
              Let's collaborate and build something extraordinary together. I'm available for
              freelance projects, full-time roles, and consulting engagements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 rounded font-body font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "#ffffff",
                  boxShadow: "0 0 20px #ffffff33",
                  color: "#000000",
                }}
              >
                Start a Project
              </button>
              <button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 rounded font-body font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "transparent",
                  border: "1px solid #00ff8844",
                  color: "#00ff88",
                  boxShadow: "0 0 15px #00ff8822",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#00ff8811";
                  e.currentTarget.style.boxShadow = "0 0 25px #00ff8844";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "0 0 15px #00ff8822";
                }}
              >
                View My Work
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
