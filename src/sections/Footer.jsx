import { socialImgs, navLinks } from "../constants";

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer-inner">

      {/* Top row */}
      <div className="site-footer-top">
        {/* Brand */}
        <div className="site-footer-brand">
          <a href="#hero" className="site-footer-logo">
            Rohan<span>.</span>dev
          </a>
          <p className="site-footer-tagline">
            Full-Stack · ML · Cloud · BMSCE '27
          </p>
        </div>

        {/* Nav */}
        <nav aria-label="Footer navigation" className="site-footer-nav">
          {navLinks.map(({ link, name }) => (
            <a key={name} href={link} className="site-footer-nav-link">{name}</a>
          ))}
        </nav>

        {/* Actions */}
        <div className="site-footer-actions">
          <a
            href="/resume.pdf"
            download
            className="site-footer-resume"
            aria-label="Download resume PDF"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
          <div className="site-footer-socials">
            {socialImgs.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-social-icon"
                aria-label={s.name}
              >
                <img src={s.imgPath} alt="" className="size-4 object-contain" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="site-footer-bottom">
        <p>© {new Date().getFullYear()} Rohan Kumar. All rights reserved.</p>
        <p>Built with React · Three.js · GSAP</p>
      </div>

    </div>
  </footer>
);

export default Footer;
