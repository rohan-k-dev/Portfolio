import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    ref: "main",
    imgSrc: "/images/project1.png",
    imgAlt: "ProctoAI — AI Exam Proctoring Platform",
    title: "ProctoAI — AI-Powered Exam Proctoring",
    desc: "Real-time face detection, gaze tracking, and behavioral anomaly detection for scalable remote assessments. Built with React, Python, and Google Cloud.",
    badges: ["🏆 Hackathon Winner", "AI · GCP · React"],
    github: "https://github.com/rohan-k-dev",
  },
  {
    ref: "second",
    imgSrc: "/images/project2.png",
    imgAlt: "RecruitIQ — Intelligent Recruitment Platform",
    title: "RecruitIQ",
    badges: ["Full-Stack · Node.js · MongoDB"],
    github: "https://github.com/rohan-k-dev",
  },
  {
    ref: "third",
    imgSrc: "/images/project3.png",
    imgAlt: "AquaCast — Water Quality Prediction",
    title: "AquaCast",
    badges: ["ML · Python · Firebase"],
    github: "https://github.com/rohan-k-dev",
  },
];

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const mainRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);

  const refs = { main: mainRef, second: secondRef, third: thirdRef };

  useGSAP(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

    [mainRef, secondRef, thirdRef].forEach((ref, index) => {
      gsap.fromTo(
        ref.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: { trigger: ref.current, start: "top bottom-=100" },
        }
      );
    });
  }, []);

  const [main, second, third] = projects;

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* Featured project */}
          <div ref={mainRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src={main.imgSrc} alt={main.imgAlt} />
            </div>
            <div className="text-content">
              <div className="badges">
                {main.badges.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-black-200 text-white-50 border border-black-50"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <h2>{main.title}</h2>
              <p className="text-white-50 md:text-xl">{main.desc}</p>
              <a
                href={main.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 text-sm text-white-50 hover:text-white transition-colors duration-200"
              >
                <img src="/images/logos/git.svg" alt="GitHub" className="size-4" />
                View on GitHub →
              </a>
            </div>
          </div>

          {/* Side projects */}
          <div className="project-list-wrapper overflow-hidden">
            {[{ ref: secondRef, data: second }, { ref: thirdRef, data: third }].map(({ ref, data }) => (
              <div key={data.title} className="project" ref={ref}>
                <div className="image-wrapper bg-[#1c1c21]">
                  <img src={data.imgSrc} alt={data.imgAlt} />
                </div>
                <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                  <h2>{data.title}</h2>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-black-200 text-white-50 border border-black-50">
                    {data.badges[0]}
                  </span>
                </div>
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1 text-xs text-white-50 hover:text-white transition-colors duration-200"
                >
                  <img src="/images/logos/git.svg" alt="GitHub" className="size-3" />
                  GitHub →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
