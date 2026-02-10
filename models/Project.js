const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a project title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
      maxlength: [2000, "Description cannot be more than 2000 characters"],
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [200, "Short description cannot be more than 200 characters"],
    },
    image: {
      type: String,
      default: "default-project.jpg",
    },
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      enum: ["web", "mobile", "desktop", "other"],
      default: "web",
    },
    demoUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["completed", "in-progress", "planned"],
      default: "completed",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Index for better search performance
projectSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Project", projectSchema);
