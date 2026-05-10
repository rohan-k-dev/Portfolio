import { motion } from "framer-motion";
import { useState } from "react";
import ElectricBorder from "./ElectricBorder";

// Premium Presets
const PRESETS = {
  subtle: {
    duration: 6000,
    glowColor: "rgba(6, 182, 212, 0.3)",
    chaos: 0.2,
    thickness: 0.8,
    hoverScale: 1.01,
    glowIntensity: 0.15,
  },
  premium: {
    duration: 5000,
    glowColor: "rgba(6, 182, 212, 0.5)",
    chaos: 0.3,
    thickness: 1,
    hoverScale: 1.02,
    glowIntensity: 0.25,
  },
  hero: {
    duration: 4000,
    glowColor: "rgba(6, 182, 212, 0.6)",
    chaos: 0.4,
    thickness: 1.2,
    hoverScale: 1.0,
    glowIntensity: 0.3,
  },
  projectCard: {
    duration: 5500,
    glowColor: "rgba(6, 182, 212, 0.4)",
    chaos: 0.25,
    thickness: 0.9,
    hoverScale: 1.03,
    glowIntensity: 0.2,
  },
};

const ElectricWrapper = ({
  children,
  preset = "subtle",
  className = "",
  enableHover = true,
  enableGlow = true,
  customConfig = {},
  rounded = "2xl",
  background = "glass",
  padding = "6",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Merge preset with custom config
  const config = { ...PRESETS[preset], ...customConfig };

  // Background variants
  const backgrounds = {
    glass: "bg-white/5 backdrop-blur-sm border border-white/10",
    dark: "bg-black/80 backdrop-blur-md border border-white/5",
    solid: "bg-gray-900/95 backdrop-blur-sm border border-white/10",
    transparent: "bg-transparent border border-white/5",
  };

  // Rounded variants
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  };

  // Padding variants
  const paddingClasses = {
    0: "p-0",
    2: "p-2",
    4: "p-4",
    6: "p-6",
    8: "p-8",
    10: "p-10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        enableHover
          ? {
              scale: config.hoverScale,
              transition: { duration: 0.3, ease: "easeOut" },
            }
          : {}
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative group ${className}`}
    >
      {/* Electric Border Layer */}
      <div
        className={`absolute inset-0 ${roundedClasses[rounded]} overflow-hidden pointer-events-none z-10`}
      >
        <ElectricBorder
          duration={config.duration}
          glowColor={config.glowColor}
          chaos={config.chaos}
          thickness={config.thickness}
          containerClassName="w-full h-full"
        />
      </div>

      {/* Glow Effect on Hover */}
      {enableGlow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? config.glowIntensity : 0 }}
          transition={{ duration: 0.4 }}
          className={`absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 ${roundedClasses[rounded]} blur-xl pointer-events-none z-0`}
        />
      )}

      {/* Content Container */}
      <div
        className={`relative ${backgrounds[background]} ${roundedClasses[rounded]} ${paddingClasses[padding]} transition-all duration-300 z-[1]`}
      >
        {children}
      </div>

      {/* Subtle Inner Glow */}
      <div
        className={`absolute inset-0 ${roundedClasses[rounded]} bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[2]`}
      />
    </motion.div>
  );
};

// Preset Components for Easy Use
export const SubtleElectric = (props) => (
  <ElectricWrapper preset="subtle" {...props} />
);

export const PremiumElectric = (props) => (
  <ElectricWrapper preset="premium" {...props} />
);

export const HeroElectric = (props) => (
  <ElectricWrapper preset="hero" {...props} />
);

export const ProjectCardElectric = (props) => (
  <ElectricWrapper preset="projectCard" {...props} />
);

export default ElectricWrapper;
