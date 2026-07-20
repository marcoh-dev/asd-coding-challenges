/* 

Recipe Book

Create a single TypeScript file called recipes.ts. Using only what you have learned so far — type annotations, type aliases, and function signatures — implement the following:

    A type alias Ingredient with a name (string) and amountGrams (number)
    A type alias Recipe with a name, servings (number), vegetarian (boolean), and ingredients (an array of Ingredient)
    Two variables annotated as Recipe, each holding a realistic recipe with at least two ingredients
    A function summarize(recipe: Recipe): string that returns a readable single-line description of the recipe
    A call to summarize for each recipe, logged to the console

Compile and run:

tsc recipes.ts
node recipes.js

The compiler must exit without errors. Hover over your variables in the editor and confirm the inferred types match what you declared. 

*/

type TIngredient = {
	name: string;
	amountGrams: number;
};

type TRecipe = {
	name: string;
	servings: number;
	vegetarian: boolean;
	ingredients: TIngredient[];
};

const recipe1: TRecipe = {
	name: "Spaghetti Bolognese",
	servings: 4,
	vegetarian: false,
	ingredients: [
		{ name: "Spaghetti", amountGrams: 400 },
		{ name: "Ground beef", amountGrams: 500 },
		{ name: "Tomato sauce", amountGrams: 300 },
		{ name: "Onion", amountGrams: 150 },
		{ name: "Garlic", amountGrams: 10 },
	],
};

const recipe2: TRecipe = {
	name: "Vegetable Stir Fry",
	servings: 2,
	vegetarian: true,
	ingredients: [
		{ name: "Broccoli", amountGrams: 200 },
		{ name: "Bell pepper", amountGrams: 150 },
		{ name: "Carrot", amountGrams: 100 },
		{ name: "Tofu", amountGrams: 250 },
		{ name: "Soy sauce", amountGrams: 30 },
	],
};

function summarize(recipe: TRecipe): string {
	const ingredients = recipe.ingredients
		.map((ingredient) => `${ingredient.name} (${ingredient.amountGrams}g)`)
		.join(", ");
	return `${recipe.name}${recipe.vegetarian ? ` (vegetarian)` : ``}, servings: ${recipe.servings}, ingredients: ${ingredients}`;
}

console.log(summarize(recipe1));
console.log(summarize(recipe2));
