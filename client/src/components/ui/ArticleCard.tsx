import { Link } from "react-router-dom";
import React from "react";
// Assuming you have icons available (e.g., from 'react-icons' or similar)
import { FiThumbsUp, FiThumbsDown, FiEyeOff } from 'react-icons/fi'; 
import type { IArticleDTO } from "../../types/dtos/article";

// Define the props interface for the card, updated to include metrics
interface ArticleCardProps {
    article: IArticleDTO
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
      {/* The main card content links to the details page */}
      <Link 
          to={`/article/${article.id}`} 
          className="block"
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
      </Link>
      
      {/* Interaction Metrics Footer */}
      <div className="flex justify-between items-center p-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500 space-x-4">
              <span className="flex items-center">
                  <FiThumbsUp className="mr-1 text-blue-500" />
                  {article.likes || 0}
              </span>
              <span className="flex items-center">
                  <FiThumbsDown className="mr-1 text-red-500" />
                  {article.dislikes || 0}
              </span>
          </div>
          <span className="flex items-center text-xs text-gray-400">
              <FiEyeOff className="mr-1" />
              {article.blocks || 0} Blocks
          </span>
      </div>
    </div>
  );
};

export default ArticleCard;