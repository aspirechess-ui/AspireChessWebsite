import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
// import { logo } from '@/../logo.svg'
import {
  Home,
  Info,
  BookOpen,
  Users,
  PenTool,
  Mail,
  Menu,
  X,
  Crown,
  Zap
} from 'lucide-react'

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'programs', label: 'Programs', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'tournaments', label: 'Tournaments', icon: Crown },
    { id: 'contact', label: 'Contact', icon: Mail }
  ]

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-cyan-500/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer group"
            onClick={() => setCurrentPage('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="text-2xl font-orbitron font-bold text-cyan-400 text-glow flex items-center"
              animate={{
                textShadow: [
                  '0 0 10px #00d4ff',
                  '0 0 20px #00d4ff',
                  '0 0 10px #00d4ff'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown className="w-6 h-6 mr-2" />
              Aspire
            </motion.div>
            <div className="ml-2 text-sm text-gray-300 group-hover:text-cyan-400 transition-colors mt-1.5">
              Chess Academy
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center cursor-pointer text-sm font-medium transition-all duration-300 relative ${currentPage === item.id
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400'
                    }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  <span className="hover-glow">{item.label}</span>

                  {currentPage === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 "
                      layoutId="activeTab"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>


          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button
              onClick={() => setCurrentPage('contact')}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover-glow animate-pulse-glow flex items-center"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Enroll Now
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-cyan-400 p-2"
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/95 border-t border-cyan-500/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id)
                        setIsMenuOpen(false)
                      }}
                      className={`flex items-center w-full text-left px-3 py-2 text-base font-medium transition-colors rounded-lg ${currentPage === item.id
                          ? 'text-cyan-400 bg-cyan-500/10'
                          : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                        }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      {item.label}
                    </motion.button>
                  )
                })}
                <motion.button
                  onClick={() => {
                    setCurrentPage('contact')
                    setIsMenuOpen(false)
                  }}
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Enroll Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navigation