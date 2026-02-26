import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Clock, Tag, X, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "../../data/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardColors = [
  { text: "#00f5ff", border: "#00f5ff33", bg: "#00f5ff0a", glow: "#00f5ff22" },
  { text: "#8b00ff", border: "#8b00ff33", bg: "#8b00ff0a", glow: "#8b00ff22" },
  { text: "#0080ff", border: "#0080ff33", bg: "#0080ff0a", glow: "#0080ff22" },
];

const BlogModal = ({ post, onClose }) => {
  if (!post) return null;
  const c = cardColors[post.id % cardColors.length];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-2xl glass rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
          style={{ border: `1px solid ${c.border}`, boxShadow: `0 0 60px ${c.glow}` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200"
          >
            <X size={16} />
          </button>

          {/* Category + date */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs"
              style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
            >
              <Tag size={10} />
              {post.category}
            </span>
            <span className="font-mono text-xs text-slate-500">{post.date}</span>
            <span className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
              <Clock size={10} />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
            {post.title}
          </h3>

          {/* Divider */}
          <div
            className="w-full h-px mb-6"
            style={{ background: `linear-gradient(90deg, ${c.text}44, transparent)` }}
          />

          {/* Excerpt */}
          <p className="font-body text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Mock content */}
          <div className="space-y-4">
            {[
              "Modern web development demands a thoughtful approach to architecture, performance, and developer experience. In this article, we explore the patterns and practices that separate good code from great code.",
              "From component design patterns to state management strategies, the decisions you make early in a project have lasting consequences. Understanding the trade-offs helps you choose the right approach for your specific context.",
              "Performance optimization is not just about speed — it is about delivering a seamless experience that keeps users engaged. We dive deep into profiling, lazy loading, and smart caching strategies.",
            ].map((para, i) => (
              <p key={i} className="font-body text-slate-400 text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Read more CTA */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded font-body font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${c.text}, ${c.text}88)`,
                color: "#020818",
                boxShadow: `0 0 16px ${c.glow}`,
              }}
            >
              Read Full Article
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const BlogCard = ({ post, onOpen }) => {
  const c = cardColors[(post.id - 1) % cardColors.length];

  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300"
      style={{ border: `1px solid ${c.border}` }}
      whileHover={{ boxShadow: `0 0 40px ${c.glow}` }}
      onClick={() => onOpen(post)}
    >
      {/* Top color bar */}
      <div
        className="w-full h-1"
        style={{ background: `linear-gradient(90deg, ${c.text}, ${c.text}44)` }}
      />

      {/* Image placeholder */}
      <div
        className="w-full h-40 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${c.bg}, #0a162888)` }}
      >
        <BookOpen size={40} style={{ color: c.text, opacity: 0.2 }} />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${c.bg}cc` }}
        >
          <span className="font-mono text-xs tracking-widest" style={{ color: c.text }}>
            READ ARTICLE
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-xs"
            style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
          >
            <Tag size={10} />
            {post.category}
          </span>
          <span className="font-mono text-xs text-slate-500">{post.date}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="font-body text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
            <Clock size={12} />
            {post.readTime}
          </div>
          <button
            className="flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
            style={{ color: c.text }}
          >
            Read more
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section
      id="blog"
      ref={ref}
      className="relative section-padding bg-navy-950 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent" />
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-neon-violet opacity-[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-neon-blue opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-neon-blue/40" />
            <span className="font-mono text-xs text-neon-blue tracking-widest">LATEST POSTS</span>
            <div className="w-8 h-px bg-neon-blue/40" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            From the <span className="gradient-text">Blog</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-slate-400 max-w-xl mx-auto text-base sm:text-lg"
          >
            Thoughts, tutorials, and insights on modern web development and technology.
          </motion.p>
        </motion.div>

        {/* Blog grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} onOpen={setSelectedPost} />
          ))}
        </motion.div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <button className="flex items-center gap-2 px-6 py-3 rounded font-body font-semibold text-sm text-neon-cyan neon-border-cyan hover:bg-neon-cyan/10 transition-all duration-300 mx-auto">
            View All Articles
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </section>
  );
};

export default Blog;
