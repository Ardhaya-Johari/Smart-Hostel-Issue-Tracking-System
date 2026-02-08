import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const IssueForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await api.post('/issues', data);
    navigate('/issues');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl mb-4">Report Issue</h2>
      <input {...register('title', { required: true })} placeholder="Title" className="w-full p-2 mb-2 border" />
      <textarea {...register('description', { required: true })} placeholder="Description" className="w-full p-2 mb-2 border" />
      <select {...register('category')} className="w-full p-2 mb-2 border">
        <option value="PLUMBING">Plumbing</option>
        {/* Add other categories */}
      </select>
      <select {...register('priority')} className="w-full p-2 mb-2 border">
        <option value="LOW">Low</option>
        {/* Add others */}
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
};

export default IssueForm;