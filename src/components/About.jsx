import { useEffect, useRef, useState } from "react";
import illustrationImg from "../assets/illustration.png";
import "../styles/Home.css";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const highlights = [
    { icon: "✓", text: "1+ Years Industry Experience" },
    { icon: "✓", text: "10+ Projects Completed" },
    { icon: "✓", text: "REST API Development" },
    { icon: "✓", text: "ERP Integration" },
  ];

  const featureCards = [
    { icon: "💼", label: "Experience", value: "1+ Years" },
    { icon: "🚀", label: "Projects", value: "10+" },
    { icon: "⚡", label: "REST APIs", value: "20+ Built" },
    { icon: "📍", label: "Location", value: "Kerala, IN" },
  ];

  return (
    <section
      id="about"
      className={`page-section about-section scroll-fade-in ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      {/* Background decorative elements */}
      <div className="about-bg-glow about-bg-glow-1"></div>
      <div className="about-bg-glow about-bg-glow-2"></div>

      <div className="section-inner about-premium-grid">

        {/* ── Left Column ── */}
        <div className={`about-left-col scroll-slide-left ${isVisible ? "visible" : ""}`}>
          <span className="section-label">About Me</span>

          <h2 className="about-heading">
            Building scalable,<br />
            efficient, and<br />
            <span className="hl">user-focused</span> software.
          </h2>

          <p className="about-description">
            I'm a passionate Full Stack Developer who enjoys building modern web
            applications with <span className="kw">Python</span>, <span className="kw">Django</span>,{" "}
            <span className="kw">React</span>, and <span className="kw">PostgreSQL</span>. I focus
            on clean architecture, scalable solutions, and creating software that
            solves real-world problems.
          </p>

          <div className="about-divider"></div>

          <ul className="about-highlights">
            {highlights.map((h, i) => (
              <li key={i} className="about-highlight-item">
                <span className="highlight-icon">{h.icon}</span>
                {h.text}
              </li>
            ))}
          </ul>

          <div className="about-ctas">
            <a href="/resume.pdf" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Download Resume <span className="arrow">↓</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              Let's Connect
            </a>
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className={`about-right-col scroll-slide-right ${isVisible ? "visible" : ""}`}>
          <div className="about-image-wrapper">
            <div className="about-img-glow"></div>
            <img
              src={illustrationImg}
              alt="Developer workspace illustration"
              className="about-illustration"
            />

            {/* Feature cards overlaid */}
            <div className="about-feature-cards">
              {featureCards.map((card, i) => (
                <div className="about-feature-card" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
                  <span className="card-icon">{card.icon}</span>
                  <div className="card-info">
                    <span className="card-value">{card.value}</span>
                    <span className="card-label">{card.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
