import mongoose from "mongoose";
import Product from "../../models/Product.js";

declare const Netlify: {
  env: {
    get(name: string): string | undefined;
  };
};

let connectionPromise: Promise<typeof mongoose> | null = null;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const mongoUri = Netlify.env.get("MONGODB_URI");

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  connectionPromise ??= mongoose.connect(mongoUri).catch((error) => {
    connectionPromise = null;
    throw error;
  });
  return connectionPromise;
};

const getProducts = async (request: Request) => {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const minPrice = url.searchParams.get("minPrice");
  const maxPrice = url.searchParams.get("maxPrice");
  const sort = url.searchParams.get("sort");
  const search = url.searchParams.get("search");

  const query: Record<string, unknown> = {};

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      (query.price as Record<string, number>).$gte = Number(minPrice);
    }
    if (maxPrice) {
      (query.price as Record<string, number>).$lte = Number(maxPrice);
    }
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { material: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  let sortOption: Record<string, 1 | -1> = { name: 1 };

  if (sort === "price-asc") {
    sortOption = { price: 1 };
  }
  if (sort === "price-desc") {
    sortOption = { price: -1 };
  }
  if (sort === "name-desc") {
    sortOption = { name: -1 };
  }

  const products = await Product.find(query).sort(sortOption);
  return json(products);
};

const getProductById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return json({ message: "Product not found" }, 404);
  }

  const product = await Product.findById(id);

  if (!product) {
    return json({ message: "Product not found" }, 404);
  }

  return json(product);
};

export default async (request: Request, context: { params?: { id?: string } }) => {
  try {
    if (request.method !== "GET") {
      return json({ message: "Method not allowed" }, 405);
    }

    await connectDB();

    if (context.params?.id) {
      return getProductById(context.params.id);
    }

    return getProducts(request);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    console.error("Product API error:", error);
    return json({ message }, 500);
  }
};

export const config = {
  path: ["/api/products", "/api/products/:id"],
};
