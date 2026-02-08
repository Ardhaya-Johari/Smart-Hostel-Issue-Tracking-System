import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="bg-gray-800 text-white w-64 p-4">
      <nav>
        <ul>
          <li><Link to="/" className="block p-2">Dashboard</Link></li>
          <li><Link to="/issues" className="block p-2">Issues</Link></li>
          <li><Link to="/announcements" className="block p-2">Announcements</Link></li>
          <li><Link to="/lost-and-found" className="block p-2">Lost & Found</Link></li>
          {user.role === 'ADMIN' && <li><Link to="/analytics" className="block p-2">Analytics</Link></li>}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;