import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ShapeGrid from "./ShapeGrid";
import "../styles/Home.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const contactItems = [
    { label: "Email", value: "sooryakr2004@gmail.com", link: "mailto:sooryakr2004@gmail.com" },
    { label: "Phone", value: "+91 70252 27782 / +91 97479 92298", link: "tel:+917025227782" },
    { label: "Location", value: "Chelakkara, Thrissur, Kerala 680586", link: null },
    { label: "LinkedIn", value: "linkedin.com/in/soorya", link: "https://linkedin.com/in/soorya" },
    { label: "GitHub", value: "github.com/sooryaah", link: "https://github.com/sooryaah" },
  ];

  return (
    <section
      id="contact"
      className="page-section contact-section"
      ref={sectionRef}
    >
      {/* ShapeGrid Background */}
      <div className="contact-shapegrid-bg">
        <ShapeGrid
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(124, 58, 237, 0.25)"
          hoverFillColor="#7c3aed"
          shape="square"
          hoverTrailAmount={5}
        />
      </div>

      <div className="section-inner contact-inner">
        <motion.span
          className="section-label"
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Contact
        </motion.span>

        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.1 }}
        >
          Let's build something together.
        </motion.h2>

        <motion.p
          className="contact-lead"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          I'm available for backend development, API architecture, and ERP
          integration work. Feel free to reach out for contract, freelance, or
          full-time opportunities.
        </motion.p>

        <motion.div
          className="contact-cards"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {contactItems.map((item) => (
            <motion.div key={item.label} className="contact-card" variants={itemVariants}>
              <span className="contact-card-label">{item.label}</span>
              {item.link ? (
                <a
                  href={item.link}
                  className="contact-card-value"
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {item.value}
                </a>
              ) : (
                <span className="contact-card-value">{item.value}</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
