/* ═══════════════════════════════════════════════════════════════
   OPTIMIZED MOTION VARIANTS
   
   Minimal Framer Motion usage for critical animations only.
   Use these ONLY for:
   - Hero section reveal (one-time)
   - Section fade-ins (viewport-triggered, once: true)
   - Simple button hovers (no springs)
   
   For everything else, use CSS animations from optimized-animations.css
═══════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────
// ENTRANCE ANIMATIONS (One-time only)
// ─────────────────────────────────────────────────────────────

/**
 * Hero reveal - for hero section entrance
 * Usage: Hero text, buttons, badges
 */
export const heroReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Custom easing curve
    },
  },
};

/**
 * Section fade-in - for viewport-triggered sections
 * Usage: About, Projects, Contact sections
 */
export const sectionFadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Simple fade - for modals, overlays
 * Usage: Modal backdrops, tooltips
 */
export const simpleFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/**
 * Scale in - for cards, images
 * Usage: Project cards, profile images
 */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ─────────────────────────────────────────────────────────────
// STAGGER ANIMATIONS (Use sparingly)
// ─────────────────────────────────────────────────────────────

/**
 * Stagger container - for lists
 * Usage: Skill pills, tech stack items
 * NOTE: Prefer CSS nth-child delays for better performance
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Stagger item - child of staggerContainer
 */
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ─────────────────────────────────────────────────────────────
// HOVER EFFECTS (Minimal usage)
// ─────────────────────────────────────────────────────────────

/**
 * Button hover - for primary CTAs only
 * Usage: "Hire Me", "View Work" buttons
 * NOTE: Prefer CSS :hover for better performance
 */
export const buttonHover = {
  scale: 1.02,
  y: -2,
  transition: {
    duration: 0.2,
    ease: "easeOut",
  },
};

/**
 * Button tap - for active state
 */
export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

/**
 * Card hover - for project cards (use sparingly)
 * NOTE: Prefer CSS :hover for better performance
 */
export const cardHover = {
  y: -6,
  transition: {
    duration: 0.3,
    ease: [0.16, 1, 0.3, 1],
  },
};

// ─────────────────────────────────────────────────────────────
// VIEWPORT CONFIGURATION (Reusable)
// ─────────────────────────────────────────────────────────────

/**
 * Standard viewport config - triggers once when in view
 * Use this for all viewport-triggered animations
 */
export const viewportConfig = {
  once: true, // Only animate once (critical for performance)
  margin: "-50px", // Start animation 50px before element enters viewport
  amount: 0.2, // Trigger when 20% of element is visible
};

/**
 * Viewport config for large sections
 */
export const viewportConfigLarge = {
  once: true,
  margin: "-100px",
  amount: 0.1,
};

// ─────────────────────────────────────────────────────────────
// TRANSITION PRESETS (Reusable)
// ─────────────────────────────────────────────────────────────

/**
 * Smooth transition - for most animations
 */
export const smoothTransition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};

/**
 * Fast transition - for quick interactions
 */
export const fastTransition = {
  duration: 0.3,
  ease: "easeOut",
};

/**
 * Slow transition - for dramatic effects
 */
export const slowTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

// ─────────────────────────────────────────────────────────────
// USAGE EXAMPLES
// ─────────────────────────────────────────────────────────────

/**
 * Example 1: Hero section entrance
 * 
 * <motion.h1
 *   variants={heroReveal}
 *   initial="hidden"
 *   animate="visible"
 * >
 *   Rohan Kumar
 * </motion.h1>
 */

/**
 * Example 2: Section fade-in on scroll
 * 
 * <motion.section
 *   variants={sectionFadeIn}
 *   initial="hidden"
 *   whileInView="visible"
 *   viewport={viewportConfig}
 * >
 *   Content
 * </motion.section>
 */

/**
 * Example 3: Button with hover (use sparingly)
 * 
 * <motion.button
 *   whileHover={buttonHover}
 *   whileTap={buttonTap}
 * >
 *   Click Me
 * </motion.button>
 * 
 * NOTE: Prefer CSS hover for better performance:
 * <button className="btn-hover">Click Me</button>
 */

/**
 * Example 4: Staggered list (use sparingly)
 * 
 * <motion.div
 *   variants={staggerContainer}
 *   initial="hidden"
 *   whileInView="visible"
 *   viewport={viewportConfig}
 * >
 *   {items.map(item => (
 *     <motion.div key={item.id} variants={staggerItem}>
 *       {item.name}
 *     </motion.div>
 *   ))}
 * </motion.div>
 * 
 * NOTE: Prefer CSS nth-child delays for better performance
 */

// ─────────────────────────────────────────────────────────────
// PERFORMANCE GUIDELINES
// ─────────────────────────────────────────────────────────────

/**
 * ✅ DO:
 * - Use Framer Motion for one-time entrance animations
 * - Use viewport={{ once: true }} to prevent re-triggers
 * - Use margin: "-50px" to start animations earlier
 * - Animate only transform and opacity (GPU-accelerated)
 * - Keep duration between 0.3s - 0.6s
 * 
 * ❌ DON'T:
 * - Use useSpring or useTransform (heavy)
 * - Use layoutId or layout animations (causes reflows)
 * - Use AnimatePresence for simple show/hide
 * - Track mouse position for animations
 * - Animate width, height, top, left (CPU-bound)
 * - Use staggerChildren excessively (use CSS instead)
 * - Use whileHover for many elements (use CSS instead)
 */

// ─────────────────────────────────────────────────────────────
// MIGRATION GUIDE
// ─────────────────────────────────────────────────────────────

/**
 * Replace heavy Framer Motion patterns:
 * 
 * ❌ BEFORE:
 * const x = useMotionValue(0);
 * const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]));
 * <motion.div style={{ rotateX }} onMouseMove={handleMove} />
 * 
 * ✅ AFTER:
 * <div className="card-hover">Content</div>
 * 
 * ❌ BEFORE:
 * <AnimatePresence>
 *   {isOpen && <Modal />}
 * </AnimatePresence>
 * 
 * ✅ AFTER:
 * {isOpen && <Modal className="modal-content" />}
 * 
 * ❌ BEFORE:
 * <motion.span layoutId="indicator" />
 * 
 * ✅ AFTER:
 * <span className="nav-indicator" style={{ left, width }} />
 */
