"use client";

import Link from "next/link";
import { addSnippet } from "@/app/actions";

export default function NewSnippetPage() {
	return (
		<>
			<h2>New Snippet</h2>
			<form action={addSnippet}>
				<input type="text" name="title" placeholder="Title" />
				<input type="text" name="code" placeholder="Code" />
				<button type="submit">Create snippet</button>
			</form>
			<Link href="/snippets">&lt;- All snippets</Link>
		</>
	);
}
