// src/pages/user/ArticleDetailsPage.tsx

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticleDetails } from '../../features/user/hooks/useArticleDetails';
import { FiThumbsUp, FiThumbsDown, FiEyeOff } from 'react-icons/fi';
import { useArticleReactions } from '../../features/user/hooks/useArticleReactions';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import toast from 'react-hot-toast';

const ArticleDetailsPage: React.FC = () => {
  // 1. Hook and Route Setup
  const { articleId } = useParams<{ articleId: string }>();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
  if (!user) {
    toast.error("You must be logged in to view this page.");
    navigate("/login");
  }
}, [user, navigate]);

  const userId = user?.id;
  const { article, loading, getArticle, setArticle } = useArticleDetails();
  const { handleReaction, loading: reacting } = useArticleReactions(article!, setArticle, userId);

  useEffect(() => {
    if (articleId) {
      getArticle(articleId);
    }
  }, [articleId, getArticle]);

  if (loading) {
    return (
      <div className="p-20 text-center">
        <div className="text-xl font-semibold text-blue-600 animate-pulse">
          Loading full article...
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center bg-white rounded-xl shadow-lg mt-10">
        <h2 className="text-3xl font-bold text-red-500 mb-4">404 - Article Not Found</h2>
        <p className="text-gray-600">The requested article could not be loaded or doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-28">
      <article className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12 border border-gray-100">
        {/* Article Header (Title and Metadata) */}
        <header className="mb-8 border-b pb-6">
          {/* The article image, if available, placed prominently */}
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-80 object-cover rounded-xl mb-6 shadow-md"
            />
          )}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {article.title}
          </h1>
          {/* Placeholder for author/date/read time */}
          <div className="mt-4 text-sm text-gray-400">
            <span>By {article.createdBy}</span> |{' '}
            <span>{new Date(article.createdAt).toLocaleString().split(',')[0]}</span>
          </div>
        </header>

        {/* Article Content (The 'Prose' for Readability) */}
        <section className="prose prose-lg max-w-none text-gray-800">
          <div
            dangerouslySetInnerHTML={{
              __html: article.description || '<p>No content available.</p>',
            }}
          />
        </section>

        {/* Interaction & Metrics Footer */}
        <footer className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          {/* Metrics Display */}
          <div className="flex items-center text-sm text-gray-500 space-x-6 mb-4 md:mb-0">
            <span className="flex items-center">
              <FiThumbsUp className="mr-1 text-blue-500" />
              Likes: <span className="ml-1 font-semibold text-gray-700">{article.likes || 0}</span>
            </span>
            <span className="flex items-center">
              <FiThumbsDown className="mr-1 text-red-500" />
              Dislikes:{' '}
              <span className="ml-1 font-semibold text-gray-700">{article.dislikes || 0}</span>
            </span>
            <span className="flex items-center">
              <FiEyeOff className="mr-1 text-yellow-600" />
              Blocks:{' '}
              <span className="ml-1 font-semibold text-gray-700">{article.blocks || 0}</span>
            </span>
          </div>

          {/* Interactive Buttons (Placeholder) */}
          <div className="flex space-x-3">
            <button 
              disabled={reacting}
              onClick={() => handleReaction('like')}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-150 shadow-md">
              <FiThumbsUp className="mr-2" />
              Like
            </button>
            <button
              disabled={reacting}
              onClick={() => handleReaction("dislike")}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 transition duration-150 shadow-md">
              <FiThumbsDown className="mr-2" /> Dislike
            </button>
            <button
              disabled={reacting}
              onClick={() => handleReaction("block")}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-150 shadow-md">
              <FiEyeOff className="mr-2" /> Block
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default ArticleDetailsPage;
