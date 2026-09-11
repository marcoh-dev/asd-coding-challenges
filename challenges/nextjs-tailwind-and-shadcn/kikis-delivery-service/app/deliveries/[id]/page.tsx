import { getAllDeliveries, getDeliveryById } from "@/lib/services/deliveriesService";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeliveryDeleteButton from "@/components/DeliveryDeleteButton";
import DeliverySectionHeadline from "@/components/DeliverySectionHeadline";
import { buttonVariants } from "@/components/ui/button";

export async function generateStaticParams() {
	const deliveries = await getAllDeliveries();
	return deliveries.map((delivery) => ({ id: String(delivery.id) }));
}

export default async function DeliveryDetailPage({ params }: PageProps<"/deliveries/[id]">) {
	const { id } = await params;
	const delivery = await getDeliveryById(Number(id));

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
			<DeliverySectionHeadline>Delivery {id}</DeliverySectionHeadline>
			<p>
				From {delivery.pickup} to {delivery.destination}
			</p>
			<p>Status: {delivery.status}</p>
			<DeliveryDeleteButton id={delivery.id!} />
			<Link href="/deliveries" className={buttonVariants({ variant: "brand", size: "lg" })}>
				&lt;- All deliveries
			</Link>
		</>
	);
}
