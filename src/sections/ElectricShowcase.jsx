import { motion } from "framer-motion";
import { 
  SubtleElectric, 
  PremiumElectric, 
  HeroElectric, 
  ProjectCardElectric 
} from "../components/ElectricWrapper";

const ElectricShowcase = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack solution with React, Node.js, and Stripe",
      tech: ["React", "Node.js", "MongoDB"],
      image: "/project1.jpg",
    },
    {
      title: "AI Dashboard",
      description: "Real-time analytics dashboard with ML predictions",
      tech: ["Next.js", "Python", "TensorFlow"],
      image: "/project2.jpg",
    },
    {
      title: "Mobile App",
      description: "Cross-platform app with React Native",
      tech: ["React Native", "Firebase", "Redux"],
      image: "/project3.jpg",
    },
  ];

  const features = [
    {
      icon: "🚀",
      title: "Fast Performance",
      description: "Optimized for speed with lazy loading and code splitting",
    },
    {
      icon: "🎨",
      title: "Modern Design",
      description: "Clean, intuitive interfaces that users love",
    },
    {
      icon: "📱",
      title: "Responsive",
      description: "Perfect experience on all devices and screen sizes",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black py-20 md:py-28 lg:py-36 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto space-y-20">
        
        {/* Hero Section with Electric Border */}
        <HeroElectric 
          background="transparent" 
          padding="10"
          className="max-w-4xl mx-auto"
        >
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
                <span className="text-white">Electric Border</span>
                <br />
                <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
                  Showcase
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Premium electric border effects for modern portfolios
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                Get Started
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm">
                Learn More
              </button>
            </motion.div>
          </div>
        </HeroElectric>

        {/* Features Grid with Premium Electric */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Premium Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover what makes our solutions stand out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <PremiumElectric>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl">
                      {feature.icon}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <h4 className="text-lg font-semibold text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </PremiumElectric>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projects Grid with Project Card Electric */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Featured Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Showcasing our best work with electric borders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <ProjectCardElectric>
                  <div className="space-y-4">
                    {/* Project Image */}
                    <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🎨
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-gray-400">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
                      View Project
                    </button>
                  </div>
                </ProjectCardElectric>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonial with Subtle Electric */}
        <div className="max-w-3xl mx-auto">
          <SubtleElectric>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">John Doe</h4>
                  <p className="text-sm text-gray-400">CEO, TechCorp</p>
                </div>
              </div>
              
              <p className="text-gray-400 text-lg italic leading-relaxed">
                "The electric border effects add a premium, futuristic touch to our portfolio. 
                The subtle animations are perfect for a professional look without being distracting."
              </p>
              
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
            </div>
          </SubtleElectric>
        </div>

      </div>
    </section>
  );
};

export default ElectricShowcase;
