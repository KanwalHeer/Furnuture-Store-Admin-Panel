// Define a type that matches NextAuth's expectations
// types/type.ts
export interface NextAuthUser {
    email: string;
    name: string;
    role: string;
    image?: string;
  }
  
  