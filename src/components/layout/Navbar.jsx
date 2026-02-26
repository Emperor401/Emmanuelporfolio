import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About",       href: "#about"       },
  { label: "Skills",      href: "#skills"       },
  { label: "Projects",    href: "#projects"     },
  { label: "Services",    href: "#services"     },
  { label: "Contact",     href: "#contact"      },
];

const Navbar = () => {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeSection,setActiveSection]= useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <span className="font-display text-sm font-bold gradient-text tracking-widest">
              IE
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-2 font-body text-sm font-medium tracking-wide transition-all duration-200 group ${
                    isActive ? "text-neon-cyan" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {/* Underline */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-neon-cyan transition-all duration-300 ${
                      isActive ? "w-full shadow-neon-cyan" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded font-body text-sm font-semibold text-neon-cyan neon-border-cyan hover:bg-neon-cyan/10 transition-all duration-300"
            >
              Hire Me
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded border border-white/10 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/40 transition-all duration-200"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1,  y: 0   }}
            exit={{    opacity: 0,  y: -20  }}
            transition={{ duration: 0.25 }}
            className="fixed top-[60px] left-0 right-0 z-40 glass border-b border-white/5 px-4 py-4 lg:hidden"
          >
            <div className="flex flex-col gap-1 max-w-7xl mx-auto">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1,  x: 0  }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left px-4 py-3 rounded font-body text-sm font-medium tracking-wide transition-all duration-200 ${
                    activeSection === link.href.replace("#", "")
                      ? "text-neon-cyan bg-neon-cyan/5 neon-border-cyan"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="font-mono text-neon-cyan/40 text-xs mr-2">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {link.label}
                </motion.button>
              ))}

              <div className="mt-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full py-3 rounded font-body text-sm font-semibold text-neon-cyan neon-border-cyan hover:bg-neon-cyan/10 transition-all duration-300"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;