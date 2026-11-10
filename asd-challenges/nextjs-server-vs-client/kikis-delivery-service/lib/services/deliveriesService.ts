import sql from "@/lib/db";

export type DeliveryStatus = "active" | "accepted" | "denied" | "fulfilled";

export type DeliveryRequest = {
	id?: number;
	pickup: string;
	destination: string;
	status: DeliveryStatus;
};

export type CreateDeliveryPayload = Pick<DeliveryRequest, "pickup" | "destination">;

export async function getAllDeliveries(): Promise<DeliveryRequest[]> {
	return sql<DeliveryRequest[]>`SELECT * FROM deliveries`;
}

export async function getDeliveryById(id: number): Promise<DeliveryRequest | null> {
	const [delivery] = await sql<DeliveryRequest[]>`
    SELECT * FROM deliveries WHERE id = ${id}
  `;
	return delivery ?? null;
}

export async function createDelivery({
	pickup,
	destination,
}: CreateDeliveryPayload): Promise<DeliveryRequest | null> {
	if (!pickup || !destination) {
		throw new Error("pickup and destination are required fields");
	}

	const [created] = await sql<DeliveryRequest[]>`
        INSERT INTO deliveries (pickup, destination, status) VALUES (${pickup}, ${destination}, 'active') RETURNING *;
      `;

	return created ?? null;
}

export async function deleteDelivery(id: number): Promise<boolean> {
	const result = await sql`
    DELETE FROM deliveries
    WHERE id = ${id}
  `;

	return result.count > 0;
}
