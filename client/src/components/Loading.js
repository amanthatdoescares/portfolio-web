import React from "react";
import { motion } from "framer-motion";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="loading-logo"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          AM
        </motion.div>

        <div className="loading-bar">
          <motion.div
            className="loading-progress"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        <p className="loading-text">Loading...</p>
      </motion.div>
    </div>
  );
};

export default Loading;
