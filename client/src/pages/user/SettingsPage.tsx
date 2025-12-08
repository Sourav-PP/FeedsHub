// src/pages/SettingsPage.tsx

import React, { useEffect, useState } from 'react'; // Import useState
import toast from 'react-hot-toast';
import { useForm, type FieldError } from 'react-hook-form'; // Import FieldError type
import { zodResolver } from '@hookform/resolvers/zod';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'; // Import icons for tabs

import Input from '../../components/ui/Input';
import PhoneInputField from '../../components/ui/PhoneInput';
import CheckboxGroup from '../../components/ui/GroupCheckbox';
import { useCategories } from '../../features/auth/hooks/useCategories';
import { useFetchProfile } from '../../features/auth/hooks/useFetchProfile';
import { useUpdateProfile } from '../../features/auth/hooks/useUpdateProfile';
import { useChangePassword } from '../../features/auth/hooks/useChangePassword';

import {
  type ProfileFormValues,
  profileSchema,
} from '../../features/auth/schemas/updateProfileSchema';
import {
  type PasswordFormValues,
  passwordSchema,
} from '../../features/auth/schemas/changePasswordSchema';

// Define the types for the current view
type SettingsView = 'profile' | 'password';

const SettingsPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<SettingsView>('profile');

  const [showCurrentPassword, setCurrentShowPassword] = useState(false);
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => setCurrentShowPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setNewShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setConfirmShowPassword((prev) => !prev);
  // --- Custom Hooks ---
  const { profile, fetchProfileData } = useFetchProfile();
  const { updateProfileData } = useUpdateProfile();
  const { changeUserPassword } = useChangePassword();
  const { categories, getCategories } = useCategories();

  useEffect(() => {
    fetchProfileData();
    getCategories();
  }, [fetchProfileData, getCategories]);

  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    control,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      dob: '',
      preference: [],
    },
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (profile) {
      resetProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        dob: profile.dob.split('T')[0],
        preference: profile.preference || [],
      });
    }
  }, [profile, resetProfile]);

  const onSubmitProfile = async (data: ProfileFormValues) => {
    const result = await updateProfileData(data);

    if (result.success) {
      toast.success(result.message || 'Profile updated successfully!');
      fetchProfileData();
    } else {
      toast.error(result.message || 'Failed to update profile.');
    }
  };

  const onSubmitPassword = async (data: PasswordFormValues) => {
    const result = await changeUserPassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (result.success) {
      toast.success(result.message || 'Password changed successfully!');
      resetPassword(); // Clear password fields on success
    } else {
      toast.error(result.message || 'Failed to change password.');
    }
  };

  // --- 4. Render Helpers & Loading State ---
  if (!profile) {
    return (
      <div className="text-center py-20 text-lg text-gray-700">
        Loading your account settings...
      </div>
    );
  }

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const preferenceError =
    profileErrors.preference && !Array.isArray(profileErrors.preference)
      ? (profileErrors.preference as FieldError)
      : undefined;

  // --- 5. Tab Styling Helper ---
  const getTabClasses = (view: SettingsView) =>
    `flex items-center space-x-2 py-3 px-6 cursor-pointer text-lg font-semibold border-b-4 transition-colors duration-200 
         ${
           currentView === view
             ? 'border-blue-600 text-blue-600 bg-blue-50/50'
             : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
         }`;

  // --- Component JSX ---
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Account Settings </h1>
      <p className="text-lg text-gray-500 mb-10">
        Manage your personal information and security credentials.
      </p>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-10">
        <div className={getTabClasses('profile')} onClick={() => setCurrentView('profile')}>
          <FiUser className="w-5 h-5" />
          <span>Personal Profile</span>
        </div>
        <div className={getTabClasses('password')} onClick={() => setCurrentView('password')}>
          <FiLock className="w-5 h-5" />
          <span>Security & Password</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 bg-white shadow-2xl rounded-xl border border-gray-100">
        {/* --- 1. Update Profile Section --- */}
        {currentView === 'profile' && (
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Update Your Personal Details</h2>
            <form onSubmit={handleProfileSubmit(onSubmitProfile)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  {...profileRegister('firstName')}
                  error={profileErrors.firstName}
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  {...profileRegister('lastName')}
                  error={profileErrors.lastName}
                />
              </div>

              <Input
                label="Email"
                placeholder="Your email (cannot be changed)"
                value={profile.email}
                disabled
                className="cursor-not-allowed"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <PhoneInputField
                  control={control}
                  name="phone"
                  label="Phone Number"
                  error={profileErrors.phone?.message}
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  {...profileRegister('dob')}
                  error={profileErrors.dob}
                />
              </div>

              <CheckboxGroup
                label="Content Preferences (Select categories you're interested in)"
                options={categoryOptions}
                control={control}
                name="preference"
                error={preferenceError}
              />

              <button
                type="submit"
                disabled={isProfileSubmitting}
                className={`mt-4 w-full sm:w-auto py-3 px-8 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-150 transform hover:scale-[1.01] active:scale-100 ${
                  isProfileSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProfileSubmitting ? 'Updating Profile...' : 'Save Profile Changes'}
              </button>
            </form>
          </section>
        )}

        {/* --- 2. Change Password Section --- */}
        {currentView === 'password' && (
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Change Your Account Password</h2>
            <form
              onSubmit={handlePasswordSubmit(onSubmitPassword)}
              className="space-y-6 max-w-lg mx-auto"
            >
              {/* 1. Current Password Field */}
              <div className="relative">
                <Input
                  label="Current Password"
                  placeholder="Enter your current password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  {...passwordRegister('currentPassword')}
                  error={passwordErrors.currentPassword}
                />
                {/* Toggle Button/Icon */}
                <button
                  type="button"
                  onClick={toggleCurrentPasswordVisibility}
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500 hover:text-gray-800 transition-colors"
                  aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                >
                  {showCurrentPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {/* 1. New Password Field */}
              <div className="relative">
                <Input
                  label="New Password"
                  placeholder="Enter your new password"
                  type={showNewPassword ? 'text' : 'password'}
                  {...passwordRegister('newPassword')}
                  error={passwordErrors.newPassword}
                />
                {/* Toggle Button/Icon */}
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500 hover:text-gray-800 transition-colors"
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {/* 1. Confirm New Password Field */}
              <div className="relative">
                <Input
                  label="Confirm New Password"
                  placeholder="Confirm your new password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...passwordRegister('confirmPassword')}
                  error={passwordErrors.confirmPassword}
                />
                {/* Toggle Button/Icon */}
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500 hover:text-gray-800 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={isPasswordSubmitting}
                className={`mt-6 w-full py-3 px-8 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-red-600 hover:bg-red-700 transition duration-150 transform hover:scale-[1.01] active:scale-100 ${
                  isPasswordSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isPasswordSubmitting ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
