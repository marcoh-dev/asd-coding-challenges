import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";
import Review from "@/db/models/Review";

export default async function handler(request, response) {
	await dbConnect();
	const { id } = request.query;

	if (request.method === "GET") {
		const product = await Product.findById(id).populate("reviews");

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

		await Product.findByIdAndUpdate(id, {
			$push: { reviews: newReview._id },
		});

		response.status(201).json({ status: "Review created." });
		return;
	}

	response.status(405).json({ status: "Method not allowed." });
}
