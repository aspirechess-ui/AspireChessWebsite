import React from 'react'

const Programs = () => {
    const programs = [
        {
            branch: "Kalamboli Branch",
            title: "Foundation Program",
            subtitle: "Beginner's Gambit",
            duration: "8 weeks",
            price: "$299",
            description: "Perfect for complete beginners or those looking to solidify their fundamentals",
            curriculum: [
                "Chess rules and piece movement",
                "Basic tactics (pins, forks, skewers)",
                "Opening principles and development",
                "Elementary endgames (K+Q vs K, K+R vs K)",
                "Basic strategy concepts",
                "Time management basics"
            ],
            schedule: "2 sessions per week, 90 minutes each",
            includes: ["Personal coach assignment", "Digital workbook", "Practice games", "Progress tracking"]
        },
        {
            branch: "Kamothe Branch",
            title: "Tactical Mastery",
            subtitle: "Intermediate Tactics",
            duration: "12 weeks",
            price: "$499",
            description: "Designed for players rated 1200-1800 looking to break through to the next level",
            curriculum: [
                "Advanced tactical patterns",
                "Positional understanding",
                "Opening repertoire development",
                "Middle game planning",
                "Complex endgame techniques",
                "Game analysis methodology"
            ],
            schedule: "3 sessions per week, 2 hours each",
            includes: ["Grandmaster coaching", "Tournament preparation", "Opening database", "Personalized study plan"]
        },
        {
            branch: "Roadpali Branch",
            title: "Elite Training",
            subtitle: "Grandmaster Preparation",
            duration: "16 weeks",
            price: "$899",
            description: "Intensive program for serious competitors rated 1800+ aiming for master level",
            curriculum: [
                "Master-level opening theory",
                "Deep positional concepts",
                "Psychological preparation",
                "Tournament strategy",
                "Advanced endgame mastery",
                "Professional game analysis"
            ],
            schedule: "4 sessions per week, 2.5 hours each",
            includes: ["1-on-1 GM coaching", "Tournament entry fees", "Professional analysis", "Mental training"]
        },
        {
            branch: "Online Mode",
            title: "Professional Track",
            subtitle: "Title Pursuit",
            duration: "24 weeks",
            price: "$1499",
            description: "Elite program for titled players and those pursuing professional chess careers",
            curriculum: [
                "Cutting-edge opening preparation",
                "Advanced psychological training",
                "Professional tournament preparation",
                "Sponsor and media training",
                "Career development guidance",
                "International competition prep"
            ],
            schedule: "Flexible intensive schedule",
            includes: ["Dedicated GM coach", "Tournament support", "Career guidance", "Networking opportunities"]
        }
    ]

    const getLevelColor = (branch) => {
        switch (branch) {
            case 'Kalamboli Branch': return 'from-green-500 to-emerald-600'
            case 'Kamothe Branch': return 'from-blue-500 to-cyan-600'
            case 'Roadpali Branch': return 'from-purple-500 to-violet-600'
            case 'Online Mode': return 'from-orange-500 to-red-600'
            default: return 'from-gray-500 to-gray-600'
        }
    }

    const getLevelBorder = (branch) => {
        switch (branch) {
            case 'Kalamboli Branch': return 'border-green-500/30'
            case 'Kamothe Branch': return 'border-cyan-500/30'
            case 'Roadpali Branch': return 'border-purple-500/30'
            case 'Online Mode': return 'border-orange-500/30'
            default: return 'border-gray-500/30'
        }
    }

    return (
        <div className="pt-20 min-h-screen">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="font-orbitron text-5xl md:text-6xl font-bold text-white mb-8">
                        TRAINING <span className="text-cyan-400">PROGRAMS</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                        Choose your path to chess mastery with our scientifically designed curriculum.
                        Each program is tailored to specific skill levels and learning objectives.
                    </p>

                    {/* Quick Level Guide */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        <div className="bg-black/50 border border-green-500/30 rounded-lg p-4">
                            <div className="text-green-400 font-bold">Beginner</div>
                            <div className="text-sm text-gray-400">0-1200 rating</div>
                        </div>
                        <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-4">
                            <div className="text-cyan-400 font-bold">Intermediate</div>
                            <div className="text-sm text-gray-400">1200-1800 rating</div>
                        </div>
                        <div className="bg-black/50 border border-purple-500/30 rounded-lg p-4">
                            <div className="text-purple-400 font-bold">Advanced</div>
                            <div className="text-sm text-gray-400">1800-2200 rating</div>
                        </div>
                        <div className="bg-black/50 border border-orange-500/30 rounded-lg p-4">
                            <div className="text-orange-400 font-bold">Masterclass</div>
                            <div className="text-sm text-gray-400">2200+ rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {programs.map((program, index) => (
                            <div
                                key={index}
                                className={`bg-black/50 backdrop-blur-sm border ${getLevelBorder(program.branch)} rounded-2xl p-8 hover-glow group`}
                            >
                                {/* Program Header */}
                                <div className="mb-6">
                                    <div className={`inline-block bg-gradient-to-r ${getLevelColor(program.branch)} text-white px-4 py-2 rounded-full text-sm font-bold mb-4`}>
                                        {program.branch} 
                                    </div>
                                    <h3 className="font-orbitron text-2xl font-bold text-white mb-2">
                                        {program.title}
                                    </h3>
                                    <p className="text-cyan-400 text-lg font-semibold mb-3">
                                        {program.subtitle}
                                    </p>
                                    <p className="text-gray-300 mb-4">
                                        {program.description}
                                    </p>

                                    {/* Program Details */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <div className="text-sm text-gray-400">Duration</div>
                                            <div className="text-white font-semibold">{program.duration}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-400">Investment</div>
                                            <div className="text-cyan-400 font-bold text-xl">{program.price}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Curriculum */}
                                <div className="mb-6">
                                    <h4 className="font-orbitron text-lg font-bold text-white mb-4">Curriculum</h4>
                                    <ul className="space-y-2">
                                        {program.curriculum.map((item, idx) => (
                                            <li key={idx} className="flex items-start text-gray-300">
                                                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Schedule & Includes */}
                                <div className="space-y-4 mb-8">
                                    <div>
                                        <div className="text-sm text-gray-400 mb-1">Schedule</div>
                                        <div className="text-white">{program.schedule}</div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-gray-400 mb-2">Program Includes</div>
                                        <div className="flex flex-wrap gap-2">
                                            {program.includes.map((item, idx) => (
                                                <span key={idx} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button className={`w-full bg-gradient-to-r ${getLevelColor(program.level)} text-white py-3 rounded-lg font-semibold hover-glow transform hover:scale-105 transition-all duration-300`}>
                                    Enroll in {program.title}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Info */}
            <section className="py-16 px-4 bg-gray-900/30">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="font-orbitron text-3xl font-bold text-white mb-8">
                        PROGRAM <span className="text-purple-400">BENEFITS</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-black/50 border border-cyan-500/30 rounded-xl p-6">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="font-orbitron text-xl font-bold text-white mb-3">Personalized Learning</h3>
                            <p className="text-gray-300">
                                Every program is customized to your current skill level and learning pace
                            </p>
                        </div>
                        <div className="bg-black/50 border border-purple-500/30 rounded-xl p-6">
                            <div className="text-4xl mb-4">🏆</div>
                            <h3 className="font-orbitron text-xl font-bold text-white mb-3">Proven Results</h3>
                            <p className="text-gray-300">
                                95% of our students achieve their target rating improvement within the program duration
                            </p>
                        </div>
                        <div className="bg-black/50 border border-cyan-500/30 rounded-xl p-6">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="font-orbitron text-xl font-bold text-white mb-3">Lifetime Support</h3>
                            <p className="text-gray-300">
                                Access to our alumni network and continued guidance even after program completion
                            </p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover-glow animate-pulse-glow">
                            Schedule Free Consultation
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Programs