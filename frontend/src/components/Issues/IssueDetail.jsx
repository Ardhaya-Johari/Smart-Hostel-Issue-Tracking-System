import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import StatusBadge from './StatusBadge';
import CommentList from '../Comments/CommentList';
import CommentForm from '../Comments/CommentForm';

const IssueDetail = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    api.get(`/issues/${id}`).then(res => setIssue(res.data));
  }, [id]);

  if (!issue) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl mb-4">{issue.title}</h2>
      <p>{issue.description}</p>
      <StatusBadge status={issue.status} />
      <CommentList issueId={id} />
      <CommentForm issueId={id} />
    </div>
  );
};

export default IssueDetail;