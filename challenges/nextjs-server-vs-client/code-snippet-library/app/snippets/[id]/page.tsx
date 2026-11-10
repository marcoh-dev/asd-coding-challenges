import { getSnippetById } from "@/lib/services/snippetsService";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SnippetDetailPage({ params }: PageProps<"/snippets/[id]">) {
	const { id } = await params;
	const snippet = await getSnippetById(Number(id));

	if (!snippet) {
		// better for not found (404):
		notFound();

		// can be used for business logic/other errors
		// throw new Error(`Snippet ${id} not found`);

		// loading.tsx
		// use sparingly, better build <Suspense fallback={}> for single async components/functions
		// or leave it away when async is expected to be fast
	}

	return (
		<>
			<h2>Snippet {id}</h2>
			<p>Title: {snippet.title}</p>
			<p>Description: {snippet.description}</p>
			<p>Language: {snippet.language}</p>
			<pre>
				<code>{snippet.code}</code>
			</pre>
			<Link href="/snippets">&lt;- All snippets</Link>
		</>
	);
}
