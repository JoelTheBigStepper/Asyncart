import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Works from "./components/Works";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
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
      <div className={`h-auto bg-white text-gray-900 dark:bg-black dark:text-white font-sans transition-colors duration-500`}>
      <Header theme={theme} toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />

      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="works"><Works /></section>
      <section id="contact"><Contact /></section>
      <section id="scrollToTopButton"><ScrollToTopButton /></section>
      <section id="footer"><Footer /></section>
      
      
      </div>
    </>
  );
}
