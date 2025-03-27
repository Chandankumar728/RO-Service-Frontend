import React, { useState } from 'react';
import { 
  Users, 
  Wrench, 
  ShieldCheck, 
  TrendingUp, 
  Bell, 
  Search, 
  Filter, 
  PlusCircle 
} from 'lucide-react';

// Dummy data for dashboard
const statsData = [
  { 
    icon: Users, 
    title: 'Total Customers', 
    value: '1,245', 
    change: '+12%',
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    icon: Wrench, 
    title: 'Services Completed', 
    value: '589', 
    change: '+8%',
    color: 'bg-green-100 text-green-600'
  },
  { 
    icon: ShieldCheck, 
    title: 'Pending Services', 
    value: '76', 
    change: '+3%',
    color: 'bg-yellow-100 text-yellow-600'
  },
  { 
    icon: TrendingUp, 
    title: 'Revenue', 
    value: '$125,450', 
    change: '+15%',
    color: 'bg-purple-100 text-purple-600'
  }
];

const recentServices = [
  {
    id: 1,
    customer: 'John Doe',
    service: 'Regular Maintenance',
    date: '2024-03-20',
    status: 'Completed',
    technician: 'Mike Johnson'
  },
  {
    id: 2,
    customer: 'Sarah Smith',
    service: 'System Repair',
    date: '2024-03-22',
    status: 'In Progress',
    technician: 'Emma Williams'
  },
  {
    id: 3,
    customer: 'Robert Brown',
    service: 'Installation',
    date: '2024-03-25',
    status: 'Scheduled',
    technician: 'David Miller'
  }
];

export default function RoDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderStatCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsData.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.color} rounded-lg p-4 shadow-md hover:shadow-lg transition-all`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/50 p-2 rounded-full">
                <stat.icon size={24} className="text-current" />
              </div>
              <div>
                <p className="text-sm font-medium opacity-75">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
            <span className="text-sm font-semibold bg-white/30 px-2 py-1 rounded-full">
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRecentServices = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Services</h2>
        <div className="flex space-x-2">
          <button className="text-gray-600 hover:text-blue-600">
            <Filter size={20} />
          </button>
          <button className="text-gray-600 hover:text-blue-600">
            <PlusCircle size={20} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Service</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Technician</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentServices.map((service) => (
              <tr key={service.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{service.customer}</td>
                <td className="px-4 py-3">{service.service}</td>
                <td className="px-4 py-3">{service.date}</td>
                <td className="px-4 py-3">{service.technician}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${service.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      service.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'}
                  `}>
                    {service.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
     

      {/* Dashboard Content */}
      <div>
        {renderStatCards()}
        {renderRecentServices()}
      </div>
    </div>
  );
}