"use client";

import { useState } from "react";
import { SnippetRequest } from "@/lib/services/snippetsService";
import Link from "next/link";
import SnippetDeleteButton from "./SnippetDeleteButton";

export default function SnippetFilter({ snippets }: { snippets: SnippetRequest[] }) {
	const [language, setLanguage] = useState("all");

	const visible =
		language === "all" ? snippets : snippets.filter((snippet) => snippet.language === language);

	return (
		<>
			<select
				name="language"
				id="language"
				value={language}
				onChange={(event) => setLanguage(event.target.value)}
			>
				<option value="all">All</option>
				<option value="active">Active</option>
				<option value="accepted">Accepted</option>
				<option value="fulfilled">Fulfilled</option>
			</select>
			<ul>
				{visible.map((snippet) => (
					<li key={snippet.id}>
						<section>
							<p>
								<Link href={`/snippets/${snippet.id}`}>
									{snippet.title}: {snippet.description}
								</Link>
							</p>
							<p>Language: {snippet.language}</p>
						</section>
						<SnippetDeleteButton id={snippet.id!} style="icon" />
					</li>
				))}
			</ul>
		</>
	);
}
