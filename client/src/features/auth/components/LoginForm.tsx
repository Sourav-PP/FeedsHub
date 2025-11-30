import { useLogin } from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { type LoginFormValues, loginSchema } from '../schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Input from '../../../components/ui/Input';
import { frontendRoutes } from '../../../constants/frontendRoutes';

const LoginForm = () => {
  const { login } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = async (data: LoginFormValues) => {
    const result = await login(data);

    if(result.success) {
      toast.success(result.message);
      reset();
    } else {
      toast.error(result.message)
    }
  }
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md">
      <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
      <p className="text-center mb-4">Please login to your account</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...register('email')}
          error={errors.email}
        />
        <Input
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          {...register('password')}
          error={errors.password}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 transition-colors ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'loading...' : 'login'}
        </button>
        <p className="text-center">
          Don't have an account?{' '}
          <span
            className="cursor-pointer text-blue-500"
            onClick={() => navigate(frontendRoutes.AUTH.SIGNUP)}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  )
}

export default LoginForm
