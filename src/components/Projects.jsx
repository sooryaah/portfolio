import { useEffect, useRef, useState } from "react";
import TiltCard from "./TiltCard";
import "../styles/Home.css";

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setTimeout(() => {
                setVisibleProjects((prev) => new Set([...prev, index]));
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) projectObserver.observe(ref);
    });

    return () => projectObserver.disconnect();
  }, [isVisible]);

  const projects = [
    {
      title: "Blockchain-Based Rental Service Platform",
      description:
        "Decentralized rental marketplace built with Django and blockchain technology. Implemented distributed ledger for immutable transaction recording, eliminating fraud risk and providing full audit transparency for property rental transactions.",
      tech: "Python, Django, Blockchain, PostgreSQL",
    },
    {
      title: "Personal Finance Tracker",
      description:
        "Full-stack financial management application with multi-category expense tracking, dynamic chart-based reporting, budget forecasting, and role-based authentication. Helps users gain insights into spending behavior with visual analytics.",
      tech: "Python, Django, Chart.js, SQLite",
    },
    {
      title: "Multi-Role Job Portal",
      description:
        "Three-tier recruitment platform (Admin, Employer, Job Seeker) with role-specific dashboards, access controls, job posting workflows, application tracking, and candidate filtering mirroring enterprise HR systems.",
      tech: "Python, Django, Bootstrap, PostgreSQL",
    },
  ];

  return (
    <section id="projects" className={`page-section scroll-fade-in ${isVisible ? "visible" : ""}`} ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label">Projects</span>
        <h2>Work that shipped to production.</h2>
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div key={project.title} ref={(el) => (projectRefs.current[idx] = el)}>
              <TiltCard
                className={`project-card scroll-rotate-in stagger-${idx + 1} ${
                  visibleProjects.has(idx) ? "visible" : ""
                } ${hoveredIndex === idx ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="project-icon">#{idx + 1}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p style={{ marginTop: "12px", fontSize: "13px", color: "#38bdf8" }}>
                  <strong>Stack:</strong> {project.tech}
                </p>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
