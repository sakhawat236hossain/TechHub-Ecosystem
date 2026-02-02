import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; 
import { collections, dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    
    const usersCollection = await dbConnect(collections.USERS);


    const userData = await usersCollection.findOne({ email: session.user.email });

    if (!userData) {
      return NextResponse.json({ 
        name: session.user.name, 
        email: session.user.email,
        image: session.user.image,
        message: "No additional data found in DB" 
      }, { status: 200 });
    }

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}