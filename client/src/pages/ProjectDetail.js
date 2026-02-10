import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Folder,
  Tag,
} from "lucide-react";
import { useApi } from "../context/ApiContext";
import Loading from "../components/Loading";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getProject, getConfig } = useApi();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);

        // Try to fetch from API first
        let projectData = null;

        if (id && !isNaN(id)) {
          // If it's a numeric ID, try to fetch from API
          projectData = await getProject(id);
        }

        if (!projectData) {
          // Fallback to config data
          const config = await getConfig();
          if (config && config.projects) {
            projectData = config.projects.find(
              (p) => p.id === parseInt(id) || p.id === id,
            );
          }
        }

        if (projectData) {
          setProject(projectData);
        } else {
          setError("Project not found");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, getProject, getConfig]);

  if (loading) {
    return <Loading />;
  }

  if (error || !project) {
    return (
      <div className="project-detail-error">
        <div className="container">
          <motion.div
            className="error-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Project Not Found</h1>
            <p>
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/projects" className="btn btn-primary">
              <ArrowLeft size={18} />
              Back to Projects
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    technologies = [],
    features = [],
    demoUrl,
    githubUrl,
    liveUrl,
    status,
    category,
  } = project;

  const categoryLabels = {
    web: "Web Application",
    mobile: "Mobile App",
    desktop: "Desktop Application",
    other: "Project",
  };

  return (
    <div className="project-detail">
      <section className="project-hero">
        <div className="container">
          <motion.div
            className="project-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/projects" className="back-link">
              <ArrowLeft size={20} />
              Back to Projects
            </Link>

            <div className="project-header">
              <div className="project-category">
                <Folder size={20} />
                <span>{categoryLabels[category] || "Project"}</span>
              </div>
              <h1>{title}</h1>
              <div className="project-meta">
                {status && (
                  <span className={`status-badge ${status}`}>
                    {status.replace("-", " ")}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="project-content">
        <div className="container">
          <motion.div
            className="project-main"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="project-info">
              <div className="content-section">
                <h2>About this Project</h2>
                <p>{description}</p>
              </div>

              {features.length > 0 && (
                <div className="content-section">
                  <h3>Key Features</h3>
                  <ul className="features-list">
                    {features.map((feature, index) => (
                      <li key={index}>
                        <span className="feature-bullet"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="content-section">
                <h3>Technologies Used</h3>
                <div className="tech-stack">
                  {technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      <Tag size={14} />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="project-sidebar">
              <div className="sidebar-card">
                <h3>Project Links</h3>
                <div className="project-actions">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn"
                    >
                      <Github size={20} />
                      <span>View Code</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {demoUrl && (
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn"
                    >
                      <ExternalLink size={20} />
                      <span>Visit Site</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              <div className="sidebar-card">
                <h3>Project Info</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Category</span>
                    <span className="info-value">
                      {categoryLabels[category] || "Project"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status</span>
                    <span className={`status-badge ${status}`}>
                      {status?.replace("-", " ") || "Completed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
