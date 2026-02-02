import bcrypt from "bcrypt";
import { dbConnect, collections } from "@/lib/dbConnect";

export async function POST(req) {
  const body = await req.json();
  const { name, email, password, phone, image } = body;

  const userCollection = await dbConnect(collections.USERS);
  
  const exists = await userCollection.findOne({ email });
  if (exists) return Response.json({ message: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userCollection.insertOne({
    name, email, phone, image,
    password: hashedPassword, 
    role: "user",
    createdAt: new Date()
  });

  return Response.json({ success: true, id: newUser.insertedId });
}