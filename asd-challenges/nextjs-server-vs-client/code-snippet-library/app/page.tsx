import Link from "next/link";

export default function HomePage() {
	return (
		<>
			<h1>Code Snippet Library</h1>
			<p>All your code snippets in one place.</p>
			<Link href="/snippets">-&gt; All snippets</Link>
		</>
	);
}
