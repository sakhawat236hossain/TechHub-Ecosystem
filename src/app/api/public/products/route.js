import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";

export async function GET() {
  try {
    const productsCollection = await dbConnect(collections.PRODUCTS);

    const products = await productsCollection.find({}).toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("❌ Get Products Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
