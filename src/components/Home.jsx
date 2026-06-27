import { useEffect, useState } from "react";
import NodeNetwork from "./NodeNetwork";
import OrbitalSystem from "./OrbitalSystem";
import "../styles/Home.css";

function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="hero" id="home">
      <NodeNetwork />
      <div className="hero-glow"></div>
      <div className="hero-inner">
        <div className="hero-left">
          <span className="status-pill">
            <span className="dot"></span>
            Full Stack Developer
          </span>
          <h1>
            Hi, I'm<br />
            SOORYA <span className="hl">K R</span>
          </h1>
          <h2 className="sub-heading">Python Backend Developer | Django Developer | Full Stack Developer</h2>
          <p className="lead">
            Python Backend & Full Stack Developer with 1+ years of experience building scalable web applications, REST APIs, ERP integrations, and modern software solutions using Django, React, PostgreSQL, MongoDB and Docker.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              View My Work <span className="arrow">→</span>
            </a>

          </div>
          <div className="social-icons">
            <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/soorya-k-r-38478529a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          </div>
        </div>

        <div className="hero-right">
          <OrbitalSystem />
        </div>
      </div>
      {/* Premium SVG Wave Divider */}
      <div className="hero-wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V3.81C1132.19,26.9,1055.71,74.35,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>
    </header>
  );
}

export default Home;
