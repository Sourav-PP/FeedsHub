import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from '../pages/auth/SignupPage';
import { frontendRoutes } from '../constants/frontendRoutes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={frontendRoutes.AUTH.SIGNUP} element={<SignupPage />} />
        <Route path="*" element={<Navigate to={frontendRoutes.AUTH.SIGNUP} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
