import { SquareCheckBig } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-full">
      <div className="grid gap-8 md:grid-cols-2">
        <NavLink
          to="/taskq"
          className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 hover:scale-[1.03]"
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="flex items-start gap-5 relative z-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 border border-blue-200">
              <SquareCheckBig className="h-8 w-16 text-blue-600 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors">
                TaseQ Page
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Explore the powerful TaseQ framework for building
                high-performance, modern task queues with ease.
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
