import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ProjectDrawer from "./components/ProjectDrawer";
import Home from "./pages/Home";
import Works from "./pages/Works";
import Toolbox from "./pages/Toolbox";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import useProjects from "./hooks/useProjects";

function PortfolioPage({ theme, toggleTheme }) {
  const [selected, setSelected] = useState(null);
  const closeProject = useCallback(() => setSelected(null), []);
  const { groups, demoProjects } = useProjects();

  return (
    <>
      <Helmet>
        <title>AsyncArt | Joel Ojo, Full-Stack Developer</title>
        <meta
          name="description"
          content="Joel Ojo is a full-stack developer in Ibadan, Nigeria, building products and client websites with React, Node.js, Express and MongoDB."
        />
        <meta
          name="keywords"
          content="Full-Stack Developer, React, Node.js, Express, MongoDB, Tailwind CSS, Portfolio, Ibadan, Nigeria"
        />
        <meta property="og:title" content="AsyncArt | Joel Ojo, Full-Stack Developer" />
        <meta
          property="og:description"
          content="Products and client websites built with React, Node.js, Express and MongoDB."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AsyncArt | Joel Ojo, Full-Stack Developer" />
      </Helmet>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-semibold focus:text-canvas"
      >
        Skip to content
      </a>

      <Header theme={theme} toggleTheme={toggleTheme} />

      <main id="main">
        <Home onOpen={setSelected} />
        <Works groups={groups} demoProjects={demoProjects} onOpen={setSelected} />
        <Toolbox />
        <About />
        <Contact />
      </main>

      <Footer />
      <ScrollToTopButton />
      <ProjectDrawer project={selected} onClose={closeProject} />
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Routes>
          <Route path="/" element={<PortfolioPage theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </MotionConfig>
  );
}
