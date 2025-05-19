import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.main 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 ml-[280px] p-8 bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm p-6 min-h-[calc(100vh-4rem)]"
          >
            <Outlet />
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Layout; 