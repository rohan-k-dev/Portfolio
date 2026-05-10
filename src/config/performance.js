// Performance Configuration
// Adjust these settings based on device capabilities

export const PERFORMANCE_CONFIG = {
  // Animation Settings
  animations: {
    enabled: true,
    reducedMotion: false,
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: [0.16, 1, 0.3, 1],
  },

  // Electric Border Settings
  electricBorder: {
    enabled: true,
    maxInstances: 3,
    points: 20,
    duration: 8000,
    chaos: 0.05,
    lineWidth: 0.8,
    glowIntensity: 0.3,
  },

  // Blur Effects
  blur: {
    enabled: true,
    intensity: 'sm',
    maxInstances: 5,
  },

  // Glow Effects
  glow: {
    enabled: true,
    layers: 1,
    intensity: 0.2,
    blur: 16,
  },

  // Scroll Settings
  scroll: {
    throttleDelay: 100,
    smoothScroll: true,
    passive: true,
  },

  // Image Loading
  images: {
    lazy: true,
    placeholder: true,
    quality: 85,
  },

  // Intersection Observer
  observer: {
    threshold: 0.1,
    rootMargin: '50px',
  },

  // Device-Specific Settings
  lowEnd: {
    animations: {
      enabled: false,
      duration: { fast: 0, normal: 0, slow: 0 },
    },
    electricBorder: {
      enabled: false,
    },
    blur: {
      enabled: false,
    },
    glow: {
      enabled: false,
    },
  },

  medium: {
    animations: {
      enabled: true,
      duration: { fast: 150, normal: 250, slow: 400 },
    },
    electricBorder: {
      enabled: true,
      maxInstances: 2,
      points: 15,
      duration: 10000,
    },
    blur: {
      enabled: true,
      intensity: 'sm',
    },
    glow: {
      layers: 1,
      intensity: 0.15,
    },
  },

  high: {
    animations: {
      enabled: true,
      duration: { fast: 200, normal: 300, slow: 500 },
    },
    electricBorder: {
      enabled: true,
      maxInstances: 3,
      points: 20,
      duration: 8000,
    },
    blur: {
      enabled: true,
      intensity: 'sm',
    },
    glow: {
      layers: 1,
      intensity: 0.2,
    },
  },
};

export const getOptimizedConfig = (deviceTier = 'medium') => {
  const baseConfig = PERFORMANCE_CONFIG;
  const tierConfig = PERFORMANCE_CONFIG[deviceTier] || PERFORMANCE_CONFIG.medium;

  return {
    ...baseConfig,
    ...tierConfig,
  };
};

export const FEATURES = {
  electricBorder: true,
  particleEffects: false,
  parallaxScroll: false,
  videoBackgrounds: false,
  complexAnimations: false,
  heavyBlur: false,
};

export const BUDGETS = {
  maxCanvasAnimations: 3,
  maxBlurEffects: 5,
  maxGlowLayers: 1,
  maxShadowLayers: 1,
  maxDOMDepth: 5,
  maxComponentsPerView: 20,
};

export const OPTIMIZATIONS = {
  useMemo: true,
  useCallback: true,
  lazyLoad: true,
  codesplitting: true,
  imageOptimization: true,
  cssContainment: true,
  willChange: false,
  gpuAcceleration: true,
};
