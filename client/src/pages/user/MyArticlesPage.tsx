
import { Link } from 'react-router-dom';
import { frontendRoutes } from '../../constants/frontendRoutes';


// Mock API function - replace with actual API call
const articles = 
  // Simulate API response
 [
    {
      id: 1,
      title: 'The Future of Space Exploration',
      description: 'An in-depth look at upcoming missions and technologies.',
      category: 'Space',
      tags: ['NASA', 'Mars', 'SpaceX'],
      image: 'https://source.unsplash.com/featured/?space',
      likes: 45,
      dislikes: 3,
      blocks: 1,
    },
    {
      id: 2,
      title: 'Top 10 Political Events of 2023',
      description: 'A recap of the most influential political happenings.',
      category: 'Politics',
      tags: ['Elections', 'Global Affairs'],
      image: 'https://source.unsplash.com/featured/?politics',
      likes: 28,
      dislikes: 7,
      blocks: 0,
    },
    {
      id: 3,
      title: 'The Rise of E-Sports',
      description: 'How competitive gaming is becoming a mainstream sport.',
      category: 'Sports',
      tags: ['Gaming', 'Tournaments'],
      image: 'https://source.unsplash.com/featured/?sports',
      likes: 62,
      dislikes: 2,
      blocks: 0,
    },
  ];


const MyArticlesPage = () => {
  // const { user } = useSelector((state: RootState) => state.auth)

  const handleDelete = async (articleId: number) => {
    // Implement delete logic here, e.g., API call
    console.log(`Deleting article ${articleId}`);
    articles.filter((article) => article.id !== articleId);
  };

  return (
    <div className="mx-auto px-14 py-28">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">My Articles</h1>
        <Link
          to={frontendRoutes.CREATE_ARTICLE}
          className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Create New Article
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article.id}
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
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {article.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span>Category: {article.category}</span>
                <span>Tags: {article.tags.join(', ')}</span>
              </div>
              <div className="mt-4 flex justify-between text-sm font-medium">
                <span>Likes: {article.likes}</span>
                <span>Dislikes: {article.dislikes}</span>
                <span>Blocks: {article.blocks}</span>
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  to={`/edit-article/${article.id}`}
                  className="flex-1 px-4 py-2 rounded-xl bg-gray-200 text-gray-900 hover:bg-gray-300 transition text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyArticlesPage;