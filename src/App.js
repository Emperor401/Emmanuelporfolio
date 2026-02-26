import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import CustomCursor from "./components/ui/CustomCursor";
import LoadingScreen from "./components/ui/LoadingScreen";
import ParticleBackground from "./components/ui/ParticleBackground";
import ChatBot from "./components/ui/ChatBot";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Services from "./components/sections/Services";
import Contact from "./components/sections/Contact";

function App() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const handleLoadComplete = () => {
    setLoading(false);
    setTimeout(() => setReady(true), 100);
  };

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <AnimatePresence>
        {ready && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-screen"
            style={{ background: "#000000" }}
          >
            <ParticleBackground />
            <Navbar />

            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Services />
              <Contact />
            </main>

            <Footer />
            <ChatBot />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;