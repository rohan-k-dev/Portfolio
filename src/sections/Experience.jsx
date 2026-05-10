import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements, certifications } from "../constants";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

/* ── Inline SVG icons ── */
const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/* ── Achievement card ── */
const AchievementCard = ({ item, index }) => (
  <div
    className="ach-card"
    style={{ "--accent": item.accent }}
  >
    {/* Top bar */}
    <div className="ach-top-bar" style={{ background: item.accent }} />

    <div className="ach-body">
      {/* Header row */}
      <div className="ach-header">
        <div className="ach-icon-wrap">{item.icon}</div>
        <div className="ach-rank-badge" style={{ "--accent": item.accent }}>
          {item.rank}
        </div>
      </div>

      {/* Title block */}
      <div className="ach-title-block">
        <h3 className="ach-title">{item.title}</h3>
        <p className="ach-organizer">{item.organizer}</p>
      </div>

      {/* Description */}
      <p className="ach-desc">{item.description}</p>

      {/* Tags */}
      <div className="ach-tags">
        {item.tags.map((tag) => (
          <span key={tag} className="ach-tag">{tag}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="ach-footer">
        <span className="ach-date">{item.date}</span>
        <span className="ach-prize" style={{ color: item.accent }}>
          {item.prize}
        </span>
      </div>
    </div>
  </div>
);

/* ── Certification card ── */
const CertCard = ({ cert }) => (
  <div className="cert-card" style={{ "--accent": cert.accent }}>
    <div className="cert-icon-wrap" style={{ "--accent": cert.accent }}>
      <ShieldIcon />
    </div>

    <div className="cert-body">
      <p className="cert-issuer">{cert.issuer}</p>
      <h4 className="cert-title">{cert.title}</h4>
      <p className="cert-issued">Issued {cert.issued}</p>
    </div>

    <a
      href={cert.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-link"
      style={{ "--accent": cert.accent }}
    >
      View <ExternalIcon />
    </a>
  </div>
);

/* ── Section ── */
const Experience = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Achievement cards — stagger in from bottom
    gsap.fromTo(
      ".ach-card",
      { y: 48, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: ".ach-grid", start: "top 82%" },
      }
    );

    // Cert cards — stagger in from bottom
    gsap.fromTo(
      ".cert-card",
      { y: 32, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".cert-row", start: "top 85%" },
      }
    );

    // Section divider line draw
    gsap.fromTo(
      ".exp-divider-line",
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1, ease: "power2.inOut",
        scrollTrigger: { trigger: ".exp-divider-line", start: "top 88%" },
      }
    );
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="exp-section">
      <div className="exp-inner">

        <TitleHeader
          title="Achievements & Certifications"
          sub="🏅 Recognition & Learning"
        />

        {/* ── Achievements ── */}
        <div className="exp-block">
          <p className="exp-block-label">
            <span className="exp-block-label-line" />
            Hackathons & Competitions
          </p>

          <div className="ach-grid">
            {achievements.map((item, i) => (
              <AchievementCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="exp-divider">
          <div className="exp-divider-line" />
        </div>

        {/* ── Certifications ── */}
        <div className="exp-block">
          <p className="exp-block-label">
            <span className="exp-block-label-line" />
            Certifications
          </p>

          <div className="cert-row">
            {certifications.map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
