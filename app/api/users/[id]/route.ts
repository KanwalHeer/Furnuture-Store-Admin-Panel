import { connectMongoDB } from "@/app/lib/mongoodb";
import User from "@/app/model/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Get the session to check if the user is authorized
    const session = await getServerSession({ req: request, ...authOptions });
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the MongoDB database
    await connectMongoDB();

    // Attempt to delete the user by their _id
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user: ", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the user." },
      { status: 500 }
    );
  }
}
