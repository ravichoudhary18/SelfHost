import React from 'react';
import { BarChart2, Moon, Settings, Sun } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  return (
    // Note: using dark:bg-liquid-black/80 to match our CSS variable
    <header className="w-full h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-600 text-white font-bold">
          Q
        </div>
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          TaskQ
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <BarChart2 size={18} className="text-gray-700 dark:text-gray-200" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {isDark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-700" />
          )}
        </button>
        <button
          className="p-2 rounded-md border border-gray-300 dark:border-gray-600
          hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Settings size={18} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
};

export default Header;
