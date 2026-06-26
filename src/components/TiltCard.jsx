import { useRef, useState, useCallback } from 'react';

export default function TiltCard({ children, className = '', style = {}, onClick, onMouseEnter, onMouseLeave }) {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
  });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  }, []);

  const handleMouseLeaveInternal = useCallback((e) => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
    });
    if (onMouseLeave) onMouseLeave(e);
  }, [onMouseLeave]);
  
  const handleMouseEnterInternal = useCallback((e) => {
    if (onMouseEnter) onMouseEnter(e);
  }, [onMouseEnter]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ ...style, ...tiltStyle, willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveInternal}
      onMouseEnter={handleMouseEnterInternal}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
