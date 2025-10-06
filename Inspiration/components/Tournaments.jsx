import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Trophy, Users, Clock, ExternalLink, Star, Award } from 'lucide-react'
import axios from 'axios'

const Tournaments = () => {
  const [upcomingTournaments, setUpcomingTournaments] = useState([])
  const [pastTournaments, setPastTournaments] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch tournaments from backend API
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          axios.get('http://localhost:5000/api/tournaments'),
          axios.get('http://localhost:5000/api/tournaments/past')
        ])
        
        setUpcomingTournaments(upcomingRes.data.data)
        setPastTournaments(pastRes.data.data)
      } catch (error) {
        console.error('Error fetching tournaments:', error)
        // Fallback to static data if API fails
        setUpcomingTournaments(getFallbackUpcomingTournaments())
        setPastTournaments(getFallbackPastTournaments())
      } finally {
        setLoading(false)
      }
    }

    fetchTournaments()
  }, [])

  const getFallbackUpcomingTournaments = () => [
    {
      id: 1,
      name: "Aspire Spring Championship 2024",
      date: "2024-04-15",
      time: "09:00 AM",
      location: "Aspire Chess Academy Main Hall",
      address: "123 Chess Master Boulevard, Strategic District",
      entryFee: "$50",
      prizePool: "$2,500",
      maxParticipants: 64,
      currentParticipants: 42,
      format: "Swiss System - 7 Rounds",
      timeControl: "90 min + 30 sec increment",
      category: "Open Tournament",
      registrationLink: "https://forms.google.com/aspire-spring-2024",
      poster: "🏆",
      description: "Our flagship spring tournament featuring players from all skill levels competing for substantial prizes.",
      listUntil: "2024-04-14"
    },
    {
      id: 2,
      name: "Youth Rapid Championship",
      date: "2024-03-28",
      time: "02:00 PM", 
      location: "Aspire Chess Academy",
      address: "123 Chess Master Boulevard, Strategic District",
      entryFee: "$25",
      prizePool: "$1,000",
      maxParticipants: 32,
      currentParticipants: 18,
      format: "Swiss System - 6 Rounds",
      timeControl: "15 min + 10 sec increment",
      category: "Youth (Under 18)",
      registrationLink: "https://forms.google.com/youth-rapid-2024",
      poster: "⚡",
      description: "Fast-paced tournament designed specifically for young chess enthusiasts under 18.",
      listUntil: "2024-03-27"
    },
    {
      id: 3,
      name: "Blitz Masters Arena",
      date: "2024-04-05",
      time: "07:00 PM",
      location: "Online Platform",
      address: "Virtual Tournament - Link provided upon registration",
      entryFee: "$15",
      prizePool: "$500",
      maxParticipants: 100,
      currentParticipants: 67,
      format: "Arena Tournament",
      timeControl: "3 min + 2 sec increment",
      category: "Online Blitz",
      registrationLink: "https://forms.google.com/blitz-masters-2024",
      poster: "💨",
      description: "High-intensity online blitz tournament with rapid-fire games and instant results.",
      listUntil: "2024-04-05"
    }
  ]

  const getFallbackPastTournaments = () => [
    {
      name: "Winter Championship 2024",
      date: "2024-02-18",
      winner: "David Rodriguez (FM)",
      finalParticipants: 56,
      prizePool: "$2,000"
    },
    {
      name: "New Year Rapid Open",
      date: "2024-01-07", 
      winner: "Emma Thompson",
      finalParticipants: 48,
      prizePool: "$1,200"
    },
    {
      name: "Holiday Blitz Festival",
      date: "2023-12-23",
      winner: "Alex Kim (CM)",
      finalParticipants: 72,
      prizePool: "$800"
    }
  ]

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Open Tournament': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      case 'Youth (Under 18)': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Online Blitz': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getParticipationPercentage = (current, max) => {
    return Math.round((current / max) * 100)
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
            CHESS <span className="text-cyan-400">TOURNAMENTS</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join competitive tournaments designed for players of all levels. Test your skills, 
            win prizes, and connect with the chess community at Aspire Chess Academy.
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
                <Trophy className="w-6 h-6 mr-2" />
                24+
              </div>
              <div className="text-gray-400">Annual Tournaments</div>
            </div>
            <div className="bg-black/50 border border-purple-500/30 rounded-lg p-4 hover-glow">
              <div className="text-2xl font-orbitron font-bold text-purple-400 flex items-center justify-center">
                <Users className="w-6 h-6 mr-2" />
                1200+
              </div>
              <div className="text-gray-400">Total Participants</div>
            </div>
            <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-4 hover-glow">
              <div className="text-2xl font-orbitron font-bold text-cyan-400 flex items-center justify-center">
                <Award className="w-6 h-6 mr-2" />
                $15K+
              </div>
              <div className="text-gray-400">Prize Money</div>
            </div>
            <div className="bg-black/50 border border-purple-500/30 rounded-lg p-4 hover-glow">
              <div className="text-2xl font-orbitron font-bold text-purple-400 flex items-center justify-center">
                <Star className="w-6 h-6 mr-2" />
                4.8/5
              </div>
              <div className="text-gray-400">Player Rating</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="font-orbitron text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            UPCOMING <span className="text-cyan-400">TOURNAMENTS</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-1 gap-8">
            {upcomingTournaments.map((tournament, index) => (
              <motion.div 
                key={tournament.id}
                className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 hover-glow group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Tournament Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-6 mb-6">
                      <motion.div 
                        className="text-6xl"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {tournament.poster}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-orbitron text-2xl font-bold text-white mb-2">
                          {tournament.name}
                        </h3>
                        <div className={`inline-block border rounded-full px-3 py-1 text-sm font-semibold mb-4 ${getCategoryColor(tournament.category)}`}>
                          {tournament.category}
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          {tournament.description}
                        </p>
                      </div>
                    </div>

                    {/* Tournament Details Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-5 h-5 text-cyan-400 mr-3" />
                          <div>
                            <div className="font-semibold">{new Date(tournament.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</div>
                            <div className="text-sm text-gray-400">{tournament.time}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start text-gray-300">
                          <MapPin className="w-5 h-5 text-cyan-400 mr-3 mt-1" />
                          <div>
                            <div className="font-semibold">{tournament.location}</div>
                            <div className="text-sm text-gray-400">{tournament.address}</div>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-300">
                          <Clock className="w-5 h-5 text-cyan-400 mr-3" />
                          <div>
                            <div className="font-semibold">{tournament.timeControl}</div>
                            <div className="text-sm text-gray-400">{tournament.format}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-400/30 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Entry Fee:</span>
                            <span className="text-cyan-400 font-bold">{tournament.entryFee}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Prize Pool:</span>
                            <span className="text-purple-400 font-bold">{tournament.prizePool}</span>
                          </div>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Participants:</span>
                            <span className="text-white font-bold">
                              {tournament.currentParticipants}/{tournament.maxParticipants}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div 
                              className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${getParticipationPercentage(tournament.currentParticipants, tournament.maxParticipants)}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {getParticipationPercentage(tournament.currentParticipants, tournament.maxParticipants)}% Full
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Registration Section */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-cyan-400/30 rounded-xl p-6 h-full flex flex-col justify-between">
                      <div>
                        <h4 className="font-orbitron text-xl font-bold text-white mb-4 flex items-center">
                          <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                          Register Now
                        </h4>
                        <p className="text-gray-300 mb-6">
                          Secure your spot in this exciting tournament. Limited seats available!
                        </p>
                        
                        <div className="text-sm text-gray-400 mb-4">
                          Registration closes: {new Date(tournament.listUntil).toLocaleDateString()}
                        </div>
                      </div>

                      <motion.a
                        href={tournament.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover-glow flex items-center justify-center transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Register Online
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Tournaments */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="font-orbitron text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            RECENT <span className="text-purple-400">CHAMPIONS</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pastTournaments.map((tournament, index) => (
              <motion.div 
                key={index}
                className="bg-black/50 border border-purple-500/30 rounded-xl p-6 text-center hover-glow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                  {tournament.name}
                </h3>
                <p className="text-gray-400 mb-4">
                  {new Date(tournament.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-400/30 rounded-lg p-3 mb-4">
                  <div className="text-yellow-400 font-bold">Champion</div>
                  <div className="text-white font-semibold">{tournament.winner}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Participants</div>
                    <div className="text-cyan-400 font-bold">{tournament.participants}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Prize Pool</div>
                    <div className="text-purple-400 font-bold">{tournament.prizePool}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tournament Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="font-orbitron text-4xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            TOURNAMENT <span className="text-cyan-400">INFORMATION</span>
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
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">All Skill Levels</h3>
              <p className="text-gray-300">
                Tournaments designed for beginners to masters, with separate categories 
                ensuring fair and competitive play for everyone.
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
              <Trophy className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Attractive Prizes</h3>
              <p className="text-gray-300">
                Substantial prize pools, trophies, and certificates for winners. 
                Every participant receives recognition for their effort.
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
              <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Professional Organization</h3>
              <p className="text-gray-300">
                FIDE-rated tournaments with professional arbiters, live streaming, 
                and detailed game analysis for all participants.
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
              <Calendar className="w-5 h-5 mr-2" />
              View Tournament Calendar
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Tournaments