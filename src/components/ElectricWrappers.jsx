/* ═══════════════════════════════════════════════════════════════
   ELECTRIC BORDER WRAPPERS
   
   Reusable components with optimized settings for strategic usage.
   
   Performance: Lightweight settings (speed 0.4-0.6, chaos 0.02-0.05)
   Theme: Premium futuristic, subtle neon cyan, cinematic UI
   
   Usage: Import and wrap ONLY critical elements (CTAs, featured cards)
═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { ElectricBorder } from '@react-bits/ElectricBorder-JS-CSS';

/* ─────────────────────────────────────────────────────────────
   CONFIGURATION PRESETS
───────────────────────────────────────────────────────────────── */

const ELECTRIC_PRESETS = {
  // Primary CTA buttons (Hire Me, View Work)
  button: {
    speed: 0.5,
    chaos: 0.03,
    thickness: 1,
    color: '#06b6d4', // Cyan
  },
  
  // Featured project cards (top 2 projects)
  project: {
    speed: 0.6,
    chaos: 0.05,
    thickness: 1,
    color: '#06b6d4', // Cyan
  },
  
  // Contact form card
  contact: {
    speed: 0.5,
    chaos: 0.04,
    thickness: 1,
    color: '#06b6d4', // Cyan
  },
  
  // Hero education badge
  badge: {
    speed: 0.4,
    chaos: 0.02,
    thickness: 0.8,
    color: '#06b6d4', // Cyan (muted)
  },
};

/* ─────────────────────────────────────────────────────────────
   1. ELECTRIC CTA BUTTON
   
   Usage: Primary call-to-action buttons
   Example: "Hire Me", "View My Work"
───────────────────────────────────────────────────────────────── */

export const ElectricCTA = React.memo(({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`relative ${className}`} {...props}>
      <ElectricBorder
        speed={ELECTRIC_PRESETS.button.speed}
        chaos={ELECTRIC_PRESETS.button.chaos}
        thickness={ELECTRIC_PRESETS.button.thickness}
        color={ELECTRIC_PRESETS.button.color}
        className="rounded-lg"
      >
        {children}
      </ElectricBorder>
    </div>
  );
});

ElectricCTA.displayName = 'ElectricCTA';

/* ─────────────────────────────────────────────────────────────
   2. ELECTRIC PROJECT CARD
   
   Usage: Featured project cards ONLY (top 2 projects)
   Example: Cloudburst ML, ProctoAI
───────────────────────────────────────────────────────────────── */

export const ElectricProjectCard = React.memo(({ 
  children, 
  className = '',
  accentColor = '#06b6d4', // Allow custom color per project
  ...props 
}) => {
  return (
    <div className={`relative ${className}`} {...props}>
      <ElectricBorder
        speed={ELECTRIC_PRESETS.project.speed}
        chaos={ELECTRIC_PRESETS.project.chaos}
        thickness={ELECTRIC_PRESETS.project.thickness}
        color={accentColor}
        className="rounded-2xl"
      >
        {children}
      </ElectricBorder>
    </div>
  );
});

ElectricProjectCard.displayName = 'ElectricProjectCard';

/* ─────────────────────────────────────────────────────────────
   3. ELECTRIC CONTACT CARD
   
   Usage: Main contact form container
   Example: Contact section form wrapper
───────────────────────────────────────────────────────────────── */

export const ElectricContactCard = React.memo(({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`relative ${className}`} {...props}>
      <ElectricBorder
        speed={ELECTRIC_PRESETS.contact.speed}
        chaos={ELECTRIC_PRESETS.contact.chaos}
        thickness={ELECTRIC_PRESETS.contact.thickness}
        color={ELECTRIC_PRESETS.contact.color}
        className="rounded-xl"
      >
        {children}
      </ElectricBorder>
    </div>
  );
});

ElectricContactCard.displayName = 'ElectricContactCard';

/* ─────────────────────────────────────────────────────────────
   4. ELECTRIC BADGE
   
   Usage: Hero education badge (subtle accent)
   Example: "B.Tech ISE • BMSCE Bangalore • 2027"
───────────────────────────────────────────────────────────────── */

