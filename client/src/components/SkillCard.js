import React from "react";
import { motion } from "framer-motion";
import "./SkillCard.css";

const SkillCard = ({ title, icon: Icon, skills }) => {
  return (
    <motion.div
      className="skill-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="skill-header">
        <div className="skill-icon">
          <Icon size={24} />
        </div>
        <h3 className="skill-title">{title}</h3>
      </div>

      <div className="skill-list">
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            className="skill-item"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;
