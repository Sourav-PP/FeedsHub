import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../constants/frontendRoutes';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-3">FeedsHub</h2>
          <p className="text-sm opacity-80">A platform to explore, read, and publish articles.</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer" onClick={() => navigate(frontendRoutes.HOME)}>
              Home
            </li>
            <li className="cursor-pointer" onClick={() => navigate(frontendRoutes.ARTICLES)}>
              My Articles
            </li>
            <li className="cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
        </div>
      </div>

      <p className="text-center text-sm mt-10 opacity-70">
        © {new Date().getFullYear()} ArticleHub — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
