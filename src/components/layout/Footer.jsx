import { Github, Linkedin, ArrowUp, Heart, Mail, MapPin } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";

const navLinks = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact"  },
];

const socials = [
  { Icon: Github,   href: personalInfo.github,   label: "GitHub",   color: "#00ff88" },
  { Icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn", color: "#0066ff" },
];

const Footer = () => {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#000000", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #00ff8844, #0066ff44, transparent)" }}
      />

      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full blur-[80px] pointer-events-none"
        style={{ background: "#00ff88", opacity: 0.03 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Name only - no icon */}
            <div className="mb-4">
              <span className="font-display text-base font-bold gradient-text tracking-widest">
                {personalInfo.name}
              </span>
            </div>

            {/* Bio */}
            <p className="font-body text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Frontend developer crafting high-performance web experiences with modern
              technologies and futuristic design.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.borderColor = color + "66";
                    e.currentTarget.style.boxShadow = `0 0 15px ${color}33`;
                    e.currentTarget.style.background = color + "11";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <div className="font-mono text-xs tracking-widest mb-4" style={{ color: "#00ff8888" }}>
              QUICK LINKS
            </div>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-sm text-slate-400 transition-all duration-200 flex items-center gap-2 group hover:text-white"
                  >
                    <span
                      className="w-0 group-hover:w-3 h-px transition-all duration-200"
                      style={{ background: "#00ff88" }}
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <div className="font-mono text-xs tracking-widest mb-4" style={{ color: "#0066ff88" }}>
              CONTACT
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "#00ff8811", border: "1px solid #00ff8822" }}
                >
                  <Mail size={13} style={{ color: "#00ff88" }} />
                </div>
                <div>
                  <div className="font-mono text-xs text-slate-600 mb-0.5">Email</div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-body text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "#0066ff11", border: "1px solid #0066ff22" }}
                >
                  <MapPin size={13} style={{ color: "#0066ff" }} />
                </div>
                <div>
                  <div className="font-mono text-xs text-slate-600 mb-0.5">Location</div>
                  <div className="font-body text-sm text-slate-400">{personalInfo.location}</div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }}
                />
                <span className="font-mono text-xs" style={{ color: "#00ff88" }}>
                  Available for work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 font-body text-xs text-slate-500">
            <span>Built with</span>
            <Heart size={11} style={{ color: "#00ff88" }} />
            <span>by</span>
            <span className="font-semibold" style={{ color: "#00ff88" }}>
              {personalInfo.name}
            </span>
            <span>— {new Date().getFullYear()}</span>
          </div>

          {/* <div className="font-mono text-xs text-slate-600">
            React · Tailwind · Framer Motion
          </div> */}

          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 transition-all duration-200 hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#00ff88";
              e.currentTarget.style.borderColor = "#00ff8844";
              e.currentTarget.style.boxShadow = "0 0 12px #00ff8833";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
