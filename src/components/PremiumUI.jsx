import { motion } from "framer-motion";
import { animations } from "../utils/designSystem";

// Section Header Component
export const SectionHeader = ({ label, title, description, centered = false }) => (
  <motion.div
    {...animations.fadeInUp}
    className={`${centered ? 'text-center mx-auto max-w-3xl' : ''} space-y-4 md:space-y-6`}
  >
    {label && (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm ${centered ? 'mx-auto' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs md:text-sm font-medium text-cyan-100 uppercase tracking-wider">
          {label}
        </span>
      </div>
    )}
    
    {title && (
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
        <span className="text-white">{title.split(' ').slice(0, -1).join(' ')}</span>{' '}
        <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
          {title.split(' ').slice(-1)}
        </span>
      </h2>
    )}
    
    {description && (
      <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl">
        {description}
      </p>
    )}
  </motion.div>
);

// Floating Glow Card
export const GlowCard = ({ children, className = "", glowColor = "cyan" }) => {
  const glowColors = {
    cyan: "group-hover:shadow-cyan-500/20",
    blue: "group-hover:shadow-blue-500/20",
    purple: "group-hover:shadow-purple-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 ${className}`}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-${glowColor}-500/0 via-${glowColor}-500/20 to-${glowColor}-500/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

// Animated Counter
export const AnimatedNumber = ({ value, suffix = "", duration = 2 }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {value}{suffix}
    </motion.span>
  );
};

// Gradient Border Card
export const GradientBorderCard = ({ children, className = "" }) => (
  <div className={`relative group ${className}`}>
    {/* Animated Gradient Border */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
    
    {/* Card Content */}
    <div className="relative rounded-2xl bg-black border border-white/10 backdrop-blur-sm">
      {children}
    </div>
  </div>
);

// Skill Badge
export const SkillBadge = ({ icon, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="group"
  >
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300">
      {icon && <span className="text-lg group-hover:scale-110 transition-transform duration-300">{icon}</span>}
      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </div>
  </motion.div>
);

// Floating Orb Background
export const FloatingOrb = ({ color = "cyan", size = "lg", position = "top-right", delay = 0 }) => {
  const sizes = {
    sm: "w-64 h-64",
    md: "w-96 h-96",
    lg: "w-[500px] h-[500px]",
    xl: "w-[600px] h-[600px]",
  };

  const positions = {
    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  };

  const colors = {
    cyan: "rgba(6, 182, 212, 0.15)",
    blue: "rgba(59, 130, 246, 0.15)",
    purple: "rgba(139, 92, 246, 0.15)",
  };

  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute ${sizes[size]} ${positions[position]} rounded-full pointer-events-none`}
      style={{
        background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
    />
  );
};

// Section Divider
export const SectionDivider = () => (
  <div className="relative w-full h-px my-20 md:my-28">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent origin-center"
    />
  </div>
);

// Stat Card
export const StatCard = ({ number, label, suffix = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="text-center space-y-2"
  >
    <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
      {number}{suffix}
    </div>
    <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">
      {label}
    </div>
  </motion.div>
);
