import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const LostAndFoundList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/lost-and-found').then(res => setItems(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Lost & Found</h2>
      <Link to="/lost-and-found/new" className="bg-blue-500 text-white p-2 rounded">Report Item</Link>
      <ul className="mt-4">
        {items.map(item => (
          <li key={item.id} className="border p-4 mb-2 rounded">
            <h3>{item.itemName}</h3>
            <p>{item.description}</p>
            <p>Status: {item.status}</p>
            {item.status === 'OPEN' && <button onClick={() => api.post(`/lost-and-found/${item.id}/claim`)}>Claim</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LostAndFoundList;