// Performance Optimization Utilities

/**
 * Throttle function - limits function calls
 * Use for scroll, resize, mousemove events
 */
export const throttle = (func, delay = 100) => {
  let timeoutId;
  let lastRan;
  
  return function(...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (Date.now() - lastRan >= delay) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, delay - (Date.now() - lastRan));
    }
  };
};

/**
 * Debounce function - delays function execution
 * Use for search, input validation
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Intersection Observer hook for lazy loading
 * Use for viewport-based animations
 */
export const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
  
  return isIntersecting;
};

/**
 * Detect low-end devices
 * Use to disable heavy animations
 */
export const isLowEndDevice = () => {
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;
  
  // Check device memory (if available)
  const memory = navigator.deviceMemory || 4;
  
  // Check connection speed
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  
  return cores < 4 || memory < 4 || slowConnection;
};

/**
 * Request Idle Callback wrapper
 * Use for non-critical work
 */
export const runWhenIdle = (callback) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback);
  } else {
    setTimeout(callback, 1);
  }
};

/**
 * Preload images
 * Use for critical images
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Lazy load component
 * Use for code splitting
 */
export const lazyLoadComponent = (importFunc) => {
  return lazy(() => {
    return Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, 300)) // Min delay for smooth transition
    ]).then(([moduleExports]) => moduleExports);
  });
};

/**
 * Check if user prefers reduced motion
 * Use to respect accessibility preferences
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get optimal animation duration based on device
 * Use for adaptive animations
 */
export const getAnimationDuration = (baseDuration = 300) => {
  if (prefersReducedMotion()) return 0;
  if (isLowEndDevice()) return baseDuration * 0.5;
  return baseDuration;
};

/**
 * Optimize canvas for performance
 * Use for electric border animations
 */
export const optimizeCanvas = (canvas) => {
  const ctx = canvas.getContext('2d', {
    alpha: true,
    desynchronized: true, // Better performance
    willReadFrequently: false,
  });
  
  // Set canvas to device pixel ratio for crisp rendering
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  ctx.scale(dpr, dpr);
  
  return ctx;
};

/**
 * Batch DOM reads and writes
 * Use to prevent layout thrashing
 */
export const batchDOMOperations = (reads, writes) => {
  // Batch all reads first
  const readResults = reads.map(read => read());
  
  // Then batch all writes
  requestAnimationFrame(() => {
    writes.forEach((write, index) => write(readResults[index]));
  });
};

/**
 * Create optimized scroll handler
 * Use for scroll-based effects
 */
export const createScrollHandler = (callback) => {
  let ticking = false;
  
  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };
};

/**
 * Memoize expensive calculations
 * Use for complex computations
 */
export const memoize = (fn) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Check if element is in viewport
 * Use for manual visibility checks
 */
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Get GPU tier
 * Use to adjust visual quality
 */
export const getGPUTier = async () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return 'low';
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'medium';
    
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    
    // Simple heuristic
    if (renderer.includes('Intel')) return 'low';
    if (renderer.includes('NVIDIA') || renderer.includes('AMD')) return 'high';
    
    return 'medium';
  } catch {
    return 'low';
  }
};
