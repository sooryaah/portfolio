
import { useEffect, useRef, useState } from "react";
import "../styles/Home.css";

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [contactItemsVisible, setContactItemsVisible] = useState(new Set());
  const sectionRef = useRef(null);
  const contactItemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const contactObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = contactItemRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setTimeout(() => {
                setContactItemsVisible((prev) => new Set([...prev, index]));
              }, index * 100);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    contactItemRefs.current.forEach((ref) => {
      if (ref) contactObserver.observe(ref);
    });

    return () => contactObserver.disconnect();
  }, [isVisible]);

  const contactItems = [
    {
      label: "Email",
      value: "sooryakr2004@gmail.com",
      link: "mailto:sooryakr2004@gmail.com",
    },
    {
      label: "Phone",
      value: "+91 70252 27782 / +91 97479 92298",
      link: "tel:+917025227782",
    },
    {
      label: "Location",
      value: "Chelakkara, Thrissur, Kerala 680586",
      link: null,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/soorya",
      link: "https://linkedin.com/in/soorya",
    },
    {
      label: "GitHub",
      value: "github.com/sooryaah",
      link: "https://github.com/sooryaah",
    },
  ];

  return (
    <section id="contact" className={`page-section scroll-fade-in ${isVisible ? "visible" : ""}`} ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label">Contact</span>
        <h2>Let's build something together.</h2>
        <p className={`scroll-slide-left ${isVisible ? "visible" : ""}`}>
          I'm available for backend development, API architecture, and ERP
          integration work. Feel free to reach out for contract, freelance, or
          full-time opportunities.
        </p>
        <div className={`contact-info ${isVisible ? "visible" : ""}`}>
          {contactItems.map((item, idx) => (
            <p
              key={item.label}
              ref={(el) => (contactItemRefs.current[idx] = el)}
              className={`scroll-scale-in stagger-${(idx % 5) + 1} ${
                contactItemsVisible.has(idx) ? "visible" : ""
              }`}
            >
              <strong>{item.label}:</strong>{" "}
              {item.link ? (
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
