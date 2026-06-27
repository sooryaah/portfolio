import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../styles/Home.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Skills() {
  const skillCategories = [
    {
      icon: "🐍",
      title: "Backend",
      skills: ["Python", "Django", "Django REST Framework", "FastAPI"],
    },
    {
      icon: "⚛",
      title: "Frontend",
      skills: ["React", "JavaScript", "HTML5", "CSS3"],
    },
    {
      icon: "🗄",
      title: "Database",
      skills: ["PostgreSQL", "MongoDB", "SQLite", "MySQL"],
    },
    {
      icon: "⚙",
      title: "Tools & DevOps",
      skills: ["Docker", "Git", "GitHub", "Linux"],
    },
    {
      icon: "💡",
      title: "Specializations",
      skills: ["REST API Design", "ERP Integration", "OOP", "Full-Stack Development"],
    },
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
          Technologies I use to build scalable applications.
        </motion.h2>

        <motion.div
          className="skills-container"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              className="skill-category"
              variants={categoryVariants}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-title">{category.title}</h3>
              </div>

              <div className="skills-chips">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill}
                    className="skill-chip"
                    variants={chipVariants}
                    custom={skillIdx}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
