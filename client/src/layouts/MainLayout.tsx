import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-emerald-50 via-amber-50 to-lime-50 text-gray-900">
      <Navbar />
      <main className="flex-1 pt-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
