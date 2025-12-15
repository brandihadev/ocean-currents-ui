import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Wave {
  id: number;
  x: number;
  y: number;
}

const CursorWave = () => {
  const [waves, setWaves] = useState<Wave[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    // Calculate velocity
    const dx = newX - mousePos.x;
    const dy = newY - mousePos.y;
    const velocity = Math.sqrt(dx * dx + dy * dy);

    setMousePos({ x: newX, y: newY });
    setIsMoving(velocity > 5);

    // Create wave on significant movement
    if (velocity > 15) {
      const newWave: Wave = {
        id: Date.now() + Math.random(),
        x: newX,
        y: newY,
      };
      setWaves((prev) => [...prev.slice(-5), newWave]);
    }
  }, [mousePos.x, mousePos.y]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Clean up old waves
  useEffect(() => {
    const interval = setInterval(() => {
      setWaves((prev) => prev.filter((wave) => Date.now() - wave.id < 1500));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Cursor glow */}
      <motion.div
        className="absolute w-8 h-8 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsla(189, 94%, 60%, 0.3) 0%, transparent 70%)",
          x: mousePos.x - 16,
          y: mousePos.y - 16,
        }}
        animate={{
          scale: isMoving ? 1.5 : 1,
          opacity: isMoving ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Cursor trail */}
      <motion.div
        className="absolute w-4 h-4 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsla(189, 94%, 70%, 0.5) 0%, transparent 70%)",
          filter: "blur(2px)",
        }}
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />

      {/* Wave ripples */}
      <AnimatePresence>
        {waves.map((wave) => (
          <motion.div
            key={wave.id}
            className="absolute rounded-full border border-primary/40 pointer-events-none"
            style={{
              left: wave.x,
              top: wave.y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorWave;
