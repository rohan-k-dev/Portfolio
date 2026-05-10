import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { SectionHeader, GlowCard, SkillBadge, StatCard } from "../components/PremiumUI";
import { spacing, typography } from "../utils/designSystem";

// Example: Enhanced About Section
const EnhancedAboutExample = () => {
  const skills = [
    { icon: "⚛️", label: "React" },
    { icon: "🎨", label: "Tailwind CSS" },
    { icon: "🚀", label: "Next.js" },
    { icon: "📱", label: "React Native" },
    { icon: "🔥", label: "Firebase" },
    { icon: "☁️", label: "AWS" },
  ];

  const stats = [
    { number: "50", suffix: "+", label: "Projects" },
    { number: "100", suffix: "%", label: "Satisfaction" },
    { number: "5", suffix: "+", label: "Years" },
    { number: "30", suffix: "+", label: "Clients" },
  ];

  return (
    <SectionWrapper id="about" withOrbs>
      {/* Section Header */}
      <SectionHeader
        label="About Me"
        title="Building Digital Excellence"
        description="Passionate developer crafting exceptional web experiences with modern technologies"
        centered
      />

      {/* Content Grid */}
      <div className={`${spacing.grid.cols2} mt-16`}>
        {/* Left Column - Bio */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={spacing.content.gap}
        >
          <h3 className={typography.h4}>
            <span className="text-white">Hi, I'm </span>
            <span className="gradient-text">Rohan Kumar</span>
          </h3>

          <p className={typography.body}>
            A full-stack developer with a passion for creating beautiful, functional, and user-friendly applications. I specialize in modern web technologies and love bringing ideas to life through code.
          </p>

          <p className={typography.body}>
            With expertise in React, Node.js, and cloud technologies, I build scalable solutions that make a difference.
          </p>

          {/* Skills */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <SkillBadge
                  key={skill.label}
                  icon={skill.icon}
                  label={skill.label}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Stats & Highlights */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={spacing.content.gap}
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <StatCard
                key={stat.label}
                number={stat.number}
                suffix={stat.suffix}
                label={stat.label}
                delay={idx * 0.1}
              />
            ))}
          </div>

          {/* Highlight Cards */}
          <div className="space-y-4">
            <GlowCard glowColor="cyan" className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Mission</h4>
                  <p className="text-sm text-gray-400">
                    Creating impactful digital solutions that solve real-world problems
                  </p>
                </div>
              </div>
            </GlowCard>

            <GlowCard glowColor="blue" className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💡</div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Approach</h4>
                  <p className="text-sm text-gray-400">
                    User-first design combined with clean, maintainable code
                  </p>
                </div>
              </div>
            </GlowCard>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default EnhancedAboutExample;
