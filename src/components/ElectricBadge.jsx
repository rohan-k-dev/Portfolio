import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const ElectricBadge = ({ children, className = "" }) => {
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
    const duration = 10000; // Very slow (10 seconds)
    const points = [];
    const numPoints = 25; // Minimal points

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

      // Update points with minimal chaos (0.02)
      points.forEach((point, i) => {
        const offset = Math.sin(progress * Math.PI * 2 + i * 0.5) * 0.02 * 3;

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

      // Very subtle muted cyan glow
      ctx.shadowBlur = 3;
      ctx.shadowColor = "rgba(6, 182, 212, 0.2)";
      ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative inline-flex ${className}`}
    >
      {/* Electric Border Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Subtle Premium Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 via-cyan-400/5 to-cyan-500/10 rounded-full blur-sm pointer-events-none" />

      {/* Badge Container */}
      <div className="relative flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-950/30 via-blue-950/20 to-cyan-950/30 border border-cyan-500/15 backdrop-blur-md">
        {/* Glowing Dot with Pulse */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          {/* Pulse Ring */}
          <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-cyan-400/30" style={{ animationDuration: '2.5s' }} />
          
          {/* Core Dot */}
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
        </div>

        {/* Text Content */}
        <span className="text-[11px] sm:text-xs font-medium tracking-[0.12em] uppercase text-cyan-100/80 whitespace-nowrap">
          {children}
        </span>
      </div>

      {/* Bottom Subtle Glow */}
      <div className="absolute -bottom-1 left-1/4 right-1/4 h-2 bg-cyan-500/10 blur-md rounded-full pointer-events-none" />
    </motion.div>
  );
};

export default ElectricBadge;
