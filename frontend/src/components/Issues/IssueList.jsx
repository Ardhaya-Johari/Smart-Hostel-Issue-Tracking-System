import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import StatusBadge from './StatusBadge';

const IssueList = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    api.get('/issues').then(res => setIssues(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Issues</h2>
      <Link to="/issues/new" className="bg-blue-500 text-white p-2 rounded">Report New Issue</Link>
      <ul className="mt-4">
        {issues.map(issue => (
          <li key={issue.id} className="border p-4 mb-2 rounded">
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <StatusBadge status={issue.status} />
            <Link to={`/issues/${issue.id}`} className="text-blue-500">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;