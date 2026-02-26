import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const row1 = [
  "Clean Code", "React.js", "Node.js", "Responsive Design",
  "TypeScript", "Modern UI", "REST APIs", "Tailwind CSS",
  "Performance", "Express.js", "JavaScript", "Problem Solving",
];

const row2 = [
  "Pixel Perfect", "Fast Delivery", "Bootstrap", "Creative Thinking",
  "HTML & CSS", "Team Player", "Attention to Detail", "Web Development",
  "Open to Work", "Full Stack", "Always Learning", "Passionate Developer",
];

const MarqueeRow = ({ items, direction = "left", color }) => {
  const duplicated = [...items, ...items];

  return (
    <div className="overflow-hidden w-full py-3">
      <motion.div
        className="flex gap-4 w-max"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicated.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full whitespace-nowrap font-mono text-sm font-medium flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${color}33`,
              color: i % 3 === 0 ? color : "#94a3b8",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: color,
                boxShadow: `0 0 6px ${color}`,
              }}
            />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)" }}
    >
      {/* Background accents */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-40 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "#00ff88", opacity: 0.03 }}
      />

      {/* Left and right fade masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #000000, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, #000000, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "#00ff8840" }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: "#00ff88" }}>
              WHAT I DO
            </span>
            <div className="w-8 h-px" style={{ background: "#00ff8840" }} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Skills & <span className="gradient-text">Values</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <MarqueeRow items={row1} direction="left"  color="#00ff88" />
        <MarqueeRow items={row2} direction="right" color="#0066ff" />
      </motion.div>
    </section>
  );
};

export default Testimonials;