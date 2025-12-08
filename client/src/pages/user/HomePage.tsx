import { Link } from 'react-router-dom';
import HeroBg from '../../assets/images/hero-bg.jpg';
import { usePersonalizedFeed } from '../../features/user/hooks/usePersonalizedFeeds';
import { useEffect, useState } from 'react';
import type { IArticleDTO } from '../../types/dtos/article';

import Pagination from '../../components/ui/Pagination';
import ArticleCard from '../../components/ui/ArticleCard';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-48">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
  </div>
);

const HomePage = () => {
  // Using a limit of 9 for better visual layout (3 rows of 3)
  const { articles, getFeed, loading, page, totalPages } = usePersonalizedFeed(9);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // --- Initial Data Fetch ---
  useEffect(() => {
    // Only run the initial fetch once
    if (!initialLoadComplete) {
      getFeed(1).then(() => {
        setInitialLoadComplete(true);
      });
    }
  }, [initialLoadComplete, getFeed]);

  // --- Pagination Handler ---
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page && !loading) {
      getFeed(newPage);
      const feedSection = document.getElementById('article-feed-section');
      if (feedSection) {
        window.scrollTo({ top: feedSection.offsetTop - 100, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="mx-auto px-14 py-28">
      {/* --- Hero Section --- */}
      <section
        className="relative text-center py-32 bg-cover bg-center rounded-3xl overflow-hidden"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        {/* Overlay for better text readability (using Tailwind classes instead of CSS styles) */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Explore, Read & Publish <span className="text-blue-400">Articles</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-3xl mx-auto">
            Discover insightful articles across various topics like sports, politics, space, and
            more. Join our community and start sharing your knowledge today.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/dashboard"
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

      {/* --- Dynamic Articles Section --- */}
      <section id="article-feed-section" className="mt-24">
        <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Your Personalized Feed
        </h2>

        {/* Conditional Rendering */}
        {loading && <LoadingSpinner />}

        {!loading && articles.length === 0 && (
          <div className="text-center py-12 text-gray-500 border rounded-lg">
            <p className="text-lg">No articles found in your personalized feed.</p>
            <p className="text-sm mt-2">Try adjusting your search terms or preferences.</p>
          </div>
        )}

        {/* Articles Grid (Using ArticleCard component) */}
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article as IArticleDTO} />
            ))}
          </div>
        )}

        {/* Pagination Component */}
        {!loading && articles.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading}
          />
        )}
      </section>
    </div>
  );
};

export default HomePage;
