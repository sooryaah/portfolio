import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";
import "../styles/Home.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const projects = [
    {
      title: "Blockchain-Based Rental Service Platform",
      description:
        "Decentralized rental marketplace built with Django and blockchain technology. Implemented distributed ledger for immutable transaction recording, eliminating fraud risk and providing full audit transparency for property rental transactions.",
      tech: "Python, Django, Blockchain, PostgreSQL",
      image: new URL("../assets/blockchain-project.svg", import.meta.url).href,
    },
    {
      title: "Personal Finance Tracker",
      description:
        "Full-stack financial management application with multi-category expense tracking, dynamic chart-based reporting, budget forecasting, and role-based authentication. Helps users gain insights into spending behavior with visual analytics.",
      tech: "Python, Django, Chart.js, SQLite",
      image: new URL("../assets/finance-tracker.svg", import.meta.url).href,
    },
    {
      title: "Multi-Role Job Portal",
      description:
        "Three-tier recruitment platform (Admin, Employer, Job Seeker) with role-specific dashboards, access controls, job posting workflows, application tracking, and candidate filtering mirroring enterprise HR systems.",
      tech: "Python, Django, Bootstrap, PostgreSQL",
      image: new URL("../assets/job-portal.svg", import.meta.url).href,
    },
  ];

  return (
    <section id="projects" className="page-section" ref={sectionRef}>
      <div className="section-inner">
        <motion.span
          className="section-label"
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Projects
        </motion.span>

        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.1 }}
        >
          Work that shipped to production.
        </motion.h2>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, idx) => (
            <motion.div key={project.title} variants={cardVariants}>
              <TiltCard 
                className="project-card"
                style={{
                  backgroundImage: `url('${project.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundAttachment: "fixed",
                }}
              >
                <div className="project-content">
                  <div className="project-icon">#{idx + 1}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p style={{ marginTop: "12px", fontSize: "13px", color: "#38bdf8" }}>
                    <strong>Stack:</strong> {project.tech}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
