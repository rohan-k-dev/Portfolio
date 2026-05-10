import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ElectricProjectCard = ({
  title,
  description,
  image,
  tags = [],
  liveLink,
  githubLink,
  featured = false,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const animationRef = useRef(null);

  // Track mouse position for spotlight effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Electric border animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    let startTime = Date.now();
    const duration = 5000; // 5 seconds (speed: 1.2)
    const points = [];
    const numPoints = 50;

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

      // Update points with chaos (0.12)
      points.forEach((point, i) => {
        const offset = Math.sin(progress * Math.PI * 2 + i * 0.5) * 0.12 * 3;

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

      // Cyan neon glow (#64ffda)
      const glowIntensity = isHovered ? 1 : 0.7;
      ctx.shadowBlur = 10 * glowIntensity;
      ctx.shadowColor = "rgba(100, 255, 218, 0.6)";
      ctx.strokeStyle = "rgba(100, 255, 218, 0.6)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Inner glow
      ctx.shadowBlur = 5 * glowIntensity;
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
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative group ${className}`}
    >
      {/* Electric Border Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none rounded-2xl z-10"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Spotlight Glow Effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.15 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none rounded-2xl z-[5]"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 255, 218, 0.15), transparent 40%)`,
        }}
      />

      {/* Outer Cinematic Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-emerald-500/30 to-cyan-500/30 rounded-2xl blur-xl pointer-events-none z-0"
      />

      {/* Card Container */}
      <div className="relative rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden z-[1]">
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

        {/* Featured Badge */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-4 z-20"
          >
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30 backdrop-blur-sm">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Featured
              </span>
            </div>
          </motion.div>
        )}

        {/* Project Image */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-cyan-900/30 via-emerald-900/20 to-cyan-900/30 flex items-center justify-center">
                <div className="text-6xl opacity-20">🚀</div>
              </div>
            )}
          </motion.div>

          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />

          {/* Animated Gradient Accent */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.3 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/20"
          />
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-4">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-cyan-300 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Tech Stack Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  className="px-3 py-1 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-cyan-300 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {liveLink && (
              <motion.a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-cyan-500/25"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Live Demo</span>
              </motion.a>
            )}

            {githubLink && (
              <motion.a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-gray-300 text-sm font-medium rounded-lg hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Code</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Bottom Glow Accent */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.2 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
      </div>

      {/* Floating Effect Shadow */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -bottom-4 left-4 right-4 h-8 bg-cyan-500/20 blur-2xl rounded-full pointer-events-none"
      />
    </motion.div>
  );
};

export default ElectricProjectCard;
