import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Star, Trophy, Eye, Users } from 'lucide-react'
import axios from 'axios'

const MeetStudents = ({ setCurrentPage }) => {
  const [featuredStudents, setFeaturedStudents] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch students from backend API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students')
        const students = response.data.data
        
        // Take first 3 students and transform to featured format
        const featured = students.slice(0, 3).map((student, index) => ({
          name: student.name,
          title: student.title,
          program: student.program,
          rating: student.rating,
          achievements: student.achievements[0] || 'Academy Graduate',
          image: student.image || getDefaultImage(index),
          icon: getIconForIndex(index),
          color: getColorForIndex(index)
        }))
        
        setFeaturedStudents(featured)
      } catch (error) {
        console.error('Error fetching students:', error)
        // Fallback to static data if API fails
        setFeaturedStudents(getFallbackStudents())
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const getDefaultImage = (index) => {
    const images = ["👨‍🎓", "👩‍🎓", "👨‍💼", "👩‍💼"]
    return images[index % images.length]
  }

  const getIconForIndex = (index) => {
    const icons = [Trophy, Star, GraduationCap]
    return icons[index % icons.length]
  }

  const getColorForIndex = (index) => {
    const colors = [
      "from-yellow-500 to-orange-600",
      "from-cyan-500 to-blue-600",
      "from-purple-500 to-pink-600"
    ]
    return colors[index % colors.length]
  }

  const getFallbackStudents = () => [
    {
      name: "David Rodriguez",
      title: "FIDE Master",
      program: "Elite Training Graduate",
      rating: "2380",
      achievements: "Gained 400 rating points in 18 months",
      image: "👨‍🎓",
      icon: Trophy,
      color: "from-yellow-500 to-orange-600"
    },
    {
      name: "Emma Thompson", 
      title: "National Champion",
      program: "Tactical Mastery Graduate",
      rating: "2150",
      achievements: "Won National Championship",
      image: "👩‍🎓",
      icon: Star,
      color: "from-cyan-500 to-blue-600"
    },
    {
      name: "Alex Kim",
      title: "Candidate Master", 
      program: "Foundation to Elite Journey",
      rating: "2050",
      achievements: "0 to 2050 rating in 2 years",
      image: "👨‍💼",
      icon: GraduationCap,
      color: "from-purple-500 to-pink-600"
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
    hidden: { y: 50, opacity: 0, rotateY: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gray-900/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
              MEET OUR <span className="text-purple-400">STUDENTS</span>
            </h2>
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gray-900/30 relative overflow-hidden">
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: 'radial-gradient(circle, #00d4ff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
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
                '0 0 10px rgba(139, 92, 246, 0.5)',
                '0 0 20px rgba(139, 92, 246, 0.8)',
                '0 0 10px rgba(139, 92, 246, 0.5)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            MEET OUR <span className="text-purple-400">STUDENTS</span>
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the incredible journeys of our students who have transformed their chess skills 
            and achieved remarkable success through our comprehensive training programs.
          </p>
        </motion.div>

        {/* Students Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredStudents.map((student, index) => {
            const IconComponent = student.icon
            return (
              <motion.div 
                key={index}
                className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover-glow group cursor-pointer relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Gradient */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${student.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  initial={{ scale: 0, rotate: 45 }}
                  whileHover={{ scale: 1.5, rotate: 0 }}
                />

                {/* Student Avatar */}
                <div className="text-center mb-6 relative">
                  <motion.div 
                    className="text-6xl mb-4 relative"
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
                    {student.image}
                    <motion.div
                      className="absolute -top-2 -right-2 text-purple-400"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </motion.div>
                  </motion.div>
                  
                  <h3 className="font-orbitron text-xl font-bold text-white mb-1">
                    {student.name}
                  </h3>
                  <motion.p 
                    className="text-purple-400 font-semibold mb-2 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <GraduationCap className="w-4 h-4 mr-1" />
                    {student.title}
                  </motion.p>
                  <p className="text-gray-300 text-sm">{student.program}</p>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <motion.div 
                    className="flex justify-between items-center p-2 bg-gray-800/30 rounded-lg"
                    whileHover={{ backgroundColor: 'rgba(0, 212, 255, 0.1)' }}
                  >
                    <span className="text-gray-400 flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Rating:
                    </span>
                    <motion.span 
                      className="text-cyan-400 font-bold"
                      animate={{
                        textShadow: [
                          '0 0 5px #00d4ff',
                          '0 0 10px #00d4ff',
                          '0 0 5px #00d4ff'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {student.rating}
                    </motion.span>
                  </motion.div>
                  <div className="text-center p-2 bg-purple-500/10 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1 flex items-center justify-center">
                      <Trophy className="w-3 h-3 mr-1" />
                      Achievement:
                    </div>
                    <div className="text-purple-400 font-semibold text-sm">{student.achievements}</div>
                  </div>
                </div>

                {/* View Profile Button */}
                <motion.button 
                  className="w-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400 text-purple-400 py-2 rounded-lg font-semibold hover:from-purple-500 hover:to-cyan-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Story
                </motion.button>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All Students CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.button 
            onClick={() => setCurrentPage('students')}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover-glow animate-pulse-glow flex items-center mx-auto"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.8)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-5 h-5 mr-2" />
            Meet All Our Students
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default MeetStudents