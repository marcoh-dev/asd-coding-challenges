import { getAllDeliveries, getDeliveryById } from "@/lib/services/deliveriesService";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
	const deliveries = await getAllDeliveries();
	return deliveries.map((delivery) => ({ id: delivery.id }));
}

export default async function DeliveryDetailPage({ params }: PageProps<"/deliveries/[id]">) {
	const { id } = await params;
	const delivery = await getDeliveryById(id);

	if (!delivery) {
		// better for not found (404):
		notFound();
		// can be used for business logic/other errors
		//throw new Error(`Delivery ${id} not found`);

		// loading.tsx
		// use sparingly, better build <Suspense fallback={}> for single async components/functions
		// or leave it away when async is expected to be fast
	}

	return (
		<>
			<h2>Delivery {id}</h2>
			<p>
				From {delivery.pickup} to {delivery.destination}
			</p>
			<p>Status: {delivery.status}</p>
			<Link href="/deliveries">&lt;- All deliveries</Link>
		</>
	);
}
