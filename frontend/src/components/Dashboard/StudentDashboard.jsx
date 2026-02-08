import { useEffect, useState } from 'react';
import api from '../../services/api';

const StudentDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    api.get('/issues').then(res => setIssues(res.data));
    api.get('/announcements').then(res => setAnnouncements(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Student Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3>My Issues</h3>
          <ul>
            {issues.map(issue => <li key={issue.id}>{issue.title} - {issue.status}</li>)}
          </ul>
        </div>
        <div>
          <h3>Announcements</h3>
          <ul>
            {announcements.map(ann => <li key={ann.id}>{ann.title}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;