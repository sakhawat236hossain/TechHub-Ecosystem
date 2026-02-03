import React from "react";
import { dbConnect, collections } from "@/lib/dbConnect";
import ProductCard from "@/components/Cards/ProductCard/ProductCard";

const AllProductsPage = async () => {
  const productsCollection = await dbConnect(collections.PRODUCTS);
  const products = await productsCollection.find({}).toArray();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 border-l-8 border-blue-600 pl-6">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">
          TechHub <span className="text-blue-600">Inventory</span>
        </h1>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-1">
          Server-Side Rendered Hardware Deployments
        </p>
      </header>

      {products.length === 0 && (
        <p className="text-center py-20 font-bold uppercase text-zinc-500">No assets deployed yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id.toString()} product={JSON.parse(JSON.stringify(product))} />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;