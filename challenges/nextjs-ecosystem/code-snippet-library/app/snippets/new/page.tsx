"use client";

import Link from "next/link";
import SnippetAddForm from "@/components/SnippetAddForm";

export default function NewSnippetPage() {
	return (
		<>
			<h2 className="font-semibold text-2xl">New Snippet</h2>
			<SnippetAddForm />
			<Link href="/snippets">&lt;- All snippets</Link>
		</>
	);
}
