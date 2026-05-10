import { logoIconsList } from "../constants";

const LogoShowcase = () => (
  <div className="logo-showcase">
    <p className="logo-showcase-label">Technologies & Tools</p>

    <div className="logo-track-wrap">
      <div className="logo-fade logo-fade--left" aria-hidden="true" />
      <div className="logo-fade logo-fade--right" aria-hidden="true" />

      <div className="logo-track" aria-label="Technology logos" role="img">
        {/* Two copies for seamless loop */}
        {[...logoIconsList, ...logoIconsList].map((icon, i) => (
          <div key={i} className="logo-item">
            <img
              src={icon.imgPath}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="logo-img"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LogoShowcase;
