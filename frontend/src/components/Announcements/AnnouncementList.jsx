import { useEffect, useState } from 'react';
import api from '../../services/api';

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    api.get('/announcements').then(res => setAnnouncements(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Announcements</h2>
      <ul>
        {announcements.map(ann => (
          <li key={ann.id} className="border p-4 mb-2 rounded">
            <h3>{ann.title}</h3>
            <p>{ann.content}</p>
            <small>By {ann.creator.name}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementList;