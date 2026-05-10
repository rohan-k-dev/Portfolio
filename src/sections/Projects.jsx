import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { projects } from "../constants";
import TitleHeader from "../components/TitleHeader";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const FILTERS = ["All", "AI / ML", "Full Stack", "Analytics"];

const GITHUB_SVG = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const EXTERNAL_SVG = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CLOSE_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, scale: 0.94,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

/* ─────────────────────────────────────────
   TILT HOOK
───────────────────────────────────────── */
const useTilt = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const onMouseLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
};

/* ─────────────────────────────────────────
   METRIC CHIP
───────────────────────────────────────── */
const MetricChip = ({ label, value, accent }) => (
  <div className="pv2-metric" style={{ "--accent": accent }}>
    <span className="pv2-metric-value">{value}</span>
    <span className="pv2-metric-label">{label}</span>
  </div>
);

/* ─────────────────────────────────────────
   TECH TAG
───────────────────────────────────────── */
const Tag = ({ text }) => <span className="pv2-tag">{text}</span>;

/* ─────────────────────────────────────────
   HERO FEATURED CARD (Cloudburst + ProctoAI)
───────────────────────────────────────── */
const HeroCard = ({ project, index, onOpen }) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();

  return (
    <motion.div
      className="pv2-hero-card"
      style={{ "--accent": project.accent, rotateX, rotateY, transformPerspective: 1000 }}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={index}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Animated gradient border */}
      <div className="pv2-glow-border" style={{ "--accent": project.accent }} aria-hidden="true" />

      {/* Image */}
      <div className="pv2-hero-img">
        <img src={project.imgPath} alt={project.title} loading="lazy" />
        <div className="pv2-hero-img-overlay" style={{ "--accent": project.accent }} />
        {/* Floating badge */}
        <span className="pv2-float-badge" style={{ "--accent": project.accent }}>
          {project.badge}
        </span>
      </div>

      {/* Body */}
      <div className="pv2-hero-body">
        <div className="pv2-hero-meta">
          <span className="pv2-category-tag" style={{ "--accent": project.accent }}>
            {project.category}
          </span>
          <span className="pv2-status-dot">
            <span className="pv2-status-pulse" />
            {project.status}
          </span>
        </div>

        <h3 className="pv2-hero-title">{project.title}</h3>
        <p className="pv2-hero-tagline" style={{ color: project.accent }}>{project.tagline}</p>
        <p className="pv2-hero-desc">{project.description}</p>

        {/* Metrics */}
        <div className="pv2-metrics">
          {project.metrics.map((m) => (
            <MetricChip key={m.label} {...m} accent={project.accent} />
          ))}
        </div>

        {/* Tags */}
        <div className="pv2-tags">
          {project.tags.map((t) => <Tag key={t} text={t} />)}
        </div>

        {/* CTAs */}
        <div className="pv2-ctas">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="pv2-btn pv2-btn--primary"
            style={{ "--accent": project.accent }}
          >
            {GITHUB_SVG} View on GitHub
          </a>
          <button
            className="pv2-btn pv2-btn--ghost"
            onClick={() => onOpen(project)}
            aria-label={`View details for ${project.title}`}
          >
            {EXTERNAL_SVG} Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   GRID CARD
