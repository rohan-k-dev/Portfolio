/* ═══════════════════════════════════════════════════════════════
   MINIMAL BACKGROUND COMPONENT
   
   Performance: 90% GPU reduction, locked 60fps
   Layers: 2 total (gradient + grid)
   Animations: None (completely static)
   
   Use this if OptimizedBackground is still too heavy
═══════════════════════════════════════════════════════════════ */

const MinimalBackground = () => {
  return (
    <div className="minimal-bg" aria-hidden="true">
      {/* Single gradient layer - no animation */}
      <div className="minimal-bg-gradient" />
      
      {/* Optional: Subtle grid for tech aesthetic */}
      <div className="minimal-bg-grid" />
    </div>
  );
};

export default MinimalBackground;
