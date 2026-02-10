import React, { createContext, useContext } from "react";

const ApiContext = createContext();

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

export const ApiProvider = ({ children }) => {
  const getConfig = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/config`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching config:", error);
      return null;
    }
  };

  const getProjects = async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/projects?${queryString}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  };

  const getProject = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching project:", error);
      return null;
    }
  };

  const submitContact = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error submitting contact:", error);
      return { success: false, message: "Failed to send message" };
    }
  };

  const value = {
    getConfig,
    getProjects,
    getProject,
    submitContact,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default ApiContext;
