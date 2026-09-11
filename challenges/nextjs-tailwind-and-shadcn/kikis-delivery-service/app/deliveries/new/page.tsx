"use client";

import Link from "next/link";
import { addDelivery } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import DeliverySectionHeadline from "@/components/DeliverySectionHeadline";

export default function NewDeliveryPage() {
	return (
		<>
			<DeliverySectionHeadline>New Delivery</DeliverySectionHeadline>
			<form action={addDelivery}>
				<div className="grid gap-2">
					<Label htmlFor="pickup">Pickup</Label>
					<Input id="pickup" name="pickup" placeholder="Pickup" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="destination">Destination</Label>
					<Input id="destination" name="destination" placeholder="Destination" />
				</div>
				<Button type="submit">Create delivery</Button>
			</form>
			<Link href="/deliveries" className={buttonVariants({ variant: "brand", size: "lg" })}>
				&lt;- All deliveries
			</Link>
		</>
	);
}
