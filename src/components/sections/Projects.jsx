import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Code2, Layers, Cpu, Globe } from "lucide-react";
import { projects } from "../../data/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const categoryColors = {
  fullstack: { text: "#00ff88", border: "#00ff8833", bg: "#00ff880a", label: "Full Stack" },
  frontend:  { text: "#0066ff", border: "#0066ff33", bg: "#0066ff0a", label: "Frontend"   },
  backend:   { text: "#00ccff", border: "#00ccff33", bg: "#00ccff0a", label: "Backend"    },
  ai:        { text: "#00ff66", border: "#00ff6633", bg: "#00ff660a", label: "AI / ML"    },
};

const categoryIcons = {
  fullstack: Layers,
  frontend:  Globe,
  backend:   Code2,
  ai:        Cpu,
};


const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  const c = categoryColors[project.category] || categoryColors.fullstack;
  const Icon = categoryIcons[project.category] || Code2;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.9)" }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-2xl rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${c.border}`,
            boxShadow: `0 0 60px ${c.bg}`,
            backdropFilter: "blur(20px)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <X size={16} />
          </button>

          {/* Project image */}
          <div
            className="w-full h-48 rounded-xl mb-6 overflow-hidden flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${c.bg}, rgba(0,0,0,0.5))`,
              border: `1px solid ${c.border}`,
            }}
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon size={48} style={{ color: c.text, opacity: 0.4 }} />
            )}
          </div>

          {/* Category badge */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full font-mono text-xs"
              style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
            >
              {c.label}
            </span>
            {project.featured && (
              <span
                className="px-3 py-1 rounded-full font-mono text-xs"
                style={{ background: "#00ff880a", border: "1px solid #00ff8830", color: "#00ff88" }}
              >
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl font-bold text-white mb-3">{project.title}</h3>

          {/* Description */}
          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            {project.longDescription || project.description}
          </p>

          {/* Tech stack */}
          <div className="mb-6">
            <div className="font-mono text-xs text-slate-500 mb-3 tracking-widest">TECH STACK</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded font-mono text-xs"
                  style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded font-body font-semibold text-sm text-white border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200"
            >
              <Github size={16} />
              View Code
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded font-body font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${c.text}, ${c.text}88)`,
                color: "#000000",
              }}
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectCard = ({ project, onOpen }) => {
  const c = categoryColors[project.category] || categoryColors.fullstack;
  const Icon = categoryIcons[project.category] || Code2;

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${c.border}`,
        backdropFilter: "blur(16px)",
      }}
      whileHover={{ boxShadow: `0 0 40px ${c.bg}` }}
      onClick={() => onOpen(project)}
    >
      {/* Image area */}
      <div className="w-full h-44 relative overflow-hidden">
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay on hover */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `rgba(0,0,0,0.7)` }}
            >
              <span className="font-mono text-xs tracking-widest" style={{ color: c.text }}>
                VIEW DETAILS
              </span>
            </div>
          </>
        ) : (
          <>
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${c.bg}, rgba(0,0,0,0.5))` }}
            >
              <Icon size={56} style={{ color: c.text, opacity: 0.25 }} />
            </div>
            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `${c.bg}cc` }}
            >
              <span className="font-mono text-xs tracking-widest" style={{ color: c.text }}>
                VIEW DETAILS
              </span>
            </div>
          </>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 right-3 px-2 py-0.5 rounded font-mono text-xs"
            style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
          >
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3
            className="font-display text-lg font-bold text-white transition-colors duration-200"
            style={{ color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
          >
            {project.title}
          </h3>
          <span
            className="px-2 py-0.5 rounded font-mono text-xs ml-2 flex-shrink-0"
            style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
          >
            {c.label}
          </span>
        </div>

        <p className="font-body text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded font-mono text-xs text-slate-400"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 rounded font-mono text-xs text-slate-500">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 font-mono text-xs text-slate-400 hover:text-white transition-colors duration-200"
          >
            <Github size={14} />
            Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
            style={{ color: c.text }}
          >
            <ExternalLink size={14} />
            Demo
          </a>
          <button
            className="ml-auto font-mono text-xs text-slate-500 hover:text-white transition-colors duration-200"
            onClick={(e) => { e.stopPropagation(); onOpen(project); }}
          >
            Details →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)" }}
    >
      {/* Background accents */}
      <div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "#00ff88", opacity: 0.03 }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "#0066ff", opacity: 0.03 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#0066ff40" }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: "#0066ff" }}>
              WHAT I BUILT
            </span>
            <div className="w-8 h-px" style={{ background: "#0066ff40" }} />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-slate-400 max-w-xl mx-auto text-base sm:text-lg"
          >
            A selection of projects that showcase my technical range and design sensibility.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map((f) => {
            const isActive = activeFilter === f;
            const c = f === "all" ? null : categoryColors[f];
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-2 rounded-lg font-mono text-xs tracking-widest transition-all duration-200"
                style={
                  isActive
                    ? {
                        background: c ? c.bg : "#00ff880a",
                        border: `1px solid ${c ? c.text + "66" : "#00ff8866"}`,
                        color: c ? c.text : "#00ff88",
                        boxShadow: `0 0 15px ${c ? c.bg : "#00ff880a"}`,
                      }
                    : {
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#94a3b8",
                      }
                }
              >
                {f === "all" ? "ALL" : categoryColors[f]?.label?.toUpperCase() || f.toUpperCase()}
              </button>
            );
          })}
        </motion.div> */}

        {/* Projects grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="font-mono text-slate-500 text-sm">
              No projects found in this category.
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
