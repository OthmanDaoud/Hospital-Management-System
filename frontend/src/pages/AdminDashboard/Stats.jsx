import React from 'react';
import { Users, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="mr-4">
        <h2 className="text-sm font-medium text-gray-600">{title}</h2>
        <p className="text-2xl font-semibold text-gray-700">{value}</p>
      </div>
    </div>
  </div>
);

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Users"  value="1,234" icon={Users}  />
      <StatCard title="Total" value="456" icon={ShoppingCart} />
      <StatCard title="Total sales" value="$7,890" icon={DollarSign} />
      <StatCard title="Growth rate" value="12%" icon={TrendingUp} />
    </div>
  );
};

export default Stats;