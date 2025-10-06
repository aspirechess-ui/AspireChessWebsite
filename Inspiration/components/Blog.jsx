import React from 'react'

const Blog = () => {
  const featuredPost = {
    title: "The Psychology of Chess: Mental Training for Competitive Success",
    excerpt: "Discover how top players develop mental resilience and maintain focus under pressure. Learn the psychological techniques that separate good players from great ones.",
    author: "GM Marcus Chen",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Psychology",
    image: "🧠"
  }

  const blogPosts = [
    {
      title: "Modern Opening Theory: The Evolution of the Sicilian Defense",
      excerpt: "An in-depth analysis of recent developments in Sicilian theory and how top players are adapting their repertoires.",
      author: "GM Dmitri Volkov", 
      date: "March 12, 2024",
      readTime: "12 min read",
      category: "Opening Theory",
      image: "📚"
    },
    {
      title: "Endgame Mastery: Converting Winning Positions",
      excerpt: "Learn the key principles for converting advantages in the endgame, with examples from recent tournament play.",
      author: "GM Alexandra Petrov",
      date: "March 10, 2024", 
      readTime: "10 min read",
      category: "Endgames",
      image: "♔"
    },
    {
      title: "Youth Chess Development: Building Strong Foundations",
      excerpt: "Essential tips for parents and coaches on nurturing young chess talent and maintaining motivation.",
      author: "IM Sarah Williams",
      date: "March 8, 2024",
      readTime: "6 min read", 
      category: "Youth Development",
      image: "🌟"
    },
    {
      title: "Tournament Preparation: A Grandmaster's Routine",
      excerpt: "Inside look at how professional players prepare for major tournaments, from opening prep to physical conditioning.",
      author: "GM Viktor Petrov",
      date: "March 5, 2024",
      readTime: "15 min read",
      category: "Tournament Play",
      image: "🏆"
    },
    {
      title: "The Role of AI in Modern Chess Training",
      excerpt: "How artificial intelligence is revolutionizing chess education and what it means for players at all levels.",
      author: "GM Marcus Chen",
      date: "March 3, 2024",
      readTime: "9 min read",
      category: "Technology", 
      image: "🤖"
    },
    {
      title: "Tactical Pattern Recognition: Training Your Chess Vision",
      excerpt: "Systematic approach to improving tactical awareness through pattern recognition and visualization exercises.",
      author: "WGM Elena Rodriguez",
      date: "March 1, 2024",
      readTime: "11 min read",
      category: "Tactics",
      image: "⚡"
    }
  ]

  const categories = [
    "All Posts",
    "Opening Theory", 
    "Endgames",
    "Tactics",
    "Psychology",
    "Tournament Play",
    "Youth Development",
    "Technology"
  ]

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Opening Theory': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Endgames': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Tactics': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Psychology': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Tournament Play': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Youth Development': return 'bg-pink-500/20 text-pink-400 border-pink-500/30'
      case 'Technology': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-orbitron text-5xl md:text-6xl font-bold text-white mb-8">
            CHESS <span className="text-cyan-400">INSIGHTS</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Stay ahead of the game with expert analysis, training tips, and insights 
            from our world-class coaching team and guest contributors.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-orbitron text-3xl font-bold text-white mb-8 text-center">
            FEATURED <span className="text-purple-400">ARTICLE</span>
          </h2>
          
          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 hover-glow">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className={`inline-block border rounded-full px-3 py-1 text-sm font-semibold mb-4 ${getCategoryColor(featuredPost.category)}`}>
                  {featuredPost.category}
                </div>
                <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <span>By {featuredPost.author}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover-glow">
                  Read Full Article
                </button>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4">{featuredPost.image}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full border transition-all duration-300 hover-glow ${
                  index === 0 
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' 
                    : 'bg-black/50 text-gray-400 border-gray-500/30 hover:text-cyan-400 hover:border-cyan-500/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article 
                key={index}
                className="bg-black/50 backdrop-blur-sm border border-gray-500/30 rounded-xl p-6 hover-glow group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                {/* Post Image/Icon */}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4 group-hover:animate-pulse">
                    {post.image}
                  </div>
                  <div className={`inline-block border rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </div>
                </div>

                {/* Post Content */}
                <h3 className="font-orbitron text-xl font-bold text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Post Meta */}
                <div className="text-sm text-gray-400 mb-4">
                  <div className="mb-1">By {post.author}</div>
                  <div className="flex items-center gap-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <button className="w-full bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600 text-gray-300 py-2 rounded-lg font-semibold hover:from-cyan-500/20 hover:to-purple-600/20 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300">
                  Read More
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-orbitron text-3xl font-bold text-white mb-6">
            STAY <span className="text-cyan-400">INFORMED</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter for the latest chess insights, training tips, 
            and tournament updates delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 bg-black/50 border border-gray-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover-glow">
              Subscribe
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            Join 5,000+ chess enthusiasts. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Blog