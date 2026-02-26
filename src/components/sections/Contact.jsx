import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Loader,
} from "lucide-react";
import { personalInfo } from "../../data/portfolioData";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const MarqueeText = () => {
  const words = [
    "LET'S WORK TOGETHER",
    "·",
    "AVAILABLE FOR HIRE",
    "·",
    "OPEN TO OPPORTUNITIES",
    "·",
    "LET'S BUILD SOMETHING GREAT",
    "·",
    "GET IN TOUCH",
    "·",
    "TURNING IDEAS INTO REALITY",
    "·",
  ];

  const repeated = [...words, ...words];

  return (
    <div
      className="w-full overflow-hidden py-6 mb-16"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((word, i) => (
          <span
            key={i}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold whitespace-nowrap flex-shrink-0"
            style={{
              color: word === "·"
                ? "#00ff88"
                : i % 8 === 0 || i % 8 === 4
                ? "#ffffff"
                : "rgba(255,255,255,0.15)",
              textShadow: word === "·" ? "0 0 12px #00ff88" : "none",
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const errs = validate();
  if (Object.keys(errs).length) { setErrors(errs); return; }
  setStatus("loading");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "58da7f80-848a-44c1-a64a-a6d7562e29de",
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    setStatus("idle");
    alert("Something went wrong. Please try again.");
  }
};

  const socials = [
    { Icon: Github,   href: personalInfo.github,   label: "GitHub",   color: "#00ff88" },
    { Icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn", color: "#0066ff" },
  ];

  const info = [
    { Icon: Mail,   label: "Email",    value: personalInfo.email,    color: "#00ff88" },
    { Icon: MapPin, label: "Location", value: personalInfo.location, color: "#0066ff" },
  ];

  const inputClass =
    "w-full rounded-lg px-4 py-3 font-body text-sm text-slate-300 placeholder-slate-600 focus:outline-none transition-all duration-200";

  const baseInputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000000 0%, #050510 50%, #000000 100%)" }}
    >
      {/* Background glow orbs */}
      <div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "#00ff88", opacity: 0.03 }}
      />
      <div
        className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
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
            <div className="w-8 h-px" style={{ background: "#00ff8840" }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: "#00ff88" }}>
              GET IN TOUCH
            </span>
            <div className="w-8 h-px" style={{ background: "#00ff8840" }} />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Contact <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-slate-400 max-w-xl mx-auto text-base sm:text-lg"
          >
            Have a project in mind or want to collaborate? I would love to hear from you.
          </motion.p>
        </motion.div>

        {/* Moving marquee text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MarqueeText />
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Intro card */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid #00ff8833",
                boxShadow: "0 0 20px #00ff8811",
              }}
            >
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Let's build something{" "}
                <span style={{ color: "#00ff88", textShadow: "0 0 10px #00ff8866" }}>
                  great
                </span>
              </h3>
              <p className="font-body text-slate-400 text-sm leading-relaxed">
                I am currently available for freelance work, full-time positions, and exciting
                collaborations. Response time is typically within 24 hours.
              </p>
            </div>

            {/* Contact info rows */}
            <div className="space-y-3">
              {info.map(({ Icon, label, value, color }) => (
                <div
                  key={label}
                  className="rounded-xl p-4 flex items-center gap-4 transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${color}22`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: color + "15", border: `1px solid ${color}33` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-slate-500">{label}</div>
                    <div className="font-body text-sm text-slate-300">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <div className="font-mono text-xs text-slate-500 tracking-widest mb-3">
                FIND ME ON
              </div>
              <div className="flex items-center gap-3">
                {socials.map(({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-sm text-slate-400 transition-all duration-200 hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${color}22`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.borderColor = color + "66";
                      e.currentTarget.style.boxShadow = `0 0 15px ${color}33`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "";
                      e.currentTarget.style.borderColor = color + "22";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid #00ff8833",
                boxShadow: "0 0 15px #00ff8811",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse"
                style={{ background: "#00ff88", boxShadow: "0 0 8px #00ff88" }}
              />
              <div>
                <div className="font-mono text-xs" style={{ color: "#00ff88" }}>
                  Available for work
                </div>
                <div className="font-body text-xs text-slate-500 mt-0.5">
                  Open to remote and on-site opportunities worldwide
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid #0066ff33",
                boxShadow: "0 0 20px #0066ff11",
              }}
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{
                        background: "#00ff8815",
                        border: "2px solid #00ff8844",
                        boxShadow: "0 0 30px #00ff8833",
                      }}
                    >
                      <CheckCircle2 size={32} style={{ color: "#00ff88" }} />
                    </motion.div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="font-body text-slate-400 text-sm">
                      Thank you for reaching out. I will get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="font-display text-lg font-bold text-white mb-6">
                      Send a Message
                    </div>

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-xs text-slate-500 tracking-widest mb-1.5 block">
                          YOUR NAME
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Alex Morgan"
                          className={inputClass}
                          style={{
                            ...baseInputStyle,
                            borderColor: errors.name ? "#00ccff66" : "rgba(255,255,255,0.1)",
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#00ff8844"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = errors.name ? "#00ccff66" : "rgba(255,255,255,0.1)"; }}
                        />
                        {errors.name && (
                          <div className="flex items-center gap-1 mt-1 font-mono text-xs" style={{ color: "#00ccff" }}>
                            <AlertCircle size={10} />{errors.name}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="font-mono text-xs text-slate-500 tracking-widest mb-1.5 block">
                          EMAIL ADDRESS
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="alex@example.com"
                          className={inputClass}
                          style={{
                            ...baseInputStyle,
                            borderColor: errors.email ? "#00ccff66" : "rgba(255,255,255,0.1)",
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "#00ff8844"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? "#00ccff66" : "rgba(255,255,255,0.1)"; }}
                        />
                        {errors.email && (
                          <div className="flex items-center gap-1 mt-1 font-mono text-xs" style={{ color: "#00ccff" }}>
                            <AlertCircle size={10} />{errors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="font-mono text-xs text-slate-500 tracking-widest mb-1.5 block">
                        SUBJECT
                      </label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry"
                        className={inputClass}
                        style={{
                          ...baseInputStyle,
                          borderColor: errors.subject ? "#00ccff66" : "rgba(255,255,255,0.1)",
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#00ff8844"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.subject ? "#00ccff66" : "rgba(255,255,255,0.1)"; }}
                      />
                      {errors.subject && (
                        <div className="flex items-center gap-1 mt-1 font-mono text-xs" style={{ color: "#00ccff" }}>
                          <AlertCircle size={10} />{errors.subject}
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="font-mono text-xs text-slate-500 tracking-widest mb-1.5 block">
                        MESSAGE
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        rows={5}
                        className={inputClass + " resize-none"}
                        style={{
                          ...baseInputStyle,
                          borderColor: errors.message ? "#00ccff66" : "rgba(255,255,255,0.1)",
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#00ff8844"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = errors.message ? "#00ccff66" : "rgba(255,255,255,0.1)"; }}
                      />
                      {errors.message && (
                        <div className="flex items-center gap-1 mt-1 font-mono text-xs" style={{ color: "#00ccff" }}>
                          <AlertCircle size={10} />{errors.message}
                        </div>
                      )}
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-body font-semibold text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        background: "#ffffff",
                        boxShadow: "0 0 20px #ffffff33",
                        color: "#000000",
                      }}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
