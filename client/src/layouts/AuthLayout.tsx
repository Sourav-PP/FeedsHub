import React, { type ReactNode } from 'react';
import AuthBg from '../assets/images/auth-bg.jpg';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-stretch bg-[#ffffff] text-gray-900">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 relative">
        {/* Background image */}
        <img
          src={AuthBg}
          alt="Auth Background"
          className="absolute inset-0 w-full h-full object-cover rounded-l-4xl"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 from-gray-500/20 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default AuthLayout;
