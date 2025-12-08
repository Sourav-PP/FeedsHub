import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../constants/frontendRoutes';
import { useLogout } from '../../features/auth/hooks/useLogout';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success(result.message);
      navigate(frontendRoutes.AUTH.LOGIN);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="mx-auto px-14 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="text-blue-600 mr-1">Article</span>Feeds
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <Link to={frontendRoutes.HOME} className="hover:text-blue-600 transition duration-200">
            Home
          </Link>
          <Link
            to={frontendRoutes.ARTICLES}
            className="hover:text-blue-600 transition duration-200"
          >
            My Articles
          </Link>
          <Link to={frontendRoutes.SETTING} className="hover:text-blue-600 transition duration-200">
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col items-center gap-4 py-4 font-medium text-gray-700">
            <Link
              to={frontendRoutes.HOME}
              className="hover:text-blue-600 transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={frontendRoutes.ARTICLES}
              className="hover:text-blue-600 transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Articles
            </Link>
            <Link
              to={frontendRoutes.SETTING}
              className="hover:text-blue-600 transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