───────────────────────────────────────── */
const GridCard = ({ project, index, onOpen }) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();

  return (
    <motion.div
      className="pv2-grid-card"
      style={{ "--accent": project.accent, rotateX, rotateY, transformPerspective: 900 }}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="pv2-glow-border" style={{ "--accent": project.accent }} aria-hidden="true" />

      {/* Accent top bar */}
      <div className="pv2-accent-bar" style={{ background: project.accent }} />

      {/* Image */}
      <div className="pv2-grid-img">
        <img src={project.imgPath} alt={project.title} loading="lazy" />
        <div className="pv2-grid-img-overlay" />
      </div>

      <div className="pv2-grid-body">
        <div className="pv2-grid-header">
          <span className="pv2-category-tag" style={{ "--accent": project.accent }}>
            {project.category}
          </span>
          <span className="pv2-status-dot">
            <span className="pv2-status-pulse" />
            {project.status}
          </span>
        </div>

        <h3 className="pv2-grid-title">{project.title}</h3>
        <p className="pv2-grid-tagline" style={{ color: project.accent }}>{project.tagline}</p>
        <p className="pv2-grid-desc">{project.description}</p>

        <div className="pv2-tags pv2-tags--sm">
          {project.tags.slice(0, 4).map((t) => <Tag key={t} text={t} />)}
          {project.tags.length > 4 && (
            <span className="pv2-tag pv2-tag--more">+{project.tags.length - 4}</span>
          )}
        </div>

        <div className="pv2-ctas pv2-ctas--sm">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="pv2-btn pv2-btn--primary"
            style={{ "--accent": project.accent }}
          >
            {GITHUB_SVG} GitHub
          </a>
          <button
            className="pv2-btn pv2-btn--ghost"
            onClick={() => onOpen(project)}
            aria-label={`View details for ${project.title}`}
          >
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   PROJECT MODAL
───────────────────────────────────────── */
const ProjectModal = ({ project, onClose }) => {
  // Close on backdrop click
  const onBackdrop = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  // Close on Escape
  const onKey = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  return (
    <motion.div
      className="pv2-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onBackdrop}
      onKeyDown={onKey}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <motion.div
        className="pv2-modal"
        style={{ "--accent": project.accent }}
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="pv2-glow-border" style={{ "--accent": project.accent }} aria-hidden="true" />

        {/* Header */}
        <div className="pv2-modal-header">
          <div>
            <span className="pv2-category-tag" style={{ "--accent": project.accent }}>
              {project.category}
            </span>
            <h2 className="pv2-modal-title">{project.title}</h2>
            <p className="pv2-modal-tagline" style={{ color: project.accent }}>
              {project.tagline}
            </p>
          </div>
          <button
            className="pv2-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            {CLOSE_SVG}
          </button>
        </div>

        {/* Image */}
        <div className="pv2-modal-img">
          <img src={project.imgPath} alt={project.title} />
          <div className="pv2-modal-img-overlay" style={{ "--accent": project.accent }} />
        </div>

        {/* Description */}
        <p className="pv2-modal-desc">{project.description}</p>

        {/* Metrics */}
        {project.metrics && (
          <div className="pv2-modal-metrics">
            {project.metrics.map((m) => (
              <MetricChip key={m.label} {...m} accent={project.accent} />
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="pv2-tags" style={{ marginTop: "16px" }}>
          {project.tags.map((t) => <Tag key={t} text={t} />)}
        </div>

        {/* CTAs */}
        <div className="pv2-ctas" style={{ marginTop: "24px" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="pv2-btn pv2-btn--primary"
            style={{ "--accent": project.accent }}
          >
            {GITHUB_SVG} Open Repository
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="pv2-btn pv2-btn--ghost"
            >
              {EXTERNAL_SVG} Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   FILTER BAR
───────────────────────────────────────── */
const FilterBar = ({ active, onChange }) => (
  <motion.div
    className="pv2-filters"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {FILTERS.map((f) => (
      <button
        key={f}
        className={`pv2-filter-btn ${active === f ? "pv2-filter-btn--active" : ""}`}
        onClick={() => onChange(f)}
        aria-pressed={active === f}
      >
        {f}
        {active === f && (
          <motion.span
            className="pv2-filter-indicator"
            layoutId="filter-indicator"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </button>
    ))}
  </motion.div>
);

/* ─────────────────────────────────────────
   SECTION
───────────────────────────────────────── */
const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);

  const heroProjects = projects.filter((p) => p.priority === "hero");
  const gridProjects = projects.filter((p) => p.priority === "grid");

  const visibleHero = filter === "All"
    ? heroProjects
    : heroProjects.filter((p) => p.category === filter);

  const visibleGrid = filter === "All"
    ? gridProjects
    : gridProjects.filter((p) => p.category === filter);

  const hasResults = visibleHero.length > 0 || visibleGrid.length > 0;

  return (
    <section id="work" className="pv2-section">
      <div className="pv2-inner">

        {/* Header */}
        <TitleHeader title="Projects I've Shipped" sub="🚀 Selected Work" />

        {/* Filter bar */}
        <FilterBar active={filter} onChange={setFilter} />

        <AnimatePresence mode="wait">
          {hasResults ? (
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero featured row */}
              {visibleHero.length > 0 && (
                <div className="pv2-hero-grid">
                  {visibleHero.map((p, i) => (
                    <HeroCard key={p.id} project={p} index={i} onOpen={setModal} />
                  ))}
                </div>
              )}

              {/* Grid row */}
              {visibleGrid.length > 0 && (
                <div className="pv2-grid">
                  {visibleGrid.map((p, i) => (
                    <GridCard key={p.id} project={p} index={i} onOpen={setModal} />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              className="pv2-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No projects in this category yet.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Footer CTA */}
        <motion.div
          className="pv2-footer-cta"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/rohan-k-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="pv2-all-link"
          >
            {GITHUB_SVG}
            View all repositories on GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
