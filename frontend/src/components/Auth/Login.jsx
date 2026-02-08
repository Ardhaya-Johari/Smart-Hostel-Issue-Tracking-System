import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register: registerUser, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input {...registerUser('email', { required: true })} placeholder="Email" className="w-full p-2 mb-2 border" />
        {errors.email && <p className="text-red-500">Email required</p>}
        <input {...registerUser('password', { required: true })} type="password" placeholder="Password" className="w-full p-2 mb-2 border" />
        {errors.password && <p className="text-red-500">Password required</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2">Login</button>
        <p className="mt-2">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;