import React from 'react'
import { motion } from 'framer-motion'
import Navigation from './Navigation'

const Layout = ({ children, currentPage, setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <motion.div 
        className="grid-pattern fixed inset-0 opacity-20"
        animate={{ 
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Main Content */}
      <motion.main 
        className="relative z-10 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </div>
  )
}

export default Layout