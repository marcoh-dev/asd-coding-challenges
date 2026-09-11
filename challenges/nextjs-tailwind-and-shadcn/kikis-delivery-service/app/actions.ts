"use server";

import { createDelivery, deleteDelivery } from "@/lib/services/deliveriesService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addDelivery(formData: FormData) {
	const pickup = formData.get("pickup") as string;
	const destination = formData.get("destination") as string;

	const delivery = await createDelivery({ pickup, destination });

	if (delivery) {
		revalidatePath("/deliveries");
		redirect("/deliveries");
	}
}

export async function removeDelivery(id: number) {
	const deleted = await deleteDelivery(id);

	if (deleted) {
		revalidatePath("/deliveries");
		redirect("/deliveries");
	}
}
