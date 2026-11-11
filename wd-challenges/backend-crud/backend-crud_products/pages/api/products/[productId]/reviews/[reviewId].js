import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";
import Review from "@/db/models/Review";

export default async function handler(request, response) {
  await dbConnect();
  const { productId, reviewId } = request.query;
  console.log("request query", request.query);

  try {
    if (request.method === "PUT") {
      const updatedReviewData = request.body;
      await Review.findByIdAndUpdate(reviewId, updatedReviewData);
      return response
        .status(200)
        .json({ status: "Review successfully updated." });
    }

    if (request.method === "DELETE") {
      await Review.findByIdAndDelete(reviewId);

      await Product.findByIdAndUpdate(productId, {
        $pull: { reviews: reviewId },
      });

      return response
        .status(200)
        .json({ status: "Review successfully deleted." });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ status: "Internal Server Error." });
  }

  response.status(405).json({ status: "Method not allowed." });
}
