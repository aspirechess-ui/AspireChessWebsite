import React from 'react'

const About = () => {
  const milestones = [
    { year: "2014", event: "Academy Founded", description: "Established by GM Viktor Petrov with a vision to revolutionize chess education" },
    { year: "2016", event: "First Grandmaster", description: "Our first student achieved GM title, validating our training methodology" },
    { year: "2018", event: "AI Integration", description: "Pioneered the use of advanced AI analysis in chess training programs" },
    { year: "2020", event: "Global Expansion", description: "Launched online programs, reaching students in over 50 countries" },
    { year: "2022", event: "Olympic Success", description: "Three of our students competed in the Chess Olympiad" },
    { year: "2024", event: "500+ Graduates", description: "Celebrated training over 500 students with 50+ achieving titles" }
  ]

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-orbitron text-5xl md:text-6xl font-bold text-white mb-8">
            ABOUT <span className="text-cyan-400">Aspire Chess Academy</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The Aspire Chess Academy represents the pinnacle of chess education, where traditional mastery 
            meets cutting-edge technology to create the ultimate learning environment for aspiring champions.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-orbitron text-3xl font-bold text-white mb-6">
                OUR <span className="text-purple-400">PHILOSOPHY</span>
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We believe that chess mastery is not just about memorizing moves or calculating variations. 
                True excellence comes from understanding the deeper patterns, developing intuition, and 
                cultivating the mental discipline required to perform under pressure.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our methodology combines classical chess principles with modern psychological training, 
                AI-powered analysis, and personalized coaching to accelerate learning and maximize potential.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full mr-4"></div>
                  <span className="text-gray-300">Personalized learning paths for every student</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-4"></div>
                  <span className="text-gray-300">Integration of technology and traditional methods</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full mr-4"></div>
                  <span className="text-gray-300">Focus on mental resilience and competitive psychology</span>
                </div>
              </div>
            </div>
            <div className="bg-black/50 border border-cyan-500/30 rounded-xl p-8 hover-glow">
              <div className="text-center">
                <div className="text-6xl mb-6">🏆</div>
                <h3 className="font-orbitron text-2xl font-bold text-white mb-4">Excellence Standard</h3>
                <p className="text-gray-300 mb-6">
                  Every program is designed to not just improve your chess, but to develop the mindset 
                  and discipline of a true champion.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">98%</div>
                    <div className="text-sm text-gray-400">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">15</div>
                    <div className="text-sm text-gray-400">Expert Coaches</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-orbitron text-4xl font-bold text-center text-white mb-16">
            OUR <span className="text-cyan-400">JOURNEY</span>
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-600"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-black/50 border border-cyan-500/30 rounded-xl p-6 hover-glow">
                    <div className="font-orbitron text-2xl font-bold text-cyan-400 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {milestone.event}
                    </h3>
                    <p className="text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                
                {/* Timeline Node */}
                <div className="w-2/12 flex justify-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full border-4 border-black glow-blue"></div>
                </div>
                
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-orbitron text-4xl font-bold text-white mb-8">
            STATE-OF-THE-ART <span className="text-purple-400">FACILITY</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Our headquarters features cutting-edge training rooms, advanced analysis stations, 
            and a tournament-grade playing hall designed to optimize learning and performance.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6 hover-glow">
              <div className="text-4xl mb-4">🖥️</div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Analysis Lab</h3>
              <p className="text-gray-300">
                High-performance computers running the latest chess engines for deep position analysis
              </p>
            </div>
            <div className="bg-black/50 border border-cyan-500/30 rounded-xl p-6 hover-glow">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Tournament Hall</h3>
              <p className="text-gray-300">
                Professional tournament conditions with DGT boards and live streaming capabilities
              </p>
            </div>
            <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6 hover-glow">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">Chess Library</h3>
              <p className="text-gray-300">
                Extensive collection of chess literature and digital resources for research
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About