import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const WaveCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const rippleIdRef = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation for cursor position
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Outer ring with more lag
  const outerSpringConfig = { damping: 20, stiffness: 100, mass: 1 };
  const outerXSpring = useSpring(cursorX, outerSpringConfig);
  const outerYSpring = useSpring(cursorY, outerSpringConfig);

  // Wave trail positions
  const trail1X = useSpring(cursorX, { damping: 30, stiffness: 150, mass: 0.8 });
  const trail1Y = useSpring(cursorY, { damping: 30, stiffness: 150, mass: 0.8 });
  const trail2X = useSpring(cursorX, { damping: 35, stiffness: 100, mass: 1.2 });
  const trail2Y = useSpring(cursorY, { damping: 35, stiffness: 100, mass: 1.2 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('button, a, input, [role="button"]')) {
        setIsHovering(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: rippleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 800);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
      document.removeEventListener("click", handleClick);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Wave trail 2 (furthest) */}
      <motion.div
        className="fixed pointer-events-none z-[9997] rounded-full"
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: "-50%",
          translateY: "-50%",
          width: 60,
          height: 60,
          background: "radial-gradient(circle, hsla(189, 94%, 43%, 0.08) 0%, transparent 70%)",
          opacity: isVisible ? 0.6 : 0,
        }}
      />

      {/* Wave trail 1 */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: "-50%",
          translateY: "-50%",
          width: 40,
          height: 40,
          background: "radial-gradient(circle, hsla(168, 76%, 46%, 0.12) 0%, transparent 70%)",
          opacity: isVisible ? 0.8 : 0,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full border"
        style={{
          x: outerXSpring,
          y: outerYSpring,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "hsla(168, 76%, 46%, 0.4)",
        }}
        animate={{
          width: isHovering ? 50 : 32,
          height: isHovering ? 50 : 32,
          opacity: isVisible ? 1 : 0,
          borderWidth: isHovering ? 2 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[10000] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, hsl(168, 76%, 46%) 0%, hsl(189, 94%, 43%) 100%)",
          boxShadow: "0 0 20px hsla(168, 76%, 46%, 0.6)",
        }}
        animate={{
          width: isHovering ? 10 : 6,
          height: isHovering ? 10 : 6,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9996] rounded-full border border-primary/50"
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 100, height: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Floating particles around cursor */}
      {isVisible && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed pointer-events-none z-[9995] rounded-full bg-primary/30"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
                width: 4,
                height: 4,
              }}
              animate={{
                x: [0, Math.cos(i * 120 * (Math.PI / 180)) * 25],
                y: [0, Math.sin(i * 120 * (Math.PI / 180)) * 25],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}
    </>
  );
};

export default WaveCursor;