type ResourceLink = {
	name: string;
	url: string;
};

export type CharacterStatus = "Alive" | "Dead" | "unknown";

export type Character = {
	id: number;
	name: string;
	status: CharacterStatus;
	species: string;
	type: string;
	gender: "Female" | "Male" | "Genderless" | "unknown";
	origin: ResourceLink;
	location: ResourceLink;
	image: string;
	episode: string[];
	url: string;
	created: string;
};

export type CharacterInput = Pick<
	Character,
	"name" | "status" | "species" | "type" | "gender" | "image"
> & {
	origin: { name: string };
	location: { name: string };
};
