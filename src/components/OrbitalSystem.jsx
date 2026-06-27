import { useEffect, useRef } from 'react';
import '../styles/OrbitalSystem.css';

const OrbitalSystem = () => {
  return (
    <div className="orbital-system">
      <div className="orbital-core">
        <div className="core-glow"></div>
        <div className="core-inner">
          <i className="fas fa-code"></i>
        </div>
      </div>

      {/* Ring 1 - Frontend */}
      <div className="orbit ring-1">
        <div className="planet p-react">
          <i className="fab fa-react"></i>
        </div>
        <div className="planet p-js">
          <i className="fab fa-js"></i>
        </div>
      </div>

      {/* Ring 2 - Backend */}
      <div className="orbit ring-2">
        <div className="planet p-python">
          <i className="fab fa-python"></i>
        </div>
        <div className="planet p-node">
          <i className="fab fa-node-js"></i>
        </div>
      </div>

      {/* Ring 3 - Database/Tools */}
      <div className="orbit ring-3">
        <div className="planet p-db">
          <i className="fas fa-database"></i>
        </div>
        <div className="planet p-git">
          <i className="fab fa-git-alt"></i>
        </div>
        <div className="planet p-docker">
          <i className="fab fa-docker"></i>
        </div>
      </div>
      
      {/* Decorative stars/particles */}
      <div className="space-dust dust-1"></div>
      <div className="space-dust dust-2"></div>
      <div className="space-dust dust-3"></div>
    </div>
  );
};

export default OrbitalSystem;
