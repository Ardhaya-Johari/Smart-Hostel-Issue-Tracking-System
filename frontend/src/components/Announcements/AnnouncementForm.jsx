import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AnnouncementForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await api.post('/announcements', data);
    navigate('/announcements');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Create Announcement</h2>
      <input {...register('title', { required: true })} placeholder="Title" className="w-full p-2 mb-2 border" />
      <textarea {...register('content', { required: true })} placeholder="Content" className="w-full p-2 mb-2 border" />
      <input {...register('targetHostel')} placeholder="Target Hostel" className="w-full p-2 mb-2 border" />
      <input {...register('targetBlock')} placeholder="Target Block" className="w-full p-2 mb-2 border" />
      <select {...register('targetRole')} className="w-full p-2 mb-2 border">
        <option value="">All</option>
        <option value="STUDENT">Students</option>
        <option value="ADMIN">Admins</option>
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
};

export default AnnouncementForm;