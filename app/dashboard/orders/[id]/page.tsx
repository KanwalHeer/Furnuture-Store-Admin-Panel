
import { getOrderById } from "@/sanity/sanity";
import Image from "next/image";

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrderById(params.id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            height={300}
            width={300}
            src={order.productImage.asset.url}
            alt={order.productTitle}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{order.productTitle}</h2>
          <p className="text-gray-600">Price: ${order.productPrice}</p>
          <p className="text-gray-600">Discount: {order.dicountPercentage}%</p>
          <div className="mt-6">
            <h3 className="text-lg font-semibold">User Information</h3>
            <p className="text-gray-600">Name: {order.userName}</p>
            <p className="text-gray-600">Email: {order.userEmail}</p>
            <p className="text-gray-600">Address: {order.userAddress}</p>
            <p className="text-gray-600">Phone: {order.userPhoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
