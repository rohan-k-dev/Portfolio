import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', link: '#hero' },
  { name: 'Work', link: '#work' },
  { name: 'About', link: '#about' },
  { name: 'Experience', link: '#experience' },
  { name: 'Certifications', link: '#certifications' },
  { name: 'Contact', link: '#contact' },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef(null);

  // Optimized scroll listener
  useEffect(() => {
    let timeoutId;
    const onScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 20);
      }, 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const ids = navLinks.map((l) => l.link.replace('#', ''));
    const targets = ids.map((id) => document.getElementById(id)).filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0.1 }
    );

    targets.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (link) => {
    setMenuOpen(false);
    // Smooth scroll
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      {/* Main Container - Matches Hero Width */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* LEFT: Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 text-xl lg:text-2xl font-bold text-white tracking-tight"
          >
            Rohan<span className="text-cyan-400">.</span>dev
          </motion.a>

          {/* CENTER: Desktop Navigation */}
          <nav 
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            aria-label="Primary navigation"
          >
            <ul className="flex items-center gap-1">
              {navLinks.map(({ link, name }) => {
                const isActive = activeSection === link.replace('#', '');
                return (
                  <li key={name}>
                    <a
                      href={link}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link);
                      }}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {/* Hover Background */}
                      <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      
                      {/* Text */}
                      <span className="relative z-10">{name}</span>
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="activeSection"
                          className="absolute inset-0 rounded-lg bg-white/10 border border-white/20"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover Glow */}
                      <span className="absolute inset-0 rounded-lg bg-cyan-500/0 group-hover:bg-cyan-500/10 blur-xl transition-all duration-300" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            
            {/* CTA Button - Desktop */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              <span>Hire Me</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>

            {/* Hamburger Menu - Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span
                  animate={{
                    rotate: menuOpen ? 45 : 0,
                    y: menuOpen ? 7 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-0.5 bg-white rounded-full origin-center"
                />
                <motion.span
                  animate={{
                    opacity: menuOpen ? 0 : 1,
                    scale: menuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={{
                    rotate: menuOpen ? -45 : 0,
                    y: menuOpen ? -7 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-0.5 bg-white rounded-full origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
              style={{ top: '64px' }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
              aria-label="Mobile navigation"
            >
              <div className="w-full max-w-7xl mx-auto px-6 py-6">
                <ul className="space-y-1">
                  {navLinks.map(({ link, name }, idx) => {
                    const isActive = activeSection === link.replace('#', '');
                    return (
                      <motion.li
                        key={name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                      >
                        <a
                          href={link}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(link);
                          }}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-white/10 text-white border border-white/20'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {name}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* Mobile CTA */}
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                  className="flex items-center justify-center gap-2 mt-4 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-base font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                >
                  <span>Hire Me</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavBar;
