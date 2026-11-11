import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";
import Review from "@/db/models/Review";

export default async function handler(request, response) {
	await dbConnect();
	const { productId } = request.query;

	console.log("reviews js");

	try {
		if (request.method === "POST") {
			const reviewData = request.body;

			const newReview = await Review.create(reviewData);

			await Product.findByIdAndUpdate(productId, {
				$push: { reviews: newReview._id },
			});

			response.status(201).json({ status: "Review created." });
			return;
		}
	} catch (error) {
		console.error(error);
		return response.status(500).json({ status: "Internal Server Error." });
	}

	response.status(405).json({ status: "Method not allowed." });
}
