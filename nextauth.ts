import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/app/lib/mongoodb"; // Ensure this path is correct
import { AuthOptions, User as NextAuthUser } from "next-auth"; // Import User type from NextAuth
import User from './app/model/schema';

interface CustomUser extends NextAuthUser {
    role: string; // Add any custom properties you need
    image?: string; // Optional property
}

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials: Record<string, string> | undefined): Promise<CustomUser | null> {
                if (!credentials) return null;

                const { email, password } = credentials;

                try {
                    await connectMongoDB();
                    const userFromDb = await User.findOne({ email }).exec();

                    if (!userFromDb) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, userFromDb.password);

                    if (!passwordsMatch) {
                        return null;
                    }

                    // Create a user object compatible with NextAuth
                    const userResponse: CustomUser = {
                        id: userFromDb.id, // Make sure to include the id
                        email: userFromDb.email,
                        name: userFromDb.name,
                        role: userFromDb.role,
                        image: userFromDb.image,
                    };

                    return userResponse;
                } catch (error) {
                    console.log("Error: ", error);
                    return null;
                }
            },
        }),
    ],
};

export default NextAuth(authOptions);
