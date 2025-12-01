import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { frontendRoutes } from '../constants/frontendRoutes';
import SignupPage from '../pages/auth/SignupPage';
import LoginPage from '../pages/auth/LoginPage';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/user/HomePage';
import MyArticlesPage from '../pages/user/MyArticlesPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={frontendRoutes.AUTH.SIGNUP} element={<SignupPage />} />
        <Route path={frontendRoutes.AUTH.LOGIN} element={<LoginPage />} />'
        <Route element={<MainLayout />}>
            <Route path={frontendRoutes.HOME} element={<HomePage />} />
        </Route>
        <Route element={<MainLayout />}>
            <Route path={frontendRoutes.ARTICLES} element={<MyArticlesPage />} />
        </Route>
        <Route path="*" element={<Navigate to={frontendRoutes.AUTH.SIGNUP} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
