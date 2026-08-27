export const commentsData = [
	{
		threadIndex: 0,
		author: "bob",
		body: "I usually keep each feature in its own module and avoid putting too much shared logic in a global module.",
	},
	{
		threadIndex: 0,
		author: "diana",
		body: "Same here. I have found that feature-based organization scales much better as the project grows.",
	},
	{
		threadIndex: 1,
		author: "alice",
		body: "JWT with short-lived access tokens and refresh tokens has worked well for me.",
	},
	{
		threadIndex: 1,
		author: "eric",
		body: "Make sure you have a strategy for revoking refresh tokens when users log out or change their password.",
	},
	{
		threadIndex: 2,
		author: "fiona",
		body: "For a forum, I would probably choose PostgreSQL. Threads and comments have a pretty natural relational structure.",
	},
	{
		threadIndex: 2,
		author: "george",
		body: "Agreed. PostgreSQL also gives you some nice options for indexing and full-text search.",
	},
	{
		threadIndex: 4,
		author: "alice",
		body: "I try to keep each test focused on one behavior and use descriptive test names.",
	},
	{
		threadIndex: 4,
		author: "charlie",
		body: "Mocking external dependencies has also made my tests much faster and less fragile.",
	},
];

export const threadsData = [
	{
		title: "Best way to structure a NestJS project?",
		author: "alice",
		body: "I am starting a new NestJS project and wondering how others organize modules, services, controllers, and shared utilities.",
	},
	{
		title: "How do you handle authentication?",
		author: "bob",
		body: "What authentication strategy are you using in your NestJS applications? I am considering JWT with refresh tokens.",
	},
	{
		title: "PostgreSQL vs MongoDB for a forum",
		author: "charlie",
		body: "I am building a small discussion platform and trying to decide between PostgreSQL and MongoDB. What would you recommend?",
	},
	{
		title: "Understanding dependency injection",
		author: "diana",
		body: "Dependency injection finally started making sense after I understood how NestJS manages providers through its module system.",
	},
	{
		title: "Tips for writing better unit tests",
		author: "eric",
		body: "What are your favorite techniques for keeping Jest unit tests readable and maintainable as a project grows?",
	},
];
