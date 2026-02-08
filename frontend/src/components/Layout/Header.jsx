import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-xl font-bold">Smart Hostel Issue Tracking</h1>
      <div>
        <span>Welcome, {user.name}</span>
        <button onClick={logout} className="ml-4 bg-red-500 text-white p-2">Logout</button>
      </div>
    </header>
  );
};

export default Header;