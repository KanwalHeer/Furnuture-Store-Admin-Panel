import { getProductById } from "@/sanity/sanity";
import Image from "next/image";
export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
        {product.title}
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative w-full h-[400px] sm:h-[500px]">
          <Image
            src={product.productImage.asset.url}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-xl text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-gray-800 mb-2">
              <span className="font-bold text-gray-900">Price:</span> $
              {product.price}
            </p>
            <p className="text-lg text-gray-800 mb-2">
              <span className="font-bold text-gray-900">Discount:</span>{" "}
              {product.dicountPercentage}%
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-bold text-gray-900">New Product:</span>{" "}
              {product.isNew ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
