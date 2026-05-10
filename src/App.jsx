import { lazy, Suspense } from 'react';
import Navbar from './components/NavBar';

// Lazy load heavy sections
const Hero = lazy(() => import('./sections/Hero'));
const Projects = lazy(() => import('./sections/Projects'));
const LogoShowcase = lazy(() => import('./sections/LogoShowcase'));
const About = lazy(() => import('./sections/About'));
const Experience = lazy(() => import('./sections/Experience'));
const TechStack = lazy(() => import('./sections/TechStack'));
const Certifications = lazy(() => import('./sections/Certifications'));
const ContactForm = lazy(() => import('./sections/ContactForm'));
const Footer = lazy(() => import('./sections/Footer'));

// Minimal loading fallback
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <>
    <Navbar />
    
    <Suspense fallback={<SectionLoader />}>
      <Hero />
    </Suspense>
    
    <Suspense fallback={null}>
      <Projects />
    </Suspense>
    
    <Suspense fallback={null}>
      <LogoShowcase />
    </Suspense>
    
    <Suspense fallback={null}>
      <About />
    </Suspense>
    
    <Suspense fallback={null}>
      <Experience />
    </Suspense>
    
    <Suspense fallback={null}>
      <TechStack />
    </Suspense>
    
    <Suspense fallback={null}>
      <Certifications />
    </Suspense>
    
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
    
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </>
);

export default App;
