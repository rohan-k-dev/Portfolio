import { useEffect, useRef } from "react";
import "./Lightning.css";

/* ─── tuneable constants ─── */
const CFG = {
  BOLT_COUNT:      5,
  FORK_DEPTH:      4,
  FORK_CHANCE:     0.45,
  FORK_SPREAD:     0.28,
  JITTER:          0.12,
  FADE_SPEED:      0.018,
  SPAWN_INTERVAL:  1800,   // ms between new bolts
  GLOW_BLUR:       18,
  COLORS:          ["#06b6d4", "#38bdf8", "#818cf8", "#a78bfa"],
  ALPHA_MAX:       0.55,
};

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

/* Build a recursive lightning path */
function buildBolt(x1, y1, x2, y2, depth) {
  if (depth === 0) return [{ x1, y1, x2, y2 }];

  const mx = (x1 + x2) / 2 + randomBetween(-1, 1) * CFG.JITTER * Math.abs(x2 - x1);
  const my = (y1 + y2) / 2 + randomBetween(-1, 1) * CFG.JITTER * Math.abs(y2 - y1);

  const segs = [
    ...buildBolt(x1, y1, mx, my, depth - 1),
    ...buildBolt(mx, my, x2, y2, depth - 1),
  ];

  if (Math.random() < CFG.FORK_CHANCE && depth > 1) {
    const forkX = mx + randomBetween(-1, 1) * CFG.FORK_SPREAD * Math.abs(x2 - x1);
    const forkY = my + randomBetween(0.2, 0.8) * (y2 - y1);
    segs.push(...buildBolt(mx, my, forkX, forkY, depth - 2));
  }

  return segs;
}

function spawnBolt(W, H) {
  /* Start from a random top-edge point, end somewhere in lower 60% */
  const x1 = randomBetween(0.1, 0.9) * W;
  const y1 = randomBetween(0, 0.15) * H;
  const x2 = x1 + randomBetween(-0.25, 0.25) * W;
  const y2 = randomBetween(0.4, 0.95) * H;
  const color = CFG.COLORS[Math.floor(Math.random() * CFG.COLORS.length)];

  return {
    segs: buildBolt(x1, y1, x2, y2, CFG.FORK_DEPTH),
    alpha: CFG.ALPHA_MAX,
    color,
    width: randomBetween(0.6, 1.4),
  };
}

const Lightning = ({ opacity = 1 }) => {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ bolts: [], lastSpawn: 0, raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const state = stateRef.current;

    /* Resize handler */
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Draw loop */
    const draw = (ts) => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      /* Spawn new bolt on interval */
      if (ts - state.lastSpawn > CFG.SPAWN_INTERVAL) {
        state.bolts.push(spawnBolt(W, H));
        state.lastSpawn = ts;
      }

      /* Draw & fade each bolt */
      state.bolts = state.bolts.filter((bolt) => bolt.alpha > 0.01);

      for (const bolt of state.bolts) {
        ctx.save();
        ctx.globalAlpha = bolt.alpha;
        ctx.strokeStyle = bolt.color;
        ctx.lineWidth   = bolt.width;
        ctx.shadowColor = bolt.color;
        ctx.shadowBlur  = CFG.GLOW_BLUR;
        ctx.lineCap     = "round";

        ctx.beginPath();
        for (const seg of bolt.segs) {
          ctx.moveTo(seg.x1 * W, seg.y1 * H);
          ctx.lineTo(seg.x2 * W, seg.y2 * H);
        }
        ctx.stroke();

        /* Second pass — bright core */
        ctx.globalAlpha = bolt.alpha * 0.6;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth   = bolt.width * 0.35;
        ctx.shadowBlur  = 4;
        ctx.stroke();

        ctx.restore();
        bolt.alpha -= CFG.FADE_SPEED;
      }

      state.raf = requestAnimationFrame(draw);
    };

    state.raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="lightning-canvas"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};

export default Lightning;
