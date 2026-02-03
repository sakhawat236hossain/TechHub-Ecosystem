import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params; 

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid Product ID Format" },
        { status: 400 }
      );
    }

    const productCollection = await dbConnect(collections.PRODUCTS);

    const result = await productCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Product not found in database" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Asset purged successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}