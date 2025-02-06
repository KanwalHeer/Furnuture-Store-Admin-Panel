"use client";
import React, { useState } from 'react';
import sanityClient from '@/sanity/sanity'; 

// Define a type for the product data structure including the image field
interface ProductData {
  _type: string;
  title: string;
  description: string;
  price: number;
  dicountPercentage: number;
  isNew: boolean;
  tags: string[];
  productImage?: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
}

export default function NewProductForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    productImage: null as File | null, // file type for image
    price: '',
    tags: '',
    dicountPercentage: '',
    isNew: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevState) => ({
      ...prevState,
      productImage: file,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      isNew: e.target.checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price || !formData.productImage) {
      alert('Please fill all the required fields');
      return;
    }

    try {
      // Prepare the product data object without productImage first
      const productData: ProductData = {
        _type: 'product',
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        dicountPercentage: formData.dicountPercentage ? parseFloat(formData.dicountPercentage) : 0,
        isNew: formData.isNew,
        tags: formData.tags.split(',').map((tag) => tag.trim()),
      };

      // Upload the image to Sanity and get the asset reference
      const imageAsset = await sanityClient.assets.upload('image', formData.productImage);

      // Now include the image reference in productData
      productData.productImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      };

      // Create the product document in Sanity
      await sanityClient.create(productData);
      alert('Product added successfully!');

      // Reset the form after successful submission
      setFormData({
        title: '',
        description: '',
        productImage: null,
        price: '',
        tags: '',
        dicountPercentage: '',
        isNew: false,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('There was an error adding the product.');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Product Image */}
        <div>
          <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            id="productImage"
            name="productImage"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="mt-1"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Discount Percentage */}
        <div>
          <label htmlFor="dicountPercentage" className="block text-sm font-medium text-gray-700">
            Discount Percentage
          </label>
          <input
            type="number"
            id="dicountPercentage"
            name="dicountPercentage"
            value={formData.dicountPercentage}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* New Badge */}
        <div>
          <label htmlFor="isNew" className="block text-sm font-medium text-gray-700">
            New Product
          </label>
          <input
            type="checkbox"
            id="isNew"
            name="isNew"
            checked={formData.isNew}
            onChange={handleCheckboxChange}
            className="mt-1"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
