import { useEffect, useState } from "react";
import TiltCard from "./TiltCard";
import NodeNetwork from "./NodeNetwork";
import heroPng from "../assets/profile.jpg";
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
          <div className="portrait-wrapper">
            <TiltCard className="portrait-card">
              <div className="portrait-glow-ring"></div>
              <img
                src={heroPng}
                alt="Soorya K R"
                className="portrait-photo"
              />
            </TiltCard>
            {/* Badges outside the card so they aren't clipped by overflow:hidden */}
            <div className="badge badge-exp">
              <span className="badge-num">2+</span>
              <span className="badge-text">Years<br />Experience</span>
            </div>
            <div className="badge badge-code">
              <span>&lt;/&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;