import { useEffect, useState } from 'react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    api.get('/issues').then(res => setIssues(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <div>
        <h3>All Issues</h3>
        <ul>
          {issues.map(issue => <li key={issue.id}>{issue.title} - {issue.status}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;