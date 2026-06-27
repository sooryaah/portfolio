import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";
import "../styles/Home.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Skills() {
  const skillCategories = [
    { title: "Languages", skills: "Python, JavaScript, Java, C, HTML5, CSS3", level: 90 },
    { title: "Backend & Frameworks", skills: "Django, Django REST Framework, FastAPI, React.js", level: 85 },
    { title: "Databases", skills: "PostgreSQL, MongoDB, SQLite, SQL", level: 88 },
    { title: "DevOps & Tools", skills: "Docker, Linux, Git, GitHub, GitHub Actions", level: 82 },
    { title: "Specializations", skills: "REST API Design, ERP Integration, OOP, Full-Stack Development", level: 87 },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="page-section" ref={sectionRef}>
      <div className="section-inner">
        <motion.span
          className="section-label"
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Skills
        </motion.span>

        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.1 }}
        >
          Technologies and tools I use daily.
        </motion.h2>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, idx) => (
            <motion.div key={category.title} variants={cardVariants}>
              <TiltCard className="skill-card">
                <h3>{category.title}</h3>
                <p>{category.skills}</p>
                <div className="skill-level">
                  <div className="level-bar-bg">
                    <motion.div
                      className="level-bar-fill"
                      initial={{ width: "0%" }}
                      animate={isInView ? { width: `${category.level}%` } : { width: "0%" }}
                      transition={{ duration: 0.9, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <motion.span
                    className="level-text"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    {category.level}%
                  </motion.span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
