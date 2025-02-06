// pages/admin/dashboard.tsx
import SalesChart from "./_component/salesChart";
import OrderOverviewChart from "./_component/orderOverview";
import { getProducts } from "@/sanity/sanity";
import { getOrders } from "@/sanity/sanity";
import { getAllUsers } from "@/sanity/sanity";
import Customers from "./_component/customer";

const Dashboard = async () => {
  const orders = await getOrders();
  const products = await getProducts();
  const users = await getAllUsers();

  console.log(users, "users...");

  const totalSales = orders.reduce((acc, order) => acc + order.productPrice, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  return (
    <div className="p-4 sm:p-6">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Dashboard</h1>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Total Sales */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700">Total Sales</h2>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-600">${totalSales}</p>
          <p className="text-xs sm:text-sm text-gray-500">+12% from last month</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700">Total Orders</h2>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">{totalOrders}</p>
          <p className="text-xs sm:text-sm text-gray-500">+8% from last month</p>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700">Total Customers</h2>
          <Customers />
          <p className="text-xs sm:text-sm text-gray-500">+15% from last month</p>
        </div>

        {/* Total Products */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700">Total Products</h2>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600">{totalProducts}</p>
          <p className="text-xs sm:text-sm text-gray-500">+5% from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Sales Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Sales Overview</h2>
          <div className="h-48 sm:h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <SalesChart />
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">Orders Overview</h2>
          <div className="h-48 sm:h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <OrderOverviewChart />
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md overflow-x-auto">
  <h2 className="text-sm sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-4">Recent Orders</h2>
  <table className="w-full">
    <thead>
      <tr className="border-b">
        <th className="text-left py-1 sm:py-2 text-xs sm:text-sm">Order ID</th>
        <th className="text-left py-1 sm:py-2 text-xs sm:text-sm">Customer</th>
        <th className="text-left py-1 sm:py-2 text-xs sm:text-sm">Amount</th>
        <th className="text-left py-1 sm:py-2 text-xs sm:text-sm">Discount</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order._id} className="border-b hover:bg-gray-50">
          <td className="py-1 sm:py-2 text-xs sm:text-sm">{order._id}</td>
          <td className="py-1 sm:py-2 text-xs sm:text-sm">{order.userName}</td>
          <td className="py-1 sm:py-2 text-xs sm:text-sm">${order.productPrice}</td>
          <td className="py-1 sm:py-2">
            <span
              className={`px-1 sm:px-2 py-1 ${
                "bg-blue-100 text-blue-700"
              } rounded-full text-xs`}
            >
              {order.dicountPercentage}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default Dashboard;