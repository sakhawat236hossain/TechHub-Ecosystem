import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect"; 

export async function GET() {
  try {
    const productsCollection = await dbConnect(collections.PRODUCTS);

    const latestProducts = await productsCollection
      .find({})
      .sort({ createdAt: -1 }) 
      .limit(4)
      .toArray();

    return NextResponse.json(latestProducts, { status: 200 });
  } catch (error) {
    console.error("Latest Products API Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}