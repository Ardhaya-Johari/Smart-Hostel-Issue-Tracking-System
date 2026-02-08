import { useForm } from 'react-hook-form';
import api from '../../services/api';

const CommentForm = ({ issueId, parentId }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await api.post('/comments', { ...data, issueId, parentId });
    reset();
    // Optionally refresh comments
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <textarea {...register('content', { required: true })} placeholder="Add a comment" className="w-full p-2 border" />
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Submit</button>
    </form>
  );
};

export default CommentForm;