import { useState, useEffect } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", to: "#home" },
    { label: "About", to: "#about" },
    { label: "Skills", to: "#skills" },
    { label: "Projects", to: "#projects" },
    { label: "Contact", to: "#contact" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
        Soorya<span className="logo-dot">.</span>
      </a>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        {navItems.map((item) => (
          <li key={item.to}>
            <a href={item.to} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <button className="theme-toggle" aria-label="Toggle theme">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>

      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;
