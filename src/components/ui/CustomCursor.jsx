import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX - 18) * 0.12;
      ringY += (mouseY - ringY - 18) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "#ff00c888";
      dot.style.background = "#ff00c8";
      dot.style.boxShadow = "0 0 10px #ff00c8, 0 0 20px #ff00c8";
    };

    const onMouseLeaveLink = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "#00f5ff66";
      dot.style.background = "#00f5ff";
      dot.style.boxShadow = "0 0 10px #00f5ff, 0 0 20px #00f5ff";
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    const addListeners = () => {
      const links = document.querySelectorAll("a, button, [data-cursor]");
      links.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
