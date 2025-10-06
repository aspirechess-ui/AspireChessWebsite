import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Target, Crown, CheckCircle, Clock, Users } from 'lucide-react'

const ProgramHighlights = () => {
  const programs = [
    {
      title: "Beginner's Gambit",
      description: "Master the fundamentals with our AI-enhanced learning system",
      icon: BookOpen,
      chessIcon: "♟",
      level: "Novice",
      duration: "8 weeks",
      features: ["Basic rules & tactics", "Opening principles", "Endgame basics", "Live coaching"],
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-500/30"
    },
    {
      title: "Intermediate Tactics",
      description: "Sharpen your strategic thinking and tactical awareness",
      icon: Target,
      chessIcon: "♞",
      level: "Intermediate", 
      duration: "12 weeks",
      features: ["Advanced tactics", "Positional play", "Game analysis", "Tournament prep"],
      color: "from-cyan-500 to-blue-600",
      borderColor: "border-cyan-500/30"
    },
    {
      title: "Grandmaster Prep",
      description: "Elite training for aspiring masters and professionals",
      icon: Crown,
      chessIcon: "♔",
      level: "Advanced",
      duration: "16 weeks", 
      features: ["Master-level theory", "Psychological training", "Opening repertoire", "1-on-1 coaching"],
      color: "from-purple-500 to-violet-600",
      borderColor: "border-purple-500/30"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6"
            animate={{
              textShadow: [
                '0 0 10px rgba(0, 212, 255, 0.5)',
                '0 0 20px rgba(0, 212, 255, 0.8)',
                '0 0 10px rgba(0, 212, 255, 0.5)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            TRAINING <span className="text-cyan-400">PROGRAMS</span>
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your path to mastery with our scientifically designed curriculum, 
            tailored for every skill level and ambition.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {programs.map((program, index) => {
            const IconComponent = program.icon
            return (
              <motion.div 
                key={index}
                className={`bg-gray-900/50 backdrop-blur-sm border ${program.borderColor} rounded-xl p-8 hover-glow group cursor-pointer relative overflow-hidden`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Gradient */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />

                {/* Program Icons */}
                <div className="text-center mb-6 relative">
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {program.chessIcon}
                  </motion.div>
                  <motion.div
                    className="absolute top-0 right-0 text-cyan-400"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-8 h-8" />
                  </motion.div>
                </div>

                {/* Program Info */}
                <div className="text-center mb-6">
                  <h3 className="font-orbitron text-2xl font-bold text-white mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{program.description}</p>
                  
                  <div className="flex justify-center gap-4 text-sm">
                    <motion.span 
                      className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full flex items-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Users className="w-3 h-3 mr-1" />
                      {program.level}
                    </motion.span>
                    <motion.span 
                      className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full flex items-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {program.duration}
                    </motion.span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {program.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-center text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button 
                  className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400 text-cyan-400 py-3 rounded-lg font-semibold hover:from-cyan-500 hover:to-purple-600 hover:text-white transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.button 
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover-glow animate-pulse-glow flex items-center mx-auto"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            View All Programs
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProgramHighlights