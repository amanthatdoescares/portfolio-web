import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Palette, Instagram, Dribbble } from "lucide-react";
import { useApi } from "../context/ApiContext";
import Loading from "../components/Loading";
import "./GraphicDesign.css";

// Custom Behance Icon Component
const BehanceIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 7H2V17H22V7ZM4.5 9.5H6.5V14.5H4.5V9.5ZM8.5 9.5H12.5V11.5H10.5V12.5H12.5V14.5H8.5V9.5ZM14.5 9.5H18.5C19.0523 9.5 19.5 9.94772 19.5 10.5C19.5 11.0523 19.0523 11.5 18.5 11.5H16.5V12.5H18.5C19.0523 12.5 19.5 12.9477 19.5 13.5C19.5 14.0523 19.0523 14.5 18.5 14.5H14.5V9.5ZM4.5 15.5H6.5V18.5H4.5V15.5ZM12.5 15.5H15.5V17.5H12.5V15.5ZM17.5 15.5H19.5V18.5H17.5V15.5Z" />
  </svg>
);

const GraphicDesign = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getConfig } = useApi();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const configData = await getConfig();
        setConfig(configData);
      } catch (error) {
        console.error("Error fetching config:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [getConfig]);

  if (loading) {
    return <Loading />;
  }

  const siteConfig = config || {
    graphicDesign: {
      title: "Graphic Design",
      description:
        "Showcasing my graphic design work. Projects will be added soon.",
      projects: [],
    },
  };

  const graphicDesign = siteConfig.graphicDesign || {};

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/aman", label: "Instagram" },
    { icon: BehanceIcon, href: "https://behance.net/aman", label: "Behance" },
    { icon: Dribbble, href: "https://dribbble.com/aman", label: "Dribbble" },
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="graphic-design-page">
      <section className="gd-hero">
        <div className="container">
          <motion.div
            className="gd-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="gd-icon">
              <Palette size={48} />
            </div>
            <h1>{graphicDesign.title || "Graphic Design"}</h1>
            <p>
              {graphicDesign.description ||
                "Showcasing my graphic design work. Projects will be added soon."}
            </p>

            <div className="gd-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gd-social-link"
                  aria-label={social.label}
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="gd-content">
        <div className="container">
          {graphicDesign.projects && graphicDesign.projects.length > 0 ? (
            <motion.div
              className="gd-projects-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {graphicDesign.projects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  className="gd-project-card"
                  variants={itemVariants}
                >
                  <div className="gd-project-image">
                    <div className="gd-placeholder-image">
                      <Palette size={48} />
                    </div>
                  </div>
                  <div className="gd-project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <span className="gd-project-category">
                      {project.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="gd-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="gd-empty-icon">
                <Palette size={64} />
              </div>
              <h2>Coming Soon</h2>
              <p>
                I'm currently building my graphic design portfolio. Check back
                soon to see my latest design work!
              </p>
              <div className="gd-empty-social">
                <span>Follow my design journey:</span>
                <div className="social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                    >
                      <social.icon size={20} />
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            className="gd-skills"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Design Skills</h2>
            <div className="gd-skills-grid">
              <div className="gd-skill-item">
                <span className="gd-skill-name">UI/UX Design</span>
                <div className="gd-skill-bar">
                  <div
                    className="gd-skill-progress"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div className="gd-skill-item">
                <span className="gd-skill-name">Brand Identity</span>
                <div className="gd-skill-bar">
                  <div
                    className="gd-skill-progress"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div className="gd-skill-item">
                <span className="gd-skill-name">Illustration</span>
                <div className="gd-skill-bar">
                  <div
                    className="gd-skill-progress"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
              <div className="gd-skill-item">
                <span className="gd-skill-name">Typography</span>
                <div className="gd-skill-bar">
                  <div
                    className="gd-skill-progress"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GraphicDesign;
