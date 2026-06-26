import { useEffect, useRef, useState } from "react";
import TiltCard from "./TiltCard";
import "../styles/Home.css";

function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      skills: "Python, JavaScript, Java, C, HTML5, CSS3",
      level: 90,
    },
    {
      title: "Backend & Frameworks",
      skills: "Django, Django REST Framework, FastAPI, React.js",
      level: 85,
    },
    {
      title: "Databases",
      skills: "PostgreSQL, MongoDB, SQLite, SQL",
      level: 88,
    },
    {
      title: "DevOps & Tools",
      skills: "Docker, Linux, Git, GitHub, GitHub Actions",
      level: 82,
    },
    {
      title: "Specializations",
      skills: "REST API Design, ERP Integration, OOP, Full-Stack Development",
      level: 87,
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setVisibleCards((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => cardObserver.disconnect();
  }, [isVisible]);

  return (
    <section id="skills" className={`page-section scroll-fade-in ${isVisible ? "visible" : ""}`} ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label">Skills</span>
        <h2>Technologies and tools I use daily.</h2>
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={category.title} ref={(el) => (cardRefs.current[idx] = el)}>
              <TiltCard
                className={`skill-card scroll-scale-in stagger-${(idx % 5) + 1} ${
                  visibleCards.has(idx) ? "visible" : ""
                }`}
              >
                <h3>{category.title}</h3>
                <p>{category.skills}</p>
                <div className="skill-level">
                  <div className="level-bar-bg">
                    <div
                      className="level-bar-fill"
                      style={{
                        width: visibleCards.has(idx) ? `${category.level}%` : "0%",
                        transitionDelay: `${idx * 0.1}s`,
                      }}
                    ></div>
                  </div>
                  <span className="level-text">
                    {visibleCards.has(idx) ? category.level : 0}%
                  </span>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
