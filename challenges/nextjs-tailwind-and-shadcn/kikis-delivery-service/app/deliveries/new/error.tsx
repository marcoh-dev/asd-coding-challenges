"use client";

import DeliverySectionHeadline from "@/components/DeliverySectionHeadline";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<div>
			<DeliverySectionHeadline>Could not create this delivery.</DeliverySectionHeadline>
			<p>{error.message}</p>
			<Button onClick={reset}>Try again</Button>
		</div>
	);
}
