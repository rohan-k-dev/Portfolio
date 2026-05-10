import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Electric Border Component for Contact Elements
const ElectricBorder = ({ isActive = false, speed = 6000, chaos = 0.08 }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    let startTime = Date.now();
    const points = [];
    const numPoints = 40;

    // Initialize points
    for (let i = 0; i < numPoints; i++) {
      const progress = i / numPoints;
      const perimeter = 2 * (canvas.width + canvas.height);
      const distance = progress * perimeter;

      let x, y;
      if (distance < canvas.width) {
        x = distance;
        y = 0;
      } else if (distance < canvas.width + canvas.height) {
        x = canvas.width;
        y = distance - canvas.width;
      } else if (distance < 2 * canvas.width + canvas.height) {
        x = canvas.width - (distance - canvas.width - canvas.height);
        y = canvas.height;
      } else {
        x = 0;
        y = canvas.height - (distance - 2 * canvas.width - canvas.height);
      }

      points.push({ x, y, baseX: x, baseY: y });
    }

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % speed) / speed;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach((point, i) => {
        const offset = Math.sin(progress * Math.PI * 2 + i * 0.5) * chaos * 3;
        if (point.baseY === 0 || point.baseY === canvas.height) {
          point.y = point.baseY + offset;
        } else {
          point.x = point.baseX + offset;
        }
      });

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();

      const glowIntensity = isActive ? 1 : 0.7;
      ctx.shadowBlur = 8 * glowIntensity;
      ctx.shadowColor = `rgba(6, 182, 212, ${0.4 * glowIntensity})`;
      ctx.strokeStyle = `rgba(6, 182, 212, ${0.4 * glowIntensity})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.shadowBlur = 4 * glowIntensity;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, speed, chaos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none rounded-2xl"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// Main Contact Section Component
const ElectricContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent! (Demo)");
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-black py-20 md:py-28 lg:py-36 px-6 md:px-12 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-cyan-100 uppercase tracking-wider">
              Get In Touch
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-white">Let's Build </span>
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              Together
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let's discuss how we can work together to
            bring your ideas to life.
          </p>
        </motion.div>

        {/* Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left: Contact Form - Main Card with Electric Border */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 relative group"
          >
            {/* Electric Border */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <ElectricBorder speed={7000} chaos={0.1} />
            </div>

            {/* Outer Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl pointer-events-none z-0"
            />

            {/* Card Container */}
            <div className="relative rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-10 z-[1]">
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-2xl pointer-events-none" />

              {/* Terminal Header */}
              <div className="relative flex items-center gap-2 mb-8 pb-6 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="ml-4 text-sm font-mono text-cyan-400">
                  ~/contact-terminal
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="relative space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300"
                      placeholder="Your name"
                    />
                    {focusedField === "name" && (
                      <motion.div
                        layoutId="inputGlow"
                        className="absolute -inset-0.5 bg-cyan-500/20 rounded-lg blur-sm -z-10"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </div>

                {/* Email Field - Electric Border Container */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </label>
                  <div className="relative">
                    {/* Electric Border for Email */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                      <ElectricBorder
                        isActive={focusedField === "email"}
                        speed={6000}
                        chaos={0.08}
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="relative w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300 z-[1]"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                    {focusedField === "message" && (
                      <motion.div
                        layoutId="inputGlow"
                        className="absolute -inset-0.5 bg-cyan-500/20 rounded-lg blur-sm -z-10"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right: Collaboration Section - Electric Border */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Collaboration Card */}
            <div className="relative group">
              {/* Electric Border */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <ElectricBorder speed={8000} chaos={0.08} />
              </div>

              {/* Outer Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.25 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500/15 via-emerald-500/15 to-cyan-500/15 rounded-2xl blur-lg pointer-events-none z-0"
              />

              {/* Card */}
              <div className="relative rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 z-[1]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-2xl pointer-events-none" />

                <div className="relative space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Let's Collaborate
                    </h3>
                  </div>

                  <p className="text-gray-400 leading-relaxed">
                    I'm always open to discussing new projects, creative ideas,
                    or opportunities to be part of your vision.
                  </p>

                  <div className="space-y-4 pt-4">
                    <a
                      href="mailto:your.email@example.com"
                      className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">
                        your.email@example.com
                      </span>
                    </a>

                    <a
                      href="https://linkedin.com/in/yourprofile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">
                        LinkedIn Profile
                      </span>
                    </a>

                    <a
                      href="https://github.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">
                        GitHub Profile
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 backdrop-blur-sm p-6"
            >
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    Available for Projects
                  </h4>
                  <p className="text-xs text-gray-400">
                    Currently accepting new opportunities and collaborations
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ElectricContactSection;
