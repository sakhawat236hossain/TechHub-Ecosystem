import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const orderData = await req.json();
    const ordersCollection = await dbConnect(collections.ORDERS);

    const newOrder = {
      ...orderData,
      status: "pending", 
      orderedAt: new Date(),
    };

    const result = await ordersCollection.insertOne(newOrder);
    return NextResponse.json({ message: "Order placed successfully!", orderId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Order failed", error: error.message }, { status: 500 });
  }
}