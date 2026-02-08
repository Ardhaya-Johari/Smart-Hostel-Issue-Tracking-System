import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import api from '../../services/api';

const AnalyticsChart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get('/analytics').then(res => {
      setData(res.data.categoryCounts || {});
    });
  }, []);

  const chartData = Object.entries(data).map(([key, value]) => ({
    category: key,
    count: value,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Analytics</h2>

      {chartData.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" />
        </BarChart>
      )}
    </div>
  );
};

export default AnalyticsChart;
