import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Filter } from "lucide-react";
import { useApi } from "../context/ApiContext";
import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";
import "./Projects.css";

const Projects = () => {
  const [config, setConfig] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { getConfig, getProjects } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configData, projectsData] = await Promise.all([
          getConfig(),
          getProjects(),
        ]);
        setConfig(configData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getConfig]);

  if (loading) {
    return <Loading />;
  }

  const siteConfig = config || {
    projects: [],
  };

  const allProjects =
    projects.length > 0 ? projects : siteConfig.projects || [];

  const filteredProjects =
    filter === "all"
      ? allProjects
      : allProjects.filter((project) => project.category === filter);

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web Apps" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "desktop", label: "Desktop" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="container">
          <motion.div
            className="projects-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>My Projects</h1>
            <p>
              A collection of my work spanning web applications, mobile apps,
              and interactive experiences. Each project represents a learning
              journey and a commitment to quality.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="projects-content">
        <div className="container">
          {/* Filter Tabs */}
          <motion.div
            className="filter-tabs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Filter size={18} />
            <div className="tabs">
              {categories.map((category) => (
                <button
                  key={category.value}
                  className={`filter-tab ${filter === category.value ? "active" : ""}`}
                  onClick={() => setFilter(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                custom={index}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              className="no-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>No projects found</h3>
              <p>Check back later for new projects!</p>
            </motion.div>
          )}

          {/* Stats Section */}
          <motion.div
            className="projects-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="stat">
              <span className="stat-number">{allProjects.length}</span>
              <span className="stat-label">Total Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {allProjects.filter((p) => p.category === "web").length}
              </span>
              <span className="stat-label">Web Apps</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {allProjects.filter((p) => p.category === "mobile").length}
              </span>
              <span className="stat-label">Mobile Apps</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {allProjects.reduce(
                  (acc, p) => acc + (p.technologies?.length || 0),
                  0,
                )}
              </span>
              <span className="stat-label">Technologies Used</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
