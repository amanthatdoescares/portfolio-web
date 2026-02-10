const express = require("express");
const router = express.Router();

// Site configuration data
const siteConfig = {
  name: "Aman",
  title: "Student Software Developer & Graphic Designer",
  description:
    "Building full-stack web applications using the MERN stack with a focus on clean structure, usability, and reliable backend systems.",
  email: "amanthatdoescares@gmail.com",
  socialLinks: {
    github: "https://github.com/amanthatdoescares",
    linkedin: "https://www.linkedin.com/in/aman-maurya-895963324/",
  },
  skills: {
    languages: ["JavaScript", "Java", "C++", "Python"],
    frontend: ["React", "HTML", "CSS"],
    backend: ["Node.js", "Express"],
    database: ["MongoDB"],
    mobile: ["Android (Java)"],
    tools: ["Git", "GitHub", "Linux", "Figma"],
    concepts: [
      "REST APIs",
      "Authentication",
      "Full-stack Architecture",
      "UI/UX",
    ],
  },
  education: {
    degree: "Integrated Post Graduate Degree",
    major: "B.Tech (Information Technology) + MBA",
    status: "Currently enrolled",
  },
  projects: [
    {
      id: 1,
      title: "The Shoe Store",
      description:
        "Full-stack e-commerce website for shoe shopping with product listings and backend support. Features include user authentication, product catalog, shopping cart, and secure payment integration.",
      shortDescription: "Full-stack e-commerce for shoes",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      category: "web",
      demoUrl: "",
      githubUrl: "https://github.com/amanthatdoescares/shoe-store",
      status: "completed",
      isFeatured: true,
    },
    {
      id: 2,
      title: "GetMySeat",
      description:
        "Movie ticket booking website with seat selection and booking flow. Users can browse movies, select seats, and book tickets with real-time availability updates.",
      shortDescription: "Movie ticket booking platform",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "web",
      demoUrl: "",
      githubUrl: "https://github.com/amanthatdoescares/getmyseat",
      status: "completed",
      isFeatured: true,
    },
    {
      id: 3,
      title: "Sangeet",
      description:
        "Android music app that plays local audio files. Features include music playback controls, playlist management, and a clean Material Design interface.",
      shortDescription: "Android music player app",
      technologies: ["Java", "Android SDK"],
      category: "mobile",
      demoUrl: "",
      githubUrl: "https://github.com/amanthatdoescares/sangeet",
      status: "completed",
      isFeatured: false,
    },
    {
      id: 4,
      title: "The Dodge Game",
      description:
        "JavaScript-based web game where players dodge obstacles. Features smooth animations, score tracking, and increasing difficulty levels.",
      shortDescription: "JavaScript arcade game",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: "web",
      demoUrl: "",
      githubUrl: "https://github.com/amanthatdoescares/dodge-game",
      status: "completed",
      isFeatured: false,
    },
  ],
  graphicDesign: {
    enabled: true,
    title: "Graphic Design",
    description:
      "Showcasing my graphic design work. Projects will be added soon.",
    projects: [],
  },
};

// @route   GET /api/config
// @desc    Get site configuration
// @access  Public
router.get("/", (req, res) => {
  res.json({
    success: true,
    data: siteConfig,
  });
});

// @route   GET /api/config/skills
// @desc    Get skills only
// @access  Public
router.get("/skills", (req, res) => {
  res.json({
    success: true,
    data: siteConfig.skills,
  });
});

// @route   GET /api/config/projects
// @desc    Get projects only
// @access  Public
router.get("/projects", (req, res) => {
  res.json({
    success: true,
    data: siteConfig.projects,
  });
});

module.exports = router;
