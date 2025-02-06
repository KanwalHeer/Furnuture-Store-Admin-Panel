
import { getOrders } from '@/sanity/sanity';
import Link from 'next/link';
import Image from 'next/image';

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Total Orders Display */}
      <div className="mb-6 text-gray-800">
        <p className="text-xl font-medium">Total Orders: {orders.length}</p>
      </div>

      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Orders</h1>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {orders.map((order) => (
          <Link
            key={order._id}
            href={`/dashboard/orders/${order._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative h-48 w-full">
              <Image
                src={order.productImage.asset.url}
                alt={order.productTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {order.productTitle}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">User:</span> {order.userName}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Price:</span> ${order.productPrice}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Discount:</span>{' '}
                {order.dicountPercentage}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
