import { useEffect, useState } from 'react';
import '../styles/Cursor.css';

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (isHidden) setIsHidden(false);
      
      const target = e.target;
      const isHoverable = target.closest('a, button, .skill-card, .project-card, .status-pill, .hire-btn, .menu-toggle');
      setLinkHovered(!!isHoverable);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <>
      <div 
        className={`custom-cursor-dot ${linkHovered ? 'hovered' : ''} ${clicked ? 'clicked' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>
      <div 
        className={`custom-cursor-ring ${linkHovered ? 'hovered' : ''} ${clicked ? 'clicked' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>
    </>
  );
}
