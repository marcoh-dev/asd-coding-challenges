"use server";

import { createSnippet, deleteSnippet } from "@/lib/services/snippetsService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addSnippet(formData: FormData) {
	const title = formData.get("title") as string;
	const code = formData.get("code") as string;

	const snippet = await createSnippet({ title, code });

	if (snippet) {
		revalidatePath("/snippets");
		redirect("/snippets");
	}
}

export async function removeSnippet(id: number) {
	const deleted = await deleteSnippet(id);

	if (deleted) {
		revalidatePath("/snippets");
		redirect("/snippets");
	}
}
