import { useEffect, useState } from 'react';
import api from '../../services/api';

const CommentList = ({ issueId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.get(`/comments?issueId=${issueId}`).then(res => setComments(res.data));
  }, [issueId]);

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="border p-2 mb-2">
            <p>{comment.content}</p>
            <small>By {comment.author.name}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;