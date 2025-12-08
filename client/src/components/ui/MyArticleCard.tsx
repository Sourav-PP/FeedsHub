import { Link } from 'react-router-dom';
import React from 'react';
import { FiThumbsUp, FiThumbsDown, FiEyeOff, FiEdit, FiTrash2 } from 'react-icons/fi';
import type { IArticleDTO } from '../../types/dtos/article';
import Swal from 'sweetalert2';

interface MyArticleCardProps {
  article: IArticleDTO;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MyArticleCard: React.FC<MyArticleCardProps> = ({ article, onEdit, onDelete }) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: 'Delete Article?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it',
    });

    if (result.isConfirmed) {
      onDelete(article.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    onEdit(article.id);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
      {/* The main card content links to the details page (Wrapper for image and text) */}
      <Link to={`/article/${article.id}`} className="block">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-6">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 mt-3 line-clamp-3">{article.description}</p>
        </div>
      </Link>

      {/* Interaction Metrics Footer */}
      <div className="flex justify-between items-center p-4 border-t border-gray-100">
        {/* Action Buttons: Edit and Delete */}
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition duration-150"
            aria-label="Edit Article"
          >
            <FiEdit className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-full text-red-600 hover:bg-red-100 transition duration-150"
            aria-label="Delete Article"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>

        {/* Metrics (as in the original card) */}
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span className="flex items-center">
            <FiThumbsUp className="mr-1 text-blue-500" />
            {article.likes || 0}
          </span>
          <span className="flex items-center">
            <FiThumbsDown className="mr-1 text-red-500" />
            {article.dislikes || 0}
          </span>
          <span className="flex items-center text-xs text-gray-400">
            <FiEyeOff className="mr-1" />
            {article.blocks || 0} Blocks
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyArticleCard;
