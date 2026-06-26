import { useEffect, useRef, useState } from "react";
import "../styles/Home.css";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [paragraphsVisible, setParagraphsVisible] = useState(new Set());
  const sectionRef = useRef(null);
  const paragraphRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const paragraphObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = paragraphRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setParagraphsVisible((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    paragraphRefs.current.forEach((ref) => {
      if (ref) paragraphObserver.observe(ref);
    });

    return () => paragraphObserver.disconnect();
  }, [isVisible]);

  return (
    <section
      id="about"
      className={`page-section scroll-fade-in ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
    >
      <div className="section-inner">
        <span className="section-label">About</span>
        <h2>Backend engineer shipping production systems.</h2>
        <p
          ref={(el) => (paragraphRefs.current[0] = el)}
          className={`scroll-slide-left ${paragraphsVisible.has(0) ? "visible" : ""}`}
        >
          I'm a Backend Python Developer with 2+ years of industry experience
          building scalable web applications and RESTful APIs. Currently at
          Alkor Cyber Space, I architect backend services, lead ERP integration
          projects, and optimize database systems for high-performance
          environments.
        </p>
        <p
          ref={(el) => (paragraphRefs.current[1] = el)}
          className={`scroll-slide-right ${paragraphsVisible.has(1) ? "visible" : ""}`}
          style={{ marginTop: "16px" }}
        >
          I specialize in Django, Django REST Framework, PostgreSQL, and Docker.
          I'm committed to clean, maintainable code aligned with enterprise
          engineering standards. When I'm not coding, I contribute to
          open-source projects and explore new backend technologies.
        </p>
      </div>
    </section>
  );
}

export default About;
