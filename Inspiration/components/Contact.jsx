import React from 'react'

const Contact = () => {
  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: ["123 Chess Master Boulevard", "Strategic District, CD 12345", "United States"]
    },
    {
      icon: "📞", 
      title: "Call Us",
      details: ["+1 (555) 123-APEX", "+1 (555) 123-2739", "Mon-Fri: 9AM-8PM EST"]
    },
    {
      icon: "✉️",
      title: "Email Us", 
      details: ["info@apexchessacademy.com", "admissions@apexchessacademy.com", "support@apexchessacademy.com"]
    }
  ]

  const programs = [
    { name: "Foundation Program (Beginner)", price: "$299" },
    { name: "Tactical Mastery (Intermediate)", price: "$499" },
    { name: "Elite Training (Advanced)", price: "$899" },
    { name: "Professional Track (Masterclass)", price: "$1499" },
    { name: "Private Coaching (1-on-1)", price: "Contact for pricing" }
  ]

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-orbitron text-5xl md:text-6xl font-bold text-white mb-8">
            START YOUR <span className="text-cyan-400">JOURNEY</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ready to elevate your chess game? Get in touch with our team to discuss 
            your goals and find the perfect program for your chess journey.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 hover-glow">
              <h2 className="font-orbitron text-3xl font-bold text-white mb-8">
                ENROLLMENT <span className="text-purple-400">FORM</span>
              </h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">First Name *</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-900/50 border border-gray-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-900/50 border border-gray-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    className="w-full bg-gray-900/50 border border-gray-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-gray-900/50 border border-gray-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Current Chess Rating</label>
                    <select className="w-full bg-gray-900/50 border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors">
                      <option value="">Select rating range</option>
                      <option value="beginner">Beginner (0-1200)</option>
                      <option value="intermediate">Intermediate (1200-1800)</option>
                      <option value="advanced">Advanced (1800-2200)</option>
                      <option value="expert">Expert (2200+)</option>
                      <option value="unrated">Unrated</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Preferred Program</label>
                    <select className="w-full bg-gray-900/50 border border-gray-500/30 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors">
                      <option value="">Select a program</option>
                      <option value="foundation">Foundation Program</option>
                      <option value="tactical">Tactical Mastery</option>
                      <option value="elite">Elite Training</option>
                      <option value="professional">Professional Track</option>
                      <option value="private">Private Coaching</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Chess Goals & Experience</label>
                  <textarea 
                    rows="4"
                    className="w-full bg-gray-900/50 border border-gray-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your chess background, goals, and what you hope to achieve..."
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="newsletter"
                    className="mt-1 w-4 h-4 text-cyan-400 bg-gray-900 border-gray-500 rounded focus:ring-cyan-400"
                  />
                  <label htmlFor="newsletter" className="text-gray-300 text-sm">
                    I would like to receive chess tips, tournament updates, and academy news via email.
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 rounded-lg text-lg font-semibold hover-glow animate-pulse-glow transform hover:scale-105 transition-all duration-300"
                >
                  Submit Enrollment Application
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover-glow">
                <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
                  GET IN <span className="text-cyan-400">TOUCH</span>
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="text-3xl">{info.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-300">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Pricing Quick Reference */}
              <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 hover-glow">
                <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
                  PROGRAM <span className="text-purple-400">PRICING</span>
                </h3>
                
                <div className="space-y-4">
                  {programs.map((program, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700/50 last:border-b-0">
                      <span className="text-gray-300">{program.name}</span>
                      <span className="text-cyan-400 font-bold">{program.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-400/30 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <span className="text-cyan-400 font-semibold">Free Consultation:</span> Schedule a 
                    30-minute assessment call to discuss your goals and find the perfect program fit.
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-black/50 backdrop-blur-sm border border-gray-500/30 rounded-2xl p-8 hover-glow">
                <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
                  VISIT OUR <span className="text-cyan-400">ACADEMY</span>
                </h3>
                
                {/* Map Placeholder */}
                <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg h-48 flex items-center justify-center mb-4">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p>Interactive Map</p>
                    <p className="text-sm">123 Chess Master Boulevard</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Parking</div>
                    <div className="text-white">Free on-site parking</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Public Transit</div>
                    <div className="text-white">Metro Line 3, Chess Station</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-orbitron text-4xl font-bold text-center text-white mb-12">
            FREQUENTLY ASKED <span className="text-purple-400">QUESTIONS</span>
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "What skill level do I need to join?",
                answer: "We welcome students of all levels, from complete beginners to advanced players. Our assessment process helps us place you in the most appropriate program."
              },
              {
                question: "Are classes available online?",
                answer: "Yes! We offer both in-person and online training options. Our online platform provides the same high-quality instruction with interactive tools and personalized feedback."
              },
              {
                question: "What is the student-to-coach ratio?",
                answer: "We maintain small class sizes with a maximum 6:1 student-to-coach ratio for group sessions, ensuring personalized attention for every student."
              },
              {
                question: "Do you offer trial lessons?",
                answer: "Absolutely! We provide a free 30-minute consultation and trial lesson so you can experience our teaching methodology before enrolling."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-black/50 border border-gray-500/30 rounded-xl p-6 hover-glow">
                <h3 className="font-orbitron text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact