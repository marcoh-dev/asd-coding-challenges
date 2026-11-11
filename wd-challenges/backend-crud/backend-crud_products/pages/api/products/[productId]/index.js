import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";
import Review from "@/db/models/Review";

export default async function handler(request, response) {
  await dbConnect();
  const { productId } = request.query;

  try {
    if (request.method === "GET") {
      const product = await Product.findById(productId).populate("reviews");

      if (!product) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(product);
      return;
    }

    if (request.method === "POST") {
      const reviewData = request.body;

      const newReview = await Review.create(reviewData);

      await Product.findByIdAndUpdate(productId, {
        $push: { reviews: newReview._id },
      });

      response.status(201).json({ status: "Review created." });
      return;
    }

    if (request.method === "PUT") {
      const updatedProductData = request.body;
      await Product.findByIdAndUpdate(productId, updatedProductData);
      return response
        .status(200)
        .json({ status: "Product successfully updated." });
    }

    if (request.method === "DELETE") {
      await Product.findByIdAndDelete(productId);
      return response
        .status(200)
        .json({ status: "Product successfully deleted." });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error." });
  }

  response.status(405).json({ status: "Method not allowed." });
}
