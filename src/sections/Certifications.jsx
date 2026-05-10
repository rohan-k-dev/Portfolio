/* ═══════════════════════════════════════════════════════════════
   CERTIFICATIONS SECTION
   
   Premium certification cards with real credentials
═══════════════════════════════════════════════════════════════ */

import React from 'react';
import { motion } from 'framer-motion';

const CERTIFICATIONS = [
  {
    id: 1,
    title: 'Google Cloud Engineering Certificate',
    issuer: 'Google Cloud',
    issueDate: 'Dec 2024',
    skills: ['Cloud Computing', 'GCP', 'Infrastructure', 'DevOps'],
    credential: 'https://www.credly.com/badges/0244e158-cea1-4186-8e58-a3285d46a49d/linked_in_profile',
    icon: '☁️',
    color: '#4285F4', // Google Blue
  },
  {
    id: 2,
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'Coursera',
    issueDate: 'Nov 2024',
    skills: ['Machine Learning', 'Python', 'Regression', 'Classification'],
    credential: 'https://www.coursera.org/account/accomplishments/verify/SPXRI7V4QAN8',
    icon: '🧠',
    color: '#0056D2', // Coursera Blue
  },
  {
    id: 3,
    title: 'Full Stack Web Development',
    issuer: 'Coursera',
    issueDate: 'Oct 2024',
    skills: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    credential: 'https://www.coursera.org/account/accomplishments/verify/K5QZBPX60VQG',
    icon: '💻',
    color: '#0056D2', // Coursera Blue
  },
];

const CertificationCard = React.memo(({ cert, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      {/* Glowing Border Effect */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${cert.color}40, ${cert.color}20)` }}
      />

      {/* Card */}
      <div className="relative h-full flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: `${cert.color}20` }}
            >
              {cert.icon}
            </div>
            
            {/* Issuer Badge */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: cert.color }}>
                {cert.issuer}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{cert.issueDate}</p>
            </div>
          </div>

          {/* Verified Badge */}
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
            <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium text-green-400">Verified</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 leading-tight flex-grow">
          {cert.title}
        </h3>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* View Credential Button - Always at bottom */}
        <div className="mt-auto">
        <a
          href={cert.credential}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group/btn"
          style={{ 
            background: `${cert.color}20`,
            color: cert.color,
            border: `1px solid ${cert.color}30`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${cert.color}30`;
            e.currentTarget.style.borderColor = `${cert.color}50`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `${cert.color}20`;
            e.currentTarget.style.borderColor = `${cert.color}30`;
          }}
        >
          <span>View Credential</span>
          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        </div>
      </div>
    </motion.div>
  );
});

CertificationCard.displayName = 'CertificationCard';

const Certifications = () => {
  return (
    <section id="certifications" className="relative py-32 md:py-40 lg:py-48">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Certifications
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Professional Certifications
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Industry-recognized certifications validating expertise in cloud computing, machine learning, and full-stack development.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {CERTIFICATIONS.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-sm text-gray-400/70">
            All credentials are verified and can be validated through the issuing platforms.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
