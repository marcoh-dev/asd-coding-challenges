import DeliverySectionHeadline from "@/components/DeliverySectionHeadline";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
	return (
		<>
			<DeliverySectionHeadline>Delivery not found.</DeliverySectionHeadline>

			<Link href="/deliveries" className={buttonVariants({ variant: "brand", size: "lg" })}>
				&lt;- All deliveries
			</Link>
		</>
	);
}
