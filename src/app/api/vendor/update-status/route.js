import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req) {
  try {
    const { orderId, newStatus } = await req.json();
    const ordersCollection = await dbConnect(collections.ORDERS);

    // ১. স্ট্যাটাস আপডেট করা (accepted/rejected)
    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: newStatus } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Order not found or status already set" }, { status: 404 });
    }

    return NextResponse.json({ message: `Order ${newStatus} successfully!` });
  } catch (error) {
    return NextResponse.json({ message: "Update failed", error: error.message }, { status: 500 });
  }
}