import { Link } from 'react-router-dom';
import HeroBg from '../../assets/images/hero-bg.jpg';
import { usePersonalizedFeed } from '../../features/user/hooks/usePersonalizedFeeds';
import { useEffect, useState } from 'react';
import type { IArticleDTO } from '../../types/dtos/article';
import { useCategories } from '../../features/auth/hooks/useCategories';

import Pagination from '../../components/ui/Pagination';
import ArticleCard from '../../components/ui/ArticleCard';
import { FiSearch } from 'react-icons/fi';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-48">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
  </div>
);

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { articles, getFeed, loading, page, totalPages } = usePersonalizedFeed(9);
  const { categories, getCategories } = useCategories();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // --- Initial Data Fetch ---
  useEffect(() => {
    if (!initialLoadComplete) {
      getCategories();
      getFeed(1, searchTerm, selectedCategory).then(() => {
        setInitialLoadComplete(true);
      });
    }
  }, [initialLoadComplete, getFeed, getCategories, searchTerm, selectedCategory]);

  // --- Pagination Handler ---
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page && !loading) {
      getFeed(newPage, searchTerm, selectedCategory);
      const feedSection = document.getElementById('article-feed-section');
      if (feedSection) {
        window.scrollTo({ top: feedSection.offsetTop - 100, behavior: 'smooth' });
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value;
    setSelectedCategory(newCat);
    getFeed(1, searchTerm, newCat);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getFeed(1, searchTerm, selectedCategory);
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

        {/* --- NEW: Filter Controls --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">

          {/* Search Input: Enhanced appearance with subtle shadow and border grouping */}
          <form 
              onSubmit={handleSearchSubmit} 
              className="flex max-w-md w-full md:w-96 shadow-md rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition duration-150"
          >
              <input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  // Grow input, remove individual borders/rounding for a unified look
                  className="grow px-5 py-3 text-gray-700 bg-white focus:outline-none placeholder-gray-500" 
              />
              <button
                  type="submit"
                  // Use a strong accent blue for the button
                  className="px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
              >
                  <FiSearch className="w-5 h-5" />
              </button>
          </form>

          {/* Category Dropdown: Styled to match the search input's height and aesthetic */}
          <select
              onChange={handleCategoryChange}
              value={selectedCategory || ''}
              className="px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-md text-gray-700 w-full md:w-56 appearance-none pr-8 cursor-pointer disabled:opacity-50"
              disabled={loading}
          >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                      {cat.name}
                  </option>
              ))}
          </select>
      </div>

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
