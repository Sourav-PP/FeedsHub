import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { frontendRoutes } from '../constants/frontendRoutes';
import SignupPage from '../pages/auth/SignupPage';
import LoginPage from '../pages/auth/LoginPage';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';

import HomePage from '../pages/user/HomePage';
import MyArticlesPage from '../pages/user/MyArticlesPage';
import CreateArticleForm from '../features/user/components/CreateArticleForm';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- 1. Guest Routes (Accessible ONLY when LOGGED OUT) --- */}

        <Route element={<ProtectedRoute isGuestRoute={true} />}>
          <Route path={frontendRoutes.AUTH.SIGNUP} element={<SignupPage />} />
          <Route path={frontendRoutes.AUTH.LOGIN} element={<LoginPage />} />'
        </Route>

        {/* --- 2. Protected Routes (Accessible ONLY when LOGGED IN) --- */}
        <Route element={<ProtectedRoute />}>
        
        </Route>
        <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
                {/* These are the authenticated pages */}
                <Route path={frontendRoutes.HOME} element={<HomePage />} />
                <Route path={frontendRoutes.ARTICLES} element={<MyArticlesPage />} />
                <Route path={frontendRoutes.CREATE_ARTICLE} element={<CreateArticleForm />} />
            </Route>
        </Route>

        
        <Route path="*" element={<Navigate to={frontendRoutes.AUTH.SIGNUP} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
