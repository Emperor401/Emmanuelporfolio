/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#000000",
          900: "#050505",
          800: "#0a0a0f",
          700: "#0d0d1a",
        },
        neon: {
          cyan:    "#00ff88",
          blue:    "#0066ff",
          violet:  "#0044cc",
          magenta: "#00ccff",
          green:   "#00ff66",
        },
      },
      fontFamily: {
        display: ["'Orbitron'", "sans-serif"],
        body:    ["'Rajdhani'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        "neon-cyan":    "0 0 20px #00ff8855, 0 0 40px #00ff8822",
        "neon-blue":    "0 0 20px #0066ff55, 0 0 40px #0066ff22",
        "neon-violet":  "0 0 20px #0044cc55, 0 0 40px #0044cc22",
        "neon-magenta": "0 0 20px #00ccff55, 0 0 40px #00ccff22",
        "glass":        "0 8px 32px rgba(0,0,0,0.6)",
      },
      animation: {
        "pulse-slow":    "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":         "float 6s ease-in-out infinite",
        "glow-pulse":    "glowPulse 2s ease-in-out infinite",
        "spin-slow":     "spin 20s linear infinite",
        "gradient-move": "gradientMove 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.5" },
        },
        gradientMove: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%":     { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};