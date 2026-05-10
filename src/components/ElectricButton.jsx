import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ElectricButton = ({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Variant styles
  const variants = {
    primary: {
      base: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
      hover: "from-cyan-400 to-blue-400",
      glow: "rgba(125, 249, 255, 0.4)",
    },
    secondary: {
      base: "bg-white/5 border border-white/10 text-white backdrop-blur-sm",
      hover: "bg-white/10 border-white/20",
      glow: "rgba(125, 249, 255, 0.3)",
    },
  };

  const currentVariant = variants[variant];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    let startTime = Date.now();
    const duration = 4000; // 4 seconds for smooth animation
    const points = [];
    const numPoints = 40;

    // Initialize points around the border
    for (let i = 0; i < numPoints; i++) {
      const progress = i / numPoints;
      const perimeter = 2 * (canvas.width + canvas.height);
      const distance = progress * perimeter;

      let x, y;
      if (distance < canvas.width) {
        x = distance;
        y = 0;
      } else if (distance < canvas.width + canvas.height) {
        x = canvas.width;
        y = distance - canvas.width;
      } else if (distance < 2 * canvas.width + canvas.height) {
        x = canvas.width - (distance - canvas.width - canvas.height);
        y = canvas.height;
      } else {
        x = 0;
        y = canvas.height - (distance - 2 * canvas.width - canvas.height);
      }

      points.push({ x, y, baseX: x, baseY: y });
    }

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % duration) / duration;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points with minimal chaos (0.08)
      points.forEach((point, i) => {
        const offset = Math.sin(progress * Math.PI * 2 + i * 0.5) * 0.08 * 3;

        if (point.baseY === 0 || point.baseY === canvas.height) {
          point.y = point.baseY + offset;
        } else {
          point.x = point.baseX + offset;
        }
      });

      // Draw the electric border
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();

      // Subtle glow effect
      const glowIntensity = isHovered ? 1 : 0.6;
      ctx.shadowBlur = 8 * glowIntensity;
      ctx.shadowColor = currentVariant.glow;
      ctx.strokeStyle = currentVariant.glow;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner subtle glow
      ctx.shadowBlur = 4 * glowIntensity;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, currentVariant.glow]);

  const buttonContent = (
    <motion.button
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.02,
        y: -2,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group
        px-8 py-3.5 
        rounded-xl
        font-semibold text-sm md:text-base
        ${currentVariant.base}
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        overflow-hidden
        ${className}
      `}
    >
      {/* Electric Border Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Outer Glow on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-xl blur-lg pointer-events-none"
      />

      {/* Inner Shimmer Effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Elegant Shadow */}
      <div
        className={`
          absolute inset-0 rounded-xl
          shadow-lg shadow-cyan-500/0
          group-hover:shadow-cyan-500/20
          transition-shadow duration-300
          pointer-events-none
        `}
      />
    </motion.button>
  );

  // If href is provided, wrap in anchor tag
  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

// Preset Components
export const PrimaryCTA = (props) => (
  <ElectricButton variant="primary" {...props} />
);

export const SecondaryCTA = (props) => (
  <ElectricButton variant="secondary" {...props} />
);

export default ElectricButton;
