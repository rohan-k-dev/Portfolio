/* ═══════════════════════════════════════════════════════════════
   LET'S CONNECT SECTION
   
   Premium contact cards with direct action buttons
═══════════════════════════════════════════════════════════════ */

import { motion } from 'framer-motion';

const CONTACT_METHODS = [
  {
    id: 'email',
    title: 'Email',
    subtitle: 'rohankr19725@gmail.com',
    href: 'mailto:rohankr19725@gmail.com',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    hoverGradient: 'from-cyan-500/30 to-blue-500/30',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    subtitle: 'linkedin.com/in/rohan19725',
    href: 'https://www.linkedin.com/in/rohan19725',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0A66C2',
    gradient: 'from-blue-500/20 to-blue-600/20',
    hoverGradient: 'from-blue-500/30 to-blue-600/30',
  },
  {
    id: 'github',
    title: 'GitHub',
    subtitle: 'github.com/rohan-k-dev',
    href: 'https://github.com/rohan-k-dev',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: '#a78bfa',
    gradient: 'from-purple-500/20 to-violet-500/20',
    hoverGradient: 'from-purple-500/30 to-violet-500/30',
  },
];

const ContactCard = ({ method, index }) => {
  return (
    <motion.a
      href={method.href}
      target={method.id !== 'email' ? '_blank' : undefined}
      rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative block"
    >
      {/* Glow Effect */}
      <div 
        className={`absolute -inset-0.5 bg-gradient-to-r ${method.gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
      />

      {/* Card */}
      <div className="relative h-full flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
        
        {/* Icon Container */}
        <div 
          className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${method.gradient} group-hover:${method.hoverGradient} transition-all duration-300`}
          style={{ color: method.color }}
        >
          {method.icon}
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-bold text-white mb-1">
            {method.title}
          </h3>
          <p className="text-sm text-gray-400 truncate">
            {method.subtitle}
          </p>
        </div>

        {/* Arrow Icon */}
        <div className="flex-shrink-0">
          <svg 
            className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
};

const ContactForm = () => {
  return (
    <section id="contact" className="relative py-32 md:py-40 lg:py-48">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Get In Touch
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Let's Connect
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of these channels.
            </p>

            {/* Availability Badge */}
            <div className="inline-flex items-start gap-4 p-5 bg-green-500/10 border border-green-500/20 rounded-2xl backdrop-blur-sm">
              <div className="relative flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
              </div>
              <div>
                <p className="text-white font-semibold text-base mb-1">
                  Available for internships & collaborations
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Open to SDE internships, ML projects, and freelance opportunities.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {CONTACT_METHODS.map((method, index) => (
              <ContactCard key={method.id} method={method} index={index} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
