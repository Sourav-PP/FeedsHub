import { useSignup } from '../hooks/useSignup';
import { useForm, type FieldError } from 'react-hook-form';
import { type SignupFormValues, signupSchema } from '../schemas/signupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Input from '../../../components/ui/Input';
import { useCategories } from '../hooks/useCategories';
import { useEffect } from 'react';
import CheckboxGroup from '../../../components/ui/GroupCheckbox';
import PhoneInputField from '../../../components/ui/PhoneInput';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../constants/frontendRoutes';

const SignupForm = () => {
  const { signup } = useSignup();
  const { categories, getCategories } = useCategories();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      preference: [],
      phone: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    const result = await signup(data);

    if (result.success) {
      toast.success(result.message);
      reset();
    } else {
      toast.error(result.message);
    }
  };

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  const preferenceError =
    errors.preference && !Array.isArray(errors.preference)
      ? (errors.preference as FieldError)
      : undefined;
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md">
      <h2 className="text-3xl font-bold text-center">Create Account</h2>
      <p className="text-center mb-4">create new new account to explore</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <Input
          label="First Name"
          placeholder="Enter your first name"
          {...register('firstName')}
          error={errors.firstName}
        />
        <Input
          label="Last Name"
          placeholder="Enter your last name"
          {...register('lastName')}
          error={errors.lastName}
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...register('email')}
          error={errors.email}
        />
        <PhoneInputField
          control={control}
          name="phone"
          label="Phone Number"
          error={errors.phone?.message}
        />

        <Input label="Date of Birth" type="date" {...register('dob')} error={errors.dob} />
        <Input
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          {...register('password')}
          error={errors.password}
        />

        {/* Categories Multi-select */}
        <CheckboxGroup
          label="Select Categories"
          options={categoryOptions} // { label, value }[]
          control={control}
          name="preference"
          error={preferenceError}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
        <p className="text-center">
          Already have an account?{' '}
          <span
            className="cursor-pointer text-blue-500"
            onClick={() => navigate(frontendRoutes.AUTH.LOGIN)}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
