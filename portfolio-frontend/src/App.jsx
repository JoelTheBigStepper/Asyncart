import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Admin from './pages/Admin';

// Main Portfolio Page
function PortfolioPage({ theme, toggleTheme }) {
  return (
    <>
      <Helmet>
        <title>AsyncArt - Front-End Developer Portfolio</title>
        <meta name="description" content="Showcasing the work of a Front-End Developer. Expert in React, Tailwind CSS, and web development." />
        <meta name="keywords" content="Front-End Developer, React, Tailwind CSS, Web Development, Portfolio" />
        <meta property="og:title" content="AsyncArt - Front-End Developer Portfolio" />
        <meta property="og:description" content="Showcasing the work of a Front-End Developer." />
        <meta property="og:image" content="URL_to_your_image.jpg" />
        <meta property="og:url" content="https://www.yoursite.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AsyncArt - Front-End Developer Portfolio" />
        <meta name="twitter:description" content="Showcasing the work of a Front-End Developer." />
        <meta name="twitter:image" content="URL_to_your_image.jpg" />
      </Helmet>
      
      <div className="h-auto bg-white text-gray-900 dark:bg-black dark:text-white font-sans transition-colors duration-500">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="works"><Works /></section>
        <section id="contact"><Contact /></section>
        
        <ScrollToTopButton />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* Main Portfolio */}
        <Route 
          path="/" 
          element={<PortfolioPage theme={theme} toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />} 
        />
        
        {/* Admin Panel - Separate Page */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}