"use client";

import Link from "next/link";
import { addDelivery } from "@/app/actions";

export default function NewDeliveryPage() {
	return (
		<>
			<h2>New Delivery</h2>
			<form action={addDelivery}>
				<input type="text" name="pickup" placeholder="Pickup" />
				<input type="text" name="destination" placeholder="Destination" />
				<button type="submit">Create request</button>
			</form>
			<Link href="/deliveries">&lt;- All deliveries</Link>
		</>
	);
}
