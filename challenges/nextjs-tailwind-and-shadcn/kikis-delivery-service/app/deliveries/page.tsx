import DeliveryFilter from "@/components/DeliveryFilter";
import DeliverySectionHeadline from "@/components/DeliverySectionHeadline";
import { buttonVariants } from "@/components/ui/button";
import { getAllDeliveries } from "@/lib/services/deliveriesService";
import Link from "next/link";

export default async function DeliveriesPage() {
	const deliveries = await getAllDeliveries(); // calls separate Backend API or makes a direct database query

	return (
		<>
			<DeliverySectionHeadline>All Deliveries</DeliverySectionHeadline>
			<p>
				<Link
					href="/deliveries/new"
					className={buttonVariants({ variant: "brand", size: "lg" })}
				>
					+ new delivery
				</Link>
			</p>
			<DeliveryFilter deliveries={deliveries} />
		</>
	);
}
