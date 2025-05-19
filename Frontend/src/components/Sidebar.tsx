import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import EventIcon from '@mui/icons-material/Event';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/', icon: HomeIcon, label: 'Dashboard' },
    { path: '/owners', icon: PeopleIcon, label: 'Owners' },
    { path: '/pets', icon: PetsIcon, label: 'Pets' },
    { path: '/appointments', icon: EventIcon, label: 'Appointments' },
  ];

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-[280px] h-screen bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 fixed left-0 top-0 text-white shadow-2xl z-50"
    >
      <div className="px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-3xl font-bold tracking-tight">VetSystem</h1>
          <p className="text-blue-200 mt-2 text-sm">Pet Care Management</p>
        </motion.div>

        <nav>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center p-4 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                      isActive(item.path)
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-blue-100 hover:bg-white/10'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="relative flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isActive(item.path)
                          ? 'bg-white/20'
                          : 'bg-white/10 group-hover:bg-white/15'
                      }`}>
                        <Icon className="transform group-hover:scale-110 transition-transform duration-200" />
                      </div>
                      <span className="ml-4 font-medium tracking-wide">{item.label}</span>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar; 