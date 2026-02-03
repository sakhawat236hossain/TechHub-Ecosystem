import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { productId, rating, comment, userName, userImage, userEmail } = await req.json();
    const productsCollection = await dbConnect(collections.PRODUCTS);

    const review = {
      userName,
      userImage,
      userEmail,
      rating: Number(rating),
      comment,
      date: new Date(),
    };

    await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      { $push: { reviews: review } }
    );

    return NextResponse.json({ message: "Review added!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}