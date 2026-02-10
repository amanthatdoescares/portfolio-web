import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useApi } from "../context/ApiContext";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { submitContact } = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await submitContact(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message:
            result.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "aman@example.com",
      href: "mailto:aman@example.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/aman",
      href: "https://github.com/aman",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/aman",
      href: "https://linkedin.com/in/aman",
    },
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
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Get in Touch</h1>
            <p>
              Have a project in mind or just want to say hello? I'd love to hear
              from you. Let's create something amazing together!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <motion.div
            className="contact-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Contact Form */}
            <motion.div
              className="contact-form-wrapper"
              variants={itemVariants}
            >
              <h2>Send a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="input-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="input-field"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input-field"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="input-field"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="input-field"
                    rows="5"
                    placeholder="Tell me about your project, ideas, or just say hello!"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {status.message && (
                  <motion.div
                    className={`status-message ${status.type}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {status.type === "success" ? (
                      <>
                        <CheckCircle size={20} />
                        {status.message}
                      </>
                    ) : (
                      <>
                        <AlertCircle size={20} />
                        {status.message}
                      </>
                    )}
                  </motion.div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="contact-info-wrapper"
              variants={itemVariants}
            >
              <h2>Contact Information</h2>
              <p className="contact-intro">
                Feel free to reach out through any of these channels. I
                typically respond within 24-48 hours.
              </p>

              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    className="contact-info-item"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="info-icon">
                      <info.icon size={22} />
                    </div>
                    <div className="info-content">
                      <span className="info-label">{info.label}</span>
                      {info.href ? (
                        <a
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="info-value">{info.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="availability-card">
                <div className="availability-header">
                  <span className="availability-dot"></span>
                  <span>Currently Available</span>
                </div>
                <p>
                  Open to freelance projects and collaboration opportunities.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
