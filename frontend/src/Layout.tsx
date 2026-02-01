import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = () => {
  const [isDark, setIsDark] = useState(false);

  // On load, check system preference or localStorage
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg dark:bg-darkBg transition-colors duration-500">
      {/* <Navbar /> */}
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <main className="flex-1 p-6">
        <Outlet /> {/* Nested pages */}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
