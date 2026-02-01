import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    
 
    const productCollection = await dbConnect(collections.PRODUCTS);
    
    const result = await productCollection.insertOne({
      ...body,
      createdAt: new Date()
    });

    return NextResponse.json({ 
      success: true, 
      message: "Product added successfully!", 
      id: result.insertedId 
    }, { status: 201 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to add product" 
    }, { status: 500 });
  }
}