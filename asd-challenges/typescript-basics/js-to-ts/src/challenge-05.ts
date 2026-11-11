interface User {
	id: number;
	name: string;
	email?: string;
}

const users: User[] = [
	{ id: 1, name: "Kim", email: "kim@example.com" },
	{ id: 2, name: "Lee" },
];

function formatUser(user: User): string {
	// LOGIC here for a format like: Kim <kim@example.com>
	return user.email == null ? `${user.name}` : `${user.name} <${user.email}>`;
	//return user.email ? `${user.name} <${user.email}>` : `${user.name}`;
}

users.forEach((user) => console.log(formatUser(user)));
