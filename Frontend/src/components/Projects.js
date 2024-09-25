import React from 'react';
import './styles/Projects.css';

const Projects = () => {
  return (
    <div className="projects-section">
      <h2 className="section-title">Projects</h2>
      <div className="projects-container">
        <div className="card">
          <h3>Project 1</h3>
          <p>Details about the first project go here. This will describe the objectives and outcomes.</p>
        </div>
        <div className="card">
          <h3>Project 2</h3>
          <p>Details about the second project go here. This will describe the objectives and outcomes.</p>
        </div>
        {/* Add more project cards as needed */}
      </div>
    </div>
  );
};

export default Projects;
