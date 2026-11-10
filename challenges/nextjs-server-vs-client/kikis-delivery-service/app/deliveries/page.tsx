import DeliveryFilter from "@/components/DeliveryFilter";
import { getAllDeliveries } from "@/lib/services/deliveriesService";
import Link from "next/link";
import { connection } from "next/server";

export default async function DeliveriesPage() {
	await connection();
	const deliveries = await getAllDeliveries(); // calls separate Backend API or makes a direct database query

	return (
		<>
			<h2>All Deliveries</h2>
			<DeliveryFilter deliveries={deliveries} />
			<Link href="/deliveries/new">+ new delivery</Link>
		</>
	);
}
