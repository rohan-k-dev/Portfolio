import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TitleHeader = ({ title, sub }) => {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { y: 24, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      }
    );
  }, []);

  return (
    <div ref={ref} className="title-header">
      <span className="title-header-sub">{sub}</span>
      <h2 className="title-header-text">{title}</h2>
    </div>
  );
};

export default TitleHeader;
