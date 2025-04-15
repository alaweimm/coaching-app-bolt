import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Utensils,
  Dumbbell,
  Heart,
  Pill,
  FlaskConical,
  BarChart2,
  Clipboard
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/program', label: 'Fitness Program', icon: Clipboard },
    { path: '/weekly', label: 'Weekly Planning', icon: Calendar },
    { path: '/nutrition', label: 'Nutrition', icon: Utensils },
    { path: '/workouts', label: 'Training', icon: Dumbbell },
    { path: '/health', label: 'Health', icon: Heart },
    { path: '/ped', label: 'PED', icon: Pill },
    { path: '/supplements', label: 'Supplements', icon: FlaskConical },
    { path: '/analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-50 to-slate-100 shadow-lg border-b border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center space-x-3">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent tracking-tight">
              CoachTrack
            </span>
            <span className="text-3xl font-light text-slate-600">Pro</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === path
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-2 ${
                    location.pathname === path
                      ? 'text-blue-100'
                      : 'text-slate-500'
                  }`} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;