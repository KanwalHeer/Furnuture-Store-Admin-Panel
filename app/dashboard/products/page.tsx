'use client'

import { getProducts } from '@/sanity/sanity';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Product } from '@/sanity/sanity';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen relative">
      {/* Total Products Display */}
      <div className='flex justify-between'>
      <div className="mb-6 text-gray-800">
        <p className="text-xl font-medium">Total Products: {products.length}</p>
      </div>

      {/* Add New Product Button (top right) */}
      <div className="absolute top-8 right-8">
        <Link href="/dashboard/products/newProduct">
          <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-700 transition duration-300">
            Add New Product
          </button>
        </Link>
      </div>
      </div>
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Products</h1>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/dashboard/products/${product._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex items-center"
          >
            {/* Product Image */}
            <div className="relative h-24 w-24 flex-shrink-0">
              <Image
                src={product.productImage.asset.url}
                alt={product.title}
                width={96}
                height={96}
                className="object-cover rounded-md"
              />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col justify-between">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Price:</span> ${product.price}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Discount:</span> {product.dicountPercentage}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
