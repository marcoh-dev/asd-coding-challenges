import dbConnect from "@/db/connect";
import Product from "@/db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  try {
    if (request.method === "GET") {
      const product = await Product.findById(id).populate("reviews");

      if (!product) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(product);
      return;
    }

    if (request.method === "PUT") {
      const updatedProductData = request.body;
      await Product.findByIdAndUpdate(id, updatedProductData);
      return response
        .status(200)
        .json({ status: "Product successfully updated." });
    }

    if (request.method === "DELETE") {
      await Product.findByIdAndDelete(id);
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
