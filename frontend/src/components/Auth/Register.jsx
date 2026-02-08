import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register: registerUser, handleSubmit, formState: { errors } } = useForm();
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await register(data);
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Register</h2>
        <input {...registerUser('email', { required: true })} placeholder="Email" className="w-full p-2 mb-2 border" />
        <input {...registerUser('password', { required: true, minLength: 6 })} type="password" placeholder="Password" className="w-full p-2 mb-2 border" />
        <input {...registerUser('name', { required: true })} placeholder="Name" className="w-full p-2 mb-2 border" />
        <input {...registerUser('hostel')} placeholder="Hostel" className="w-full p-2 mb-2 border" />
        <input {...registerUser('block')} placeholder="Block" className="w-full p-2 mb-2 border" />
        <input {...registerUser('room')} placeholder="Room" className="w-full p-2 mb-2 border" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">Register</button>
      </form>
    </div>
  );
};

export default Register;