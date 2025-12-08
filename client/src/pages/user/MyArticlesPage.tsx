import { useEffect, useState } from 'react';
import type { IArticleDTO } from '../../types/dtos/article';

import Pagination from '../../components/ui/Pagination';
import MyArticleCard from '../../components/ui/MyArticleCard';
import { useMyArticles } from '../../features/user/hooks/useMyArticles';
import { useNavigate } from 'react-router-dom';
import { deleteArticleApi } from '../../api/endpoints/article';
import toast from 'react-hot-toast';
import { frontendRoutes } from '../../constants/frontendRoutes';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-48">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
  </div>
);

const MyArticlesPage = () => {
  const { articles, getArticles, loading, page, totalPages } = useMyArticles(9);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const navigate = useNavigate();

  // --- Initial Data Fetch ---
  useEffect(() => {
    // Only run the initial fetch once
    if (!initialLoadComplete) {
      getArticles(1).then(() => {
        setInitialLoadComplete(true);
      });
    }
  }, [initialLoadComplete, getArticles]);

  // --- DELETE Handler ---
  const handleDeleteArticle = async (articleId: string) => {
    try {
      const response = await deleteArticleApi(articleId);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      await getArticles(page);
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article.');
    }
  };

  // --- EDIT Handler ---
  const handleEditArticle = (articleId: string) => {
    navigate(`/edit-article/${articleId}`);
  };

  // --- CREATE Handler (New) ---
  const handleCreateArticle = () => {
    // Use the defined route constant
    navigate(frontendRoutes.CREATE_ARTICLE);
  };

  // --- Pagination Handler ---
  const handlePageChange = (newPage: number) => {
    // Check boundaries and loading state before fetching
    if (newPage >= 1 && newPage <= totalPages && newPage !== page && !loading) {
      getArticles(newPage);
      // Scroll to the top of the article feed section
      const feedSection = document.getElementById('article-feed-section');
      if (feedSection) {
        // Scroll slightly above the heading
        window.scrollTo({ top: feedSection.offsetTop - 100, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="mx-auto px-14 py-28">
      {/* --- Header and Create Button --- */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900">Your Articles</h2>
        <button
          onClick={handleCreateArticle}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          <span>Create New Article</span>
        </button>
      </div>

      <hr className="mb-10" />

      {/* --- Dynamic Articles Section --- */}
      <section id="article-feed-section" className="mt-0">
        {/* Conditional Rendering */}
        {loading && <LoadingSpinner />}

        {!loading && articles.length === 0 && (
          <div className="text-center py-12 text-gray-500 border rounded-lg">
            <p className="text-lg">You have not published any articles yet.</p>
            <button
              onClick={handleCreateArticle}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium transition duration-150"
            >
              Start creating your first article now!
            </button>
          </div>
        )}

        {/* Articles Grid (Using MyArticleCard component) */}
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <MyArticleCard
                key={article.id}
                article={article as IArticleDTO}
                onEdit={handleEditArticle} // Pass the edit handler
                onDelete={handleDeleteArticle} // Pass the delete handler
              />
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

export default MyArticlesPage;
