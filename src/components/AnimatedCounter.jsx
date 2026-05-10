import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    countersRef.current.forEach((counter, index) => {
      const numberEl = counter.querySelector(".counter-number");
      const item = counterItems[index];

      gsap.set(numberEl, { innerText: "0" });
      gsap.to(numberEl, {
        innerText: item.value,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: { trigger: "#counter", start: "top 85%" },
        onComplete: () => {
          numberEl.textContent = `${item.value}${item.suffix}`;
        },
      });
    }, counterRef);

    gsap.fromTo(
      ".counter-card",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "#counter", start: "top 85%" },
      }
    );
  }, []);

  return (
    <div id="counter" ref={counterRef} className="hero-counter-strip">
      {counterItems.map((item, index) => (
        <div
          key={index}
          ref={(el) => el && (countersRef.current[index] = el)}
          className="counter-card"
        >
          <div className="counter-number">{item.value}{item.suffix}</div>
          <div className="counter-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedCounter;
