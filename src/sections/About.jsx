import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Full-Stack Development",
    desc: "React frontends, Node/Express APIs, SQL & NoSQL databases. End-to-end ownership from schema design to production deploy.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6v6l4 2" />
        <circle cx="18" cy="6" r="3" />
        <path d="M21 3l-3 3" />
      </svg>
    ),
    title: "Machine Learning",
    desc: "Python-based ML pipelines using Scikit-learn and OpenCV. Applied to real problems — proctoring, water quality prediction, NLP screening.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
      </svg>
    ),
    title: "Cloud & Infrastructure",
    desc: "Google Cloud Platform for deployment, Firebase for real-time data, and REST API architecture built for scale from day one.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Systems Thinking",
    desc: "I design before I code. Data models, API contracts, and component boundaries are defined upfront — not refactored later.",
  },
];

const STACK = [
  "React", "Node.js", "Express", "Python",
  "MongoDB", "SQL", "Firebase", "Google Cloud", "Java", "Git",
];

const About = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".about-left",
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );
    gsap.fromTo(
      ".about-cap-card",
      { y: 32, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-right", start: "top 80%" },
      }
    );
    gsap.fromTo(
      ".about-availability",
      { y: 16, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".about-availability", start: "top 90%" },
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="about-inner">

        {/* ── Top label ── */}
        <p className="about-label">
          <span className="about-label-line" />
          About
        </p>

        <div className="about-grid">

          {/* ── LEFT: Bio ── */}
          <div className="about-left">
            <h2 className="about-heading">
              I build things that<br />
              <span className="about-heading-accent">actually work.</span>
            </h2>

            <div className="about-bio">
              <p>
                I'm a third-year Information Science student at BMSCE Bangalore,
                focused on building full-stack systems and applying ML to problems
                worth solving. I don't just write code — I think about architecture,
                data flow, and what happens at scale.
              </p>
              <p>
                My work spans web applications, intelligent backends, and
                cloud-deployed pipelines. I've shipped projects under hackathon
                pressure and built tools used by real users. I'm looking for
                environments where engineering quality is taken seriously.
              </p>
            </div>

            {/* Stack pills */}
            <div className="about-stack">
              {STACK.map((tech) => (
                <span key={tech} className="about-stack-pill">{tech}</span>
              ))}
            </div>

            {/* Quick facts */}
            <dl className="about-facts">
              <div className="about-fact">
                <dt>Degree</dt>
                <dd>B.Tech Information Science & Engineering</dd>
              </div>
              <div className="about-fact">
                <dt>College</dt>
                <dd>BMS College of Engineering, Bangalore</dd>
              </div>
              <div className="about-fact">
                <dt>Graduating</dt>
                <dd>2027</dd>
              </div>
              <div className="about-fact">
                <dt>GitHub</dt>
                <dd>
                  <a
                    href="https://github.com/rohan-k-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-link"
                  >
                    github.com/rohan-k-dev ↗
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* ── RIGHT: Capability cards ── */}
          <div className="about-right">
            {CAPABILITIES.map(({ icon, title, desc }) => (
              <div key={title} className="about-cap-card">
                <div className="about-cap-icon">{icon}</div>
                <div>
                  <h3 className="about-cap-title">{title}</h3>
                  <p className="about-cap-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Availability bar ── */}
        <div className="about-availability">
          <span className="about-avail-dot" />
          <span className="about-avail-text">
            Currently open to <strong>SDE internships</strong> and <strong>research collaborations</strong> — Summer / Fall 2025
          </span>
          <a
            href="#contact"
            className="about-avail-cta"
          >
            Get in touch →
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;
