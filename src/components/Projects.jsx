import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";
import "../styles/Home.css";
import "../styles/Projects.css";

// Import project images directly
import blockchainImg from "../assets/blockchain-project.svg?url";
import financeImg from "../assets/finance-tracker.svg?url";
import jobPortalImg from "../assets/job-portal.svg?url";
import ecommerceImg from "../assets/ecommerce-platform.svg?url";
import carAccessoriesImg from "../assets/car-accessories-platform.svg?url";
import pharmacyImg from "../assets/pharmacy-ordering-app.svg?url";

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

  // TODO: replace these with your real demo/GitHub links
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A complete online shopping system with a customer storefront, admin and staff dashboard, and Python-based backend APIs. Supports product browsing, cart management, order placement, Razorpay payments, refund and cancellation workflows, and Excel sales reporting for auditing and operations.",
      tech: "React, Python, Django/FastAPI, PostgreSQL, Razorpay",
      image: ecommerceImg,
      link: "https://github.com/yourusername/ecommerce-platform",
    },
    {
      title: "Pharmacy Retailer Ordering App",
      description:
        "A mobile-friendly ordering platform for pharmacy retailers to place medicine requests from a warehouse. It includes KYC onboarding, real-time stock and pricing from ERP APIs, order validation, invoicing, dispatch tracking, COD and Razorpay payments, and refund synchronization for returns and cancellations.",
      tech: "React Native/Flutter, Python, ERP APIs, PostgreSQL, Razorpay",
      image: pharmacyImg,
      link: "https://github.com/yourusername/pharmacy-ordering-app",
    },
    {
      title: "Ecommerce Car Accessories Platform",
      description:
        "Built a full-stack multi-vendor car accessories marketplace with DRF backend and React/Vite vendor/admin dashboard. Features JWT auth, OTP/email verification, vendor onboarding, payouts, search, cart, checkout, and notifications.",
      tech: "Django, DRF, React, Vite, PostgreSQL/SQLite, Celery, Redis, Stripe, Razorpay, Firebase",
      image: carAccessoriesImg,
      link: "https://github.com/yourusername/ecommerce-car-accessories-platform",
    },
    {
      title: "Blockchain-Based Rental Service Platform",
      description:
        "Decentralized rental marketplace built with Django and blockchain technology. Implemented distributed ledger for immutable transaction recording, eliminating fraud risk and providing full audit transparency for property rental transactions.",
      tech: "Python, Django, Blockchain, PostgreSQL",
      image: blockchainImg,
      link: "https://github.com/yourusername/blockchain-rental-platform",
    },
    {
      title: "Personal Finance Tracker",
      description:
        "Full-stack financial management application with multi-category expense tracking, dynamic chart-based reporting, budget forecasting, and role-based authentication. Helps users gain insights into spending behavior with visual analytics.",
      tech: "Python, Django, Chart.js, SQLite",
      image: financeImg,
      link: "https://github.com/yourusername/finance-tracker",
    },
    {
      title: "Multi-Role Job Portal",
      description:
        "Three-tier recruitment platform (Admin, Employer, Job Seeker) with role-specific dashboards, access controls, job posting workflows, application tracking, and candidate filtering mirroring enterprise HR systems.",
      tech: "Python, Django, Bootstrap, PostgreSQL",
      image: jobPortalImg,
      link: "https://github.com/yourusername/job-portal",
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
          {projects.map((project) => (
            <motion.div key={project.title} variants={cardVariants}>
              <TiltCard className="project-card">
                {project.image ? (
                  <img
                    className="project-card-image"
                    src={project.image}
                    alt={project.title}
                  />
                ) : (
                  <div className="project-card-image project-card-image-fallback">
                    <span>{project.title.charAt(0)}</span>
                  </div>
                )}
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-stack">
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