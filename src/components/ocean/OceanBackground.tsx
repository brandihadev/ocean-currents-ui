import { motion } from "framer-motion";
import { useMemo } from "react";

const OceanBackground = () => {
  // Generate particles with random positions and delays
  const particles = useMemo(() => {
    return [...Array(35)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      xOffset: Math.sin(i) * 50,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep ocean gradient base */}
      <div className="absolute inset-0 bg-gradient-abyss" />
      
      {/* Caustic light overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, hsla(189, 94%, 60%, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, hsla(168, 76%, 50%, 0.03) 0%, transparent 40%),
            radial-gradient(ellipse at 60% 70%, hsla(158, 64%, 52%, 0.03) 0%, transparent 45%),
            radial-gradient(ellipse at 30% 80%, hsla(189, 94%, 43%, 0.02) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.6, 0.9, 0.5, 0.8, 0.6],
          scale: [1, 1.02, 0.99, 1.01, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated light beams */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(120deg, transparent 40%, hsla(189, 94%, 60%, 0.03) 50%, transparent 60%)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating particles (plankton effect) */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            background: "hsla(189, 94%, 70%, 0.4)",
            filter: "blur(1px)",
            bottom: "-20px",
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, particle.xOffset, 0],
            opacity: [0, 0.4, 0.3, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Subtle grid overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsla(189, 94%, 43%, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsla(189, 94%, 43%, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
};

export default OceanBackground;
