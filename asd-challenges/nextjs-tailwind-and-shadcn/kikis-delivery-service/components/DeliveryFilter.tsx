"use client";

import { useState } from "react";
import { DeliveryRequest } from "@/lib/services/deliveriesService";
import Link from "next/link";
import DeliveryDeleteButton from "./DeliveryDeleteButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function DeliveryFilter({ deliveries }: { deliveries: DeliveryRequest[] }) {
	const [status, setStatus] = useState("all");

	const visible =
		status === "all" ? deliveries : deliveries.filter((delivery) => delivery.status === status);

	return (
		<>
			<Select
				name="status"
				id="status"
				value={status}
				onValueChange={(value) => setStatus(value ?? "all")}
			>
				<SelectTrigger>
					<SelectValue placeholder="Filter by status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					<SelectItem value="active">Active</SelectItem>
					<SelectItem value="accepted">Accepted</SelectItem>
					<SelectItem value="fulfilled">Fulfilled</SelectItem>
				</SelectContent>
			</Select>
			<ul>
				{visible.map((delivery) => (
					<li key={delivery.id}>
						<Card>
							<CardHeader>
								<CardTitle>
									{delivery.pickup} to {delivery.destination}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ul>
									<li>Status: {delivery.status}</li>
								</ul>
								<Link
									href={`/deliveries/${delivery.id}`}
									className={buttonVariants({ variant: "secondary", size: "sm" })}
								>
									Detail
								</Link>
							</CardContent>

							<DeliveryDeleteButton id={delivery.id!} style="icon" />
						</Card>
					</li>
				))}
			</ul>
		</>
	);
}
