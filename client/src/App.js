import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ApiProvider } from "./context/ApiContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import GraphicDesign from "./pages/GraphicDesign";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <ApiProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/graphic-design" element={<GraphicDesign />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </ApiProvider>
    </ThemeProvider>
  );
}

export default App;
