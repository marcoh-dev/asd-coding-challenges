import { getProductById } from "@/services/productServices";

export default function handler(request, response) {
	const { id } = request.query;
	const product = getProductById(id);
	product ? response.status(200).json(product) : response.status(404).json("Not Found");
	//response.status(200).json(getProductById(id));
}
