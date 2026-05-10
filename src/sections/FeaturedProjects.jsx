import { motion } from "framer-motion";
import ElectricProjectCard from "../components/ElectricProjectCard";
import { SectionHeader } from "../components/PremiumUI";

const FeaturedProjects = () => {
  // Featured Hero Projects
  const featuredProjects = [
    {
      id: 1,
      title: "Cloudburst ML",
      description:
        "Advanced machine learning platform for real-time data processing and predictive analytics. Built with cutting-edge AI algorithms and scalable cloud infrastructure.",
      image: "/projects/cloudburst-ml.jpg", // Replace with actual image path
      tags: ["Python", "TensorFlow", "AWS", "Docker", "FastAPI"],
      liveLink: "https://cloudburst-ml.demo.com",
      githubLink: "https://github.com/yourusername/cloudburst-ml",
      featured: true,
    },
    {
      id: 2,
      title: "ProctoAI",
      description:
        "AI-powered proctoring system with facial recognition, eye tracking, and behavior analysis. Ensures exam integrity with real-time monitoring and automated reporting.",
      image: "/projects/proctoai.jpg", // Replace with actual image path
      tags: ["React", "Node.js", "OpenCV", "MongoDB", "WebRTC"],
      liveLink: "https://proctoai.demo.com",
      githubLink: "https://github.com/yourusername/proctoai",
      featured: true,
    },
  ];

  // Regular Projects (without electric border)
  const regularProjects = [
    {
      id: 3,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      tags: ["React", "Node.js", "Stripe"],
      liveLink: "#",
      githubLink: "#",
    },
    {
      id: 4,
      title: "Task Manager",
      description: "Collaborative task management with real-time updates",
      tags: ["Next.js", "Firebase", "Tailwind"],
      liveLink: "#",
      githubLink: "#",
    },
    // Add more regular projects...
  ];

  return (
    <section className="relative w-full bg-black py-20 md:py-28 lg:py-36 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto space-y-16">
        {/* Section Header */}
        <SectionHeader
          label="Portfolio"
          title="Featured Projects"
          description="Showcasing my best work in machine learning, AI, and full-stack development"
          centered
        />

        {/* Featured Hero Projects with Electric Border */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-cyan-300 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Hero Projects
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {featuredProjects.map((project, idx) => (
              <ElectricProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                liveLink={project.liveLink}
                githubLink={project.githubLink}
                featured={project.featured}
              />
            ))}
          </div>
        </div>

        {/* Regular Projects (No Electric Border) */}
        <div className="space-y-8 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-400 mb-6">
              More Projects
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                {/* Regular Card Content */}
                <div className="p-6 space-y-4">
                  <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.liveLink}
                      className="flex-1 text-center px-4 py-2 bg-white/5 border border-white/10 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
                    >
                      View
                    </a>
                    <a
                      href={project.githubLink}
                      className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
