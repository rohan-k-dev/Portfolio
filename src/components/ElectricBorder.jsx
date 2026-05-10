import { useEffect, useRef } from "react";

const ElectricBorder = ({
  containerClassName = "",
  borderClassName = "",
  duration = 4000,
  glowColor = "rgba(6, 182, 212, 0.6)",
  chaos = 0.3,
  thickness = 1,
}) => {
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

      // Update points with chaos
      points.forEach((point, i) => {
        const offset = Math.sin(progress * Math.PI * 2 + i * 0.5) * chaos * 3;
        
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

      // Glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = glowColor;
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = thickness;
      ctx.stroke();

      // Inner glow
      ctx.shadowBlur = 5;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration, glowColor, chaos, thickness]);

  return (
    <div className={`relative ${containerClassName}`}>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 pointer-events-none ${borderClassName}`}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ElectricBorder;
