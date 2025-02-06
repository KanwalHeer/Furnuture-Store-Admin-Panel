import { createClient } from '@sanity/client';
// import { SanityClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Project ID from .env
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Dataset name
  apiVersion: '2025-01-17', // API version
  useCdn: false, // CDN ko production ke liye enable rakhein
  token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
 
});

export default sanityClient;



// // lib/sanity.ts



// export interface Order {
//   _id: string;
//   productImage: {
//     asset: {
//       url: string;
//     };
//   };
//   productPrice: number;
//   productId: string;
//   productTitle: string;
//   dicountPercentage: number;
//   userId: string;
//   userEmail: string;
//   userName: string;
//   userAddress: string;
//   userPhoneNumber: string;
// }

// export async function getOrders(): Promise<Order[]> {
//   const query = `*[_type == "orders"]{
//     _id,
//      productImage{
//           asset->{
//             _id,
//             url
//           }
//         },
//     productPrice,
//     productId,
//     productTitle,
//     dicountPercentage,
//     userId,
//     userEmail,
//     userName,
//     userAddress,
//     userPhoneNumber
//   }`;
//   const orders = await sanityClient.fetch<Order[]>(query);
//   return orders;
// }

// export async function getOrderById(id: string): Promise<Order | null> {
//   const query = `*[_type == "orders" && _id == $id][0]{
//     _id,
//      productImage{
//           asset->{
//             _id,
//             url
//           }
//         },
//     productPrice,
//     productId,
//     productTitle,
//     dicountPercentage,
//     userId,
//     userEmail,
//     userName,
//     userAddress,
//     userPhoneNumber
//   }`;
//   const order = await sanityClient.fetch<Order | null>(query, { id });
//   return order;
// }



// lib/sanity.ts

export interface Order {
    _id: string;
    productImage: {
      asset: {
        url: string;
      };
    };
    productPrice: number;
    productId: string;
    productTitle: string;
    dicountPercentage: number;
    userId: string;
    userEmail: string;
    userName: string;
    userAddress: string;
    userPhoneNumber: string;
  }
  
  export interface Product {
    _id: string;
    title: string;
    description: string;
    productImage: {
      asset: {
        url: string;
      };
    };
    price: number;
    tags: string[];
    dicountPercentage: number;
    isNew: boolean;
  }
  
  // Fetch all orders
  export async function getOrders(): Promise<Order[]> {
    const query = `*[_type == "orders"]{
      _id,
      productImage{
        asset->{
          _id,
          url
        }
      },
      productPrice,
      productId,
      productTitle,
      dicountPercentage,
      userId,
      userEmail,
      userName,
      userAddress,
      userPhoneNumber
    }`;
    
    const orders = await sanityClient.fetch<Order[]>(query);
    return orders;
  }
  
  // Fetch a specific order by ID
  export async function getOrderById(id: string): Promise<Order | null> {
    const query = `*[_type == "orders" && _id == $id][0]{
      _id,
      productImage{
        asset->{
          _id,
          url
        }
      },
      productPrice,
      productId,
      productTitle,
      dicountPercentage,
      userId,
      userEmail,
      userName,
      userAddress,
      userPhoneNumber
    }`;
    
    const order = await sanityClient.fetch<Order | null>(query, { id });
    return order;
  }
  
  // Fetch all products
  export async function getProducts(): Promise<Product[]> {
    const query = `*[_type == "product"]{
      _id,
      title,
      description,
      productImage{
        asset->{
          _id,
          url
        }
      },
      price,
      tags,
      dicountPercentage,
      isNew
    }`;
    
    const products = await sanityClient.fetch<Product[]>(query);
    return products;
  }
  
  // Fetch a specific product by ID
  export async function getProductById(id: string): Promise<Product | null> {
    const query = `*[_type == "product" && _id == $id][0]{
      _id,
      title,
      description,
      productImage{
        asset->{
          _id,
          url
        }
      },
      price,
      tags,
      dicountPercentage,
      isNew
    }`;
  
    const product = await sanityClient.fetch<Product | null>(query, { id });
    return product;
  }
  

 
  
 
  
  
    // Function to fetch users
  export   async function getAllUsers() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        console.log("Fetched data:", data);
  
        if (Array.isArray(data.users)) {
          console.log(data);
          
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  
   