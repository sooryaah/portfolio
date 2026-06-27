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
            Soorya <span className="hl">K R</span>
          </h1>
          <h2 className="sub-heading">Full Stack Developer</h2>
          <p className="lead">
            I build modern, responsive and scalable web applications with Python/Django stack and bring ideas to life on the web.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              View My Work <span className="arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact Me
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
    </header>
  );
}

export default Home;
