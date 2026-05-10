/* ═══════════════════════════════════════════════════════════════
   PERFORMANCE HOOKS
═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef } from 'react';

// Intersection Observer Hook
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
};

// Debounce Hook
export const useDebounce = (value, delay = 100) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Scroll Position Hook
export const useScrollPosition = (delay = 100) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setScrollY(window.scrollY), delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return scrollY;
};

// Lazy Load Hook
export const useLazyLoad = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, isInView] = useInView({ rootMargin: '200px' });

  useEffect(() => {
    if (isInView) setIsLoaded(true);
  }, [isInView]);

  return [ref, isLoaded];
};

// Media Query Hook
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};
