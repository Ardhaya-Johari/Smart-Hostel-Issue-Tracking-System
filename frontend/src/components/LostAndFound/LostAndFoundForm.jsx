import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const LostAndFoundForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await api.post('/lost-and-found', data);
    navigate('/lost-and-found');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Report Lost/Found Item</h2>
      <input {...register('itemName', { required: true })} placeholder="Item Name" className="w-full p-2 mb-2 border" />
      <textarea {...register('description', { required: true })} placeholder="Description" className="w-full p-2 mb-2 border" />
      <input {...register('location', { required: true })} placeholder="Location" className="w-full p-2 mb-2 border" />
      <input {...register('date', { required: true })} type="date" className="w-full p-2 mb-2 border" />
      <button type="submit" className="w-full bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
};

export default LostAndFoundForm;