import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ElectricSkillPill = ({
  icon,
  label,
  delay = 0,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    let startTime = Date.now();
    const duration = 8000; // Very slow (speed: 0.5)
    const points = [];
    const numPoints = 30; // Fewer points for subtlety

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

      // Update points with minimal chaos (0.03)
      points.forEach((point, i) => {
        const offset = Math.sin(progress * Math.PI * 2 + i * 0.5) * 0.03 * 3;

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

      // Very subtle cyan glow
      const glowIntensity = isHovered ? 0.4 : 0.2;
      ctx.shadowBlur = 4 * glowIntensity;
      ctx.shadowColor = `rgba(6, 182, 212, ${0.3 * glowIntensity})`;
      ctx.strokeStyle = `rgba(6, 182, 212, ${0.3 * glowIntensity})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.03,
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative group ${className}`}
    >
      {/* Electric Border Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none rounded-xl z-10"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Tiny Elegant Glow on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-0.5 bg-cyan-500/20 rounded-xl blur-sm pointer-events-none z-0"
      />

      {/* Pill Content */}
      <div className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 group-hover:border-cyan-500/20 transition-all duration-300 z-[1]">
        {/* Icon */}
        {icon && (
          <motion.span
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="text-lg leading-none"
          >
            {icon}
          </motion.span>
        )}

        {/* Label */}
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
          {label}
        </span>
      </div>

      {/* Subtle Floating Shadow */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.2 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -bottom-1 left-2 right-2 h-2 bg-cyan-500/30 blur-md rounded-full pointer-events-none"
      />
    </motion.div>
  );
};

export default ElectricSkillPill;
