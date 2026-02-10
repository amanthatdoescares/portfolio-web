import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  const {
    title,
    shortDescription,
    technologies = [],
    githubUrl,
    demoUrl,
    category,
  } = project;

  const categoryIcons = {
    web: "💼",
    mobile: "📱",
    desktop: "🖥️",
    other: "📁",
  };

  return (
    <motion.div
      className="project-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="project-icon">
        <Folder size={32} />
        <span className="category-badge">
          {categoryIcons[category] || "📁"}
        </span>
      </div>

      <h3 className="project-title">{title}</h3>

      <p className="project-description">{shortDescription}</p>

      <div className="project-technologies">
        {technologies.slice(0, 4).map((tech, index) => (
          <span key={index} className="tech-tag">
            {tech}
          </span>
        ))}
        {technologies.length > 4 && (
          <span className="tech-tag more">+{technologies.length - 4}</span>
        )}
      </div>

      <div className="project-links">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            aria-label="View source code"
          >
            <Github size={20} />
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            aria-label="View live demo"
          >
            <ExternalLink size={20} />
          </a>
        )}
        <Link
          to={`/projects/${project.id}`}
          className="project-link"
          aria-label="View project details"
        >
          <ExternalLink size={20} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
