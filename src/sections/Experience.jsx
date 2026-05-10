import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements } from "../constants";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);



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
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="exp-section">
      <div className="exp-inner">

        <TitleHeader
          title="Achievements"
          sub="🏅 Hackathons & Competitions"
        />

        {/* ── Achievements ── */}
        <div className="ach-grid">
          {achievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
