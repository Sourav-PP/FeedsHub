import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import HeroBg from '../../assets/images/hero-bg.jpg';
const HomePage = () => {

  return (
    <div className="mx-auto px-14 py-28">

      {/* Hero Section with Background Image */}
      <section
        className="relative text-center py-32 bg-cover bg-center rounded-3xl overflow-hidden"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Explore, Read & Publish <span className="text-blue-400">Articles</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-3xl mx-auto">
            Discover insightful articles across various topics like sports, politics, space, and more. Join our community and start sharing your knowledge today.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/dashboard" // Updated to dashboard assuming after login
              className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Explore Articles
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 rounded-full border-2 border-blue-400 text-blue-400 hover:bg-blue-400/20 hover:text-white transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="mt-24">
        <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">Featured Articles</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "How to Start Writing Effectively",
              description: "Unlock your potential with proven strategies to overcome writer's block and craft compelling content.",
              image: "https://source.unsplash.com/featured/?writing"
            },
            {
              title: "Top 10 Productivity Tips",
              description: "Boost your efficiency with these game-changing habits used by top performers worldwide.",
              image: "https://source.unsplash.com/featured/?productivity"
            },
            {
              title: "Why Reading Makes You Smarter",
              description: "Discover the science behind how regular reading enhances cognitive abilities and expands your worldview.",
              image: "https://source.unsplash.com/featured/?reading"
            },
          ].map((article, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;