// pages/analytics/page.tsx
import React from 'react';
import SalesChart from '../_component/salesChart';
import OrderOverviewChart from '../_component/orderOverview';

export default function Page() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Sales</h2>
          <p className="text-3xl font-bold text-yellow-600">$12,345</p>
          <p className="text-sm text-gray-500">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
          <p className="text-sm text-gray-500">+8% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Customers</h2>
          <p className="text-3xl font-bold text-green-600">5,678</p>
          <p className="text-sm text-gray-500">+15% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
          <p className="text-3xl font-bold text-purple-600">456</p>
          <p className="text-sm text-gray-500">+5% from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Overview</h2>
          <div className="h-72 bg-gray-100 rounded-lg flex items-center justify-center">
            <SalesChart />
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Orders Overview</h2>
          <div className="h-72 bg-gray-100 rounded-lg flex items-center justify-center">
            <OrderOverviewChart />
          </div>
        </div>
      </div>

      {/* Performance Comparison Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Performance Comparison</h2>
        <div className="flex justify-between">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md w-full mr-4">
            <h3 className="font-semibold text-lg text-blue-600">Sales vs Last Month</h3>
            <p className="text-3xl font-bold text-blue-600">$12,345</p>
            <p className="text-sm text-gray-500">+15% compared to last month</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow-md w-full">
            <h3 className="font-semibold text-lg text-green-600">Orders vs Last Month</h3>
            <p className="text-3xl font-bold text-green-600">1,234</p>
            <p className="text-sm text-gray-500">+8% compared to last month</p>
          </div>
        </div>
      </div>

      

      {/* Recent Performance Insights */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Insights</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li className="text-gray-700">Sales have increased by 12% compared to last month, attributed to seasonal promotions.</li>
          <li className="text-gray-700">Orders have been consistent with an 8% increase, indicating stable growth.</li>
          <li className="text-gray-700">Customer retention rate is up by 5%, showing improving customer satisfaction.</li>
        </ul>
      </div>
    </div>
  );
}
