import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const AdminReport = () => {
  const [reportData, setReportData] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');

  
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
console.log('🔐 Loaded Admin Password from env:', ADMIN_PASSWORD);


  const handleSubmit = () => {
    if (enteredPassword === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('❌ Incorrect password!');
    }
  };

  // Fetch charts
  useEffect(() => {
    if (authenticated) {
      fetch('http://localhost:5000/feedback-report')
        .then(res => res.json())
        .then(data => setReportData(data))
        .catch(err => console.error(err));

      fetch('http://localhost:5000/all-feedbacks')
        .then(res => res.json())
        .then(data => setFeedbackList(data))
        .catch(err => console.error(err));
    }
  }, [authenticated]);

  const barChartData = {
    labels: reportData.map(item => item._id),
    datasets: [{
      label: 'Average Rating',
      data: reportData.map(item => item.averageRating.toFixed(2)),
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
    }]
  };

  const pieChartData = {
    labels: reportData.map(item => item._id),
    datasets: [{
      label: 'Feedback Count',
      data: reportData.map(item => item.count),
      backgroundColor: [
        '#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA',
        '#F472B6', '#4ADE80', '#FACC15', '#2DD4BF', '#C084FC'
      ],
    }]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: '📊 Average Rating per Teacher',
        font: { size: 16 }
      },
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true, max: 5, ticks: { stepSize: 1 } }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: '🥧 Feedback Count per Teacher',
        font: { size: 16 }
      },
      legend: { position: 'right' }
    }
  };

  // 🔐 Password screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">🔐 Admin Access</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded mb-4"
          />
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">📈 Admin Feedback Report</h2>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4 h-[350px]">
          <Bar data={barChartData} options={barOptions} />
        </div>
        <div className="bg-white rounded shadow p-4 h-[350px]">
          <Pie data={pieChartData} options={pieOptions} />
        </div>
      </div>

      {/* Feedback Table */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3">📋 All Feedbacks with Student Info</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2 border">Student</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Subject</th>
                <th className="p-2 border">Teacher</th>
                <th className="p-2 border">Rating</th>
                <th className="p-2 border">Comment</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((fb, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2 border">{fb.studentName || 'Anonymous'}</td>
                  <td className="p-2 border">{fb.email || 'Hidden'}</td>
                  <td className="p-2 border">{fb.subject}</td>
                  <td className="p-2 border">{fb.teacherName}</td>
                  <td className="p-2 border">{fb.rating}</td>
                  <td className="p-2 border">{fb.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReport;
