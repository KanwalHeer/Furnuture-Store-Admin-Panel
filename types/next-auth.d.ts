
import {DefaultUser} from 'next-auth'
declare module 'next-auth' {
   interface Session {
    usser:DefaultUser & {
    id:string}
   }
}


declare module "next-auth" {
   interface Session {
     user: {
       email: string;
       name?: string;
       image?: string;
       role?: string;
     };
   }
 
   interface User {
     email: string;
     name?: string;
     image?: string;
     role?: string;
   };
  
 
 }
 
 
 // Typically, NextAuth's User type may look something like this:
 
   
   