import { motion } from "framer-motion";
import { spacing } from "../utils/designSystem";

const SectionWrapper = ({ 
  children, 
  id, 
  className = "",
  background = "default",
  withOrbs = false,
}) => {
  const backgrounds = {
    default: "bg-black",
    subtle: "bg-gradient-to-b from-black via-gray-900/50 to-black",
    dark: "bg-black/95",
  };

  return (
    <section
      id={id}
      className={`relative ${backgrounds[background]} overflow-hidden ${className}`}
    >
      {/* Floating Orbs */}
      {withOrbs && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
          />
        </>
      )}

      {/* Content Container */}
      <div className={`relative ${spacing.section.py} ${spacing.section.px}`}>
        <div className={`${spacing.container.maxWidth} ${spacing.container.center}`}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper;
