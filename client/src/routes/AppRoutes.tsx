import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { frontendRoutes } from '../constants/frontendRoutes';
import SignupPage from '../pages/auth/SignupPage';
import LoginPage from '../pages/auth/LoginPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={frontendRoutes.AUTH.SIGNUP} element={<SignupPage />} />
        <Route path={frontendRoutes.AUTH.LOGIN} element={<LoginPage />} />'
        <Route path="*" element={<Navigate to={frontendRoutes.AUTH.SIGNUP} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
