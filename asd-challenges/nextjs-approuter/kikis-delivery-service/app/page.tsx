import { getAllDeliveries } from "@/lib/services/deliveriesService";
import Link from "next/link";

export default async function HomePage() {
	const deliveries = await getAllDeliveries(); // calls separate Backend API or makes a direct database query
	const firstDelivery = deliveries[0];

	return (
		<>
			<p>Fast, reliable deliveries across the city.</p>
			{firstDelivery && (
				<>
					<h2>First delivery:</h2>
					<ul>
						<li key={firstDelivery.id}>
							{firstDelivery.pickup} to {firstDelivery.destination}
						</li>
					</ul>
					<Link href="/deliveries">-&gt; All deliveries</Link>
				</>
			)}
		</>
	);
}
