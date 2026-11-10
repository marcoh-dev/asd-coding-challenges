import sql from "@/lib/db";

export type SnippetRequest = {
	id?: number;
	title: string;
	language?: string | null;
	description?: string | null;
	code: string;
};

export type CreateSnippetPayload = Pick<
	SnippetRequest,
	"title" | "language" | "description" | "code"
>;

export async function getAllSnippets(): Promise<SnippetRequest[]> {
	return sql<SnippetRequest[]>`SELECT * FROM snippets`;
}

export async function getSnippetById(id: number): Promise<SnippetRequest | null> {
	const [snippet] = await sql<SnippetRequest[]>`
    SELECT * FROM snippets WHERE id = ${id}
  `;
	return snippet ?? null;
}

export async function createSnippet({
	title,
	language = null,
	description = null,
	code,
}: CreateSnippetPayload): Promise<SnippetRequest | null> {
	if (!title || !code) {
		throw new Error("title and code are required fields");
	}

	const [created] = await sql<SnippetRequest[]>`
        INSERT INTO snippets (title, language, description, code) VALUES (${title}, ${language}, ${description}, ${code}) RETURNING *;
      `;

	return created ?? null;
}

export async function deleteSnippet(id: number): Promise<boolean> {
	const result = await sql`
    DELETE FROM snippets
    WHERE id = ${id}
  `;

	return result.count > 0;
}
