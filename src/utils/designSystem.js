// Premium Spacing System
export const spacing = {
  section: {
    py: 'py-20 md:py-28 lg:py-36',
    px: 'px-6 md:px-12 lg:px-16',
    gap: 'space-y-16 md:space-y-20 lg:space-y-24',
  },
  container: {
    maxWidth: 'max-w-[1400px]',
    center: 'mx-auto',
  },
  content: {
    gap: 'space-y-6 md:space-y-8',
    gapSm: 'space-y-4 md:space-y-6',
  },
  grid: {
    cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
    cols4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8',
  },
};

// Typography Hierarchy
export const typography = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]',
  h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]',
  h3: 'text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.2]',
  h4: 'text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-[1.3]',
  h5: 'text-lg sm:text-xl md:text-2xl font-semibold leading-[1.4]',
  body: 'text-base md:text-lg text-gray-400 leading-relaxed',
  bodySm: 'text-sm md:text-base text-gray-400 leading-relaxed',
  label: 'text-xs md:text-sm font-medium uppercase tracking-wider text-gray-500',
};

// Animation Variants
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Hover Effects
export const hoverEffects = {
  lift: 'hover:-translate-y-2 transition-transform duration-300',
  scale: 'hover:scale-105 transition-transform duration-300',
  glow: 'hover:shadow-xl hover:shadow-cyan-500/20 transition-shadow duration-300',
  border: 'hover:border-cyan-500/30 transition-colors duration-300',
};

// Card Styles
export const cardStyles = {
  base: 'rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm',
  hover: 'hover:bg-white/10 hover:border-white/20 transition-all duration-300',
  glow: 'relative overflow-hidden group',
};

// Gradient Styles
export const gradients = {
  primary: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  secondary: 'bg-gradient-to-r from-purple-500 to-pink-500',
  text: 'bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent',
  border: 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20',
};

// Transition Classes
export const transitions = {
  all: 'transition-all duration-300 ease-out',
  colors: 'transition-colors duration-300 ease-out',
  transform: 'transition-transform duration-300 ease-out',
  opacity: 'transition-opacity duration-300 ease-out',
  smooth: 'transition-all duration-500 ease-in-out',
};
