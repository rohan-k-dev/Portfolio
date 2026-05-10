import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

const Testimonials = () => {
  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Projects I've Built"
          sub="🚀 A Closer Look at My Work"
        />

        <div className="lg:columns-2 columns-1 mt-16 gap-8">
          {testimonials.map((project, index) => (
            <GlowCard card={project} key={index} index={index}>
              <div className="flex items-start gap-3 mb-4">
                <div className="size-10 rounded-full bg-black-200 border border-black-50 flex items-center justify-center flex-shrink-0 text-lg">
                  {index === 0 ? "🤖" : index === 1 ? "💼" : index === 2 ? "💧" : "🎓"}
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{project.name}</p>
                  <p className="text-white-50 text-sm font-mono">{project.mentions}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