export const ElectricBadge = React.memo(({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`relative ${className}`} {...props}>
      <ElectricBorder
        speed={ELECTRIC_PRESETS.badge.speed}
        chaos={ELECTRIC_PRESETS.badge.chaos}
        thickness={ELECTRIC_PRESETS.badge.thickness}
        color={ELECTRIC_PRESETS.badge.color}
        className="rounded-full"
      >
        {children}
      </ElectricBorder>
    </div>
  );
});

ElectricBadge.displayName = 'ElectricBadge';

/* ─────────────────────────────────────────────────────────────
   CONDITIONAL WRAPPER (Performance Optimization)
   
   Usage: Automatically disable on mobile or low-end devices
───────────────────────────────────────────────────────────────── */

export const ConditionalElectric = React.memo(({ 
  children,
  component: Component = ElectricCTA,
  disableOnMobile = true,
  disableOnLowEnd = true,
  ...props
}) => {
  const [shouldRender, setShouldRender] = React.useState(true);

  React.useEffect(() => {
    // Check if mobile
    const isMobile = window.innerWidth < 768;
    
    // Check if low-end device (simple heuristic)
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    if ((disableOnMobile && isMobile) || (disableOnLowEnd && isLowEnd)) {
      setShouldRender(false);
    }
  }, [disableOnMobile, disableOnLowEnd]);

  if (!shouldRender) {
    return <>{children}</>;
  }

  return <Component {...props}>{children}</Component>;
});

ConditionalElectric.displayName = 'ConditionalElectric';

/* ─────────────────────────────────────────────────────────────
   USAGE EXAMPLES
───────────────────────────────────────────────────────────────── */

/**
 * Example 1: Primary CTA Button
 * 
 * import { ElectricCTA } from './components/ElectricWrappers';
 * 
 * <ElectricCTA>
 *   <button className="px-6 py-3 bg-white text-black rounded-lg">
 *     Hire Me
 *   </button>
 * </ElectricCTA>
 */

/**
 * Example 2: Featured Project Card
 * 
 * import { ElectricProjectCard } from './components/ElectricWrappers';
 * 
 * <ElectricProjectCard accentColor="#3b82f6">
 *   <div className="project-card">
 *     <h3>Cloudburst ML</h3>
 *     <p>AI-powered weather prediction</p>
 *   </div>
 * </ElectricProjectCard>
 */

/**
 * Example 3: Contact Card
 * 
 * import { ElectricContactCard } from './components/ElectricWrappers';
 * 
 * <ElectricContactCard>
 *   <form className="contact-form">
 *     <input type="email" placeholder="Your email" />
 *     <textarea placeholder="Message" />
 *     <button type="submit">Send</button>
 *   </form>
 * </ElectricContactCard>
 */

/**
 * Example 4: Hero Badge
 * 
 * import { ElectricBadge } from './components/ElectricWrappers';
 * 
 * <ElectricBadge>
 *   <span className="badge-text">
 *     B.Tech ISE • BMSCE Bangalore • 2027
 *   </span>
 * </ElectricBadge>
 */

/**
 * Example 5: Conditional Rendering (Performance)
 * 
 * import { ConditionalElectric, ElectricCTA } from './components/ElectricWrappers';
 * 
 * <ConditionalElectric 
 *   component={ElectricCTA}
 *   disableOnMobile={true}
 *   disableOnLowEnd={true}
 * >
 *   <button>Hire Me</button>
 * </ConditionalElectric>
 */

/* ─────────────────────────────────────────────────────────────
   PERFORMANCE NOTES
───────────────────────────────────────────────────────────────── */

/**
 * Performance Guidelines:
 * 
 * 1. MAX 5 INSTANCES per page
 *    - 1 primary CTA
 *    - 2 featured projects
 *    - 1 contact card
 *    - 1 hero badge
 * 
 * 2. Use React.memo to prevent unnecessary re-renders
 * 
 * 3. Keep settings lightweight:
 *    - speed: 0.4-0.6 (slower = smoother)
 *    - chaos: 0.02-0.05 (lower = more stable)
 *    - thickness: 0.8-1 (thinner = lighter)
 * 
 * 4. Consider disabling on mobile/low-end devices
 * 
 * 5. Test performance with Chrome DevTools:
 *    - Target: 55-60 FPS
 *    - GPU usage: <20%
 *    - Paint time: <15ms
 */
