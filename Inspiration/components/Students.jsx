import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Star, Trophy, TrendingUp, Award, Users, Calendar, Target } from 'lucide-react'
import axios from 'axios'

const Students = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch students from backend API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students')
        setStudents(response.data.data)
      } catch (error) {
        console.error('Error fetching students:', error)
        // Fallback to static data if API fails
        setStudents(getFallbackStudents())
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  const getFallbackStudents = () => [
    {
      name: "David Rodriguez",
      title: "FIDE Master",
      rating: "2380",
      peakRating: "2400",
      program: "Elite Training Program",
      achievements: [
        "Gained 400 rating points in 18 months",
        "FIDE Master title achieved",
        "Regional Championship Winner"
      ],
      joinDate: "January 2023",
      testimonial: "The personalized coaching and cutting-edge analysis tools at Aspire transformed my understanding of the game completely.",
      image: "👨‍🎓",
      bio: "Started as an intermediate player and achieved FIDE Master title through dedicated training and expert guidance from our coaching team."
    },
    {
      name: "Emma Thompson", 
      title: "National Champion",
      rating: "2150",
      peakRating: "2180",
      program: "Tactical Mastery Program",
      achievements: [
        "Won National Championship 2024",
        "Improved pattern recognition dramatically",
        "State Champion U18"
      ],
      joinDate: "March 2023",
      testimonial: "The tactical training program here is unmatched. My pattern recognition improved dramatically within months.",
      image: "👩‍🎓",
      bio: "Young prodigy who developed exceptional tactical skills through our specialized youth development program."
    },
    {
      name: "Alex Kim",
      title: "Candidate Master",
      rating: "2050",
      peakRating: "2080", 
      program: "Foundation to Elite Journey",
      achievements: [
        "0 to 2050 rating in 2 years",
        "Candidate Master title",
        "Tournament consistency improved"
      ],
      joinDate: "September 2022",
      testimonial: "From a complete beginner to CM level - the structured curriculum made this incredible journey possible.",
      image: "👨‍💼",
      bio: "Complete beginner who achieved remarkable progress through our comprehensive foundation and intermediate programs."
    },
    {
      name: "Maria Santos",
      title: "WIM",
      rating: "2280",
      peakRating: "2310",
      program: "Professional Track",
      achievements: [
        "Women's International Master",
        "Psychological training breakthrough",
        "Olympic team consideration"
      ],
      joinDate: "June 2022",
      testimonial: "The psychological training component sets Aspire apart. Learning to manage pressure was game-changing.",
      image: "👩‍💼",
      bio: "Focused on mental game development and achieved WIM title through our advanced psychological training methods."
    },
    {
      name: "James Wilson",
      title: "Expert Player",
      rating: "1980",
      peakRating: "2020",
      program: "Intermediate Tactics",
      achievements: [
        "Expert rating achieved",
        "Local tournament victories",
        "Consistent improvement"
      ],
      joinDate: "November 2023",
      testimonial: "The structured approach and regular feedback helped me break through rating plateaus I'd been stuck on for years.",
      image: "👨‍🔬",
      bio: "Dedicated adult learner who overcame rating plateaus through systematic training and consistent practice."
    },
    {
      name: "Sophie Chen",
      title: "Rising Star",
      rating: "1850",
      peakRating: "1880",
      program: "Youth Development",
      achievements: [
        "Rapid improvement in 6 months",
        "School chess team captain",
        "Regional youth champion"
      ],
      joinDate: "February 2024",
      testimonial: "The youth program made chess fun while helping me improve rapidly. The coaches understand how to work with young players.",
      image: "👩‍⚖️",
      bio: "Talented young player developing through our specialized youth program with focus on long-term chess education."
    }
  ]

  const getTitleColor = (title) => {
    if (title.includes('FIDE Master')) return 'text-yellow-400'
    if (title.includes('National Champion')) return 'text-cyan-400'
    if (title.includes('WIM')) return 'text-purple-400'
    if (title.includes('Candidate Master')) return 'text-green-400'
    return 'text-gray-400'
  }

  const getTitleBorder = (title) => {
    if (title.includes('FIDE Master')) return 'border-yellow-500/30'
    if (title.includes('National Champion')) return 'border-cyan-500/30'
    if (title.includes('WIM')) return 'border-purple-500/30'
    if (title.includes('Candidate Master')) return 'border-green-500/30'
    return 'border-gray-500/30'
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="font-orbitron text-5xl md:text-6xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            OUR <span className="text-cyan-400">STUDENTS</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet the incredible students who have transformed their chess journey through our 
            comprehensive training programs and achieved remarkable success.
          </motion.p>
          
          {/* Quick Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-4 hover-glow">
              <div className="text-2xl font-orbitron font-bold text-cyan-400 flex items-center justify-center">
                <Users className="w-6 h-6 mr-2" />
                500+
              </div>
              <div className="text-gray-400">Active Students</div>
            </div>
            <div className="bg-black/50 border border-purple-500/30 rounded-lg p-4 hover-glow">
              <div className="text-2xl font-orbitron font-bold text-purple-400 flex items-center justify-center">
                <Trophy className="w-6 h-6 mr-2" />
                50+
              </div>
              <div className="text-gray-400">Titled Players</div>
            </div>
            <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-4 hover-glow">
              <div className="text-2xl font-orbitron font-bold text-cyan-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                95%
              </div>
              <div className="text-gray-400">Improvement Rate</div>
            </div>
            <div className="bg-black/50 border border-purple-500/30 rounded-lg p-4 hover-glow">
              <div className="text-2xl font-orbitron font-bold text-purple-400 flex items-center justify-center">
                <Award className="w-6 h-6 mr-2" />
                200+
              </div>
              <div className="text-gray-400">Tournament Wins</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Students Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {students.map((student, index) => (
              <motion.div 
                key={index}
                className={`bg-black/50 backdrop-blur-sm border ${getTitleBorder(student.title)} rounded-2xl p-8 hover-glow group`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Student Header */}
                <div className="flex items-start gap-6 mb-6">
                  <motion.div 
                    className="text-6xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {student.image}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-orbitron text-2xl font-bold text-white mb-2">
                      {student.name}
                    </h3>
                    <p className={`${getTitleColor(student.title)} font-semibold mb-3 flex items-center`}>
                      <GraduationCap className="w-4 h-4 mr-2" />
                      {student.title}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Current Rating:</span>
                        <div className="text-cyan-400 font-bold">{student.rating}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Peak Rating:</span>
                        <div className="text-purple-400 font-bold">{student.peakRating}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Program & Join Date */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-2 flex items-center">
                      <Target className="w-3 h-3 mr-1" />
                      Program
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400 rounded-lg px-3 py-2">
                      <div className="text-cyan-400 font-semibold text-sm">{student.program}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Joined
                    </div>
                    <div className="text-white font-semibold text-sm bg-gray-800/50 rounded-lg px-3 py-2">
                      {student.joinDate}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <p className="text-gray-300 leading-relaxed italic">"{student.testimonial}"</p>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="font-orbitron text-lg font-bold text-white mb-3 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {student.achievements.map((achievement, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Star className="w-4 h-4 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.button 
                  className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400 text-cyan-400 py-3 rounded-lg font-semibold hover:from-cyan-500 hover:to-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Connect with {student.name.split(' ')[0]}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Philosophy */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="font-orbitron text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            STUDENT <span className="text-purple-400">SUCCESS FACTORS</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-black/50 border border-cyan-500/30 rounded-xl p-6 text-center hover-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Target className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Personalized Goals</h3>
              <p className="text-gray-300">
                Each student receives customized training plans aligned with their specific 
                chess goals and learning style.
              </p>
            </motion.div>
            <motion.div 
              className="bg-black/50 border border-purple-500/30 rounded-xl p-6 text-center hover-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Consistent Progress</h3>
              <p className="text-gray-300">
                Regular assessments and feedback ensure steady improvement and 
                help overcome rating plateaus effectively.
              </p>
            </motion.div>
            <motion.div 
              className="bg-black/50 border border-cyan-500/30 rounded-xl p-6 text-center hover-glow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Community Support</h3>
              <p className="text-gray-300">
                Strong peer network and mentorship create a supportive environment 
                for learning and competitive growth.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover-glow animate-pulse-glow flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Join Our Student Community
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Students