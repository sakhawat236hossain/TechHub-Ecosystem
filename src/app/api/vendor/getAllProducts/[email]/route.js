import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";

export async function GET(req, { params }) {
  try {
    const { email } = await params;
    const ordersCollection = await dbConnect(collections.ORDERS);
    
    // শুধু ওই বিক্রেতার (sellerEmail) কাছে আসা অর্ডারগুলো খুঁজে বের করা
    const requests = await ordersCollection
      .find({ sellerEmail: email })
      .sort({ orderedAt: -1 })
      .toArray();

    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching requests" }, { status: 500 });
  }
}