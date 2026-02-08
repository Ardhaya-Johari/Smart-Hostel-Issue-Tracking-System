const StatusBadge = ({ status }) => {
  const colors = {
    REPORTED: 'bg-yellow-500',
    ASSIGNED: 'bg-blue-500',
    IN_PROGRESS: 'bg-orange-500',
    RESOLVED: 'bg-green-500',
    CLOSED: 'bg-gray-500',
  };

  return (
    <span className={`text-white px-2 py-1 rounded ${colors[status] || 'bg-gray-500'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;