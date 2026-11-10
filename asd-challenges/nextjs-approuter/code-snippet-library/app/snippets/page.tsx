import { getAllSnippets } from "@/lib/services/snippetsService";
import Link from "next/link";

export default async function SnippetsPage() {
	const snippets = await getAllSnippets(); // calls separate Backend API or makes a direct database query

	return (
		<>
			<h2>All Snippets</h2>
			<ul>
				{snippets.map((snippet) => (
					<li key={snippet.id}>
						<section>
							<p>
								<Link href={`/snippets/${snippet.id}`}>
									{snippet.title}: {snippet.description}
								</Link>
							</p>
							<p>Language: {snippet.language}</p>
						</section>
					</li>
				))}
			</ul>
		</>
	);
}
