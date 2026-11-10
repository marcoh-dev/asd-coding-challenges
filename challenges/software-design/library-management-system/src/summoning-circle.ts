/*
Summoning Circle

Imagining implementing a creature summoning feature for a fantasy game. The player can interact with a summoning circle, injects ingredients of a specific type and the summoning circle creates a magic creature of that type.

Implement the SummoningCirclce with the factory pattern:

    define an interface Creature with name: string and a method useAbility: which prints a message what the creature does.
    Create multiple classes which implement the creature interface. Some suggestions: a Dragon class with the ability breathing fire, a Phoenix class with ability Reborn, a Unicorn class with ability Dancing on rainbow.
    Create the Factory class SummoningCircle with a method called summon(ingredientType: string). Depending on the ingridient type (fire, air, sparkles, etc) a different Creature class is created and returned.
    Use the Summoning circle with different ingredients.

*/

interface Creature {
	name: string;
	useAbility(): void;
}

class SummoningCircle {
	summon(ingredientType: string): Creature {
		switch (ingredientType) {
			case "fire":
				return new Dragon("Dragon");
			case "air":
				return new Phoenix("Phoenix");
			case "sparkles":
				return new Unicorn("Unicorn");
			default:
				throw new Error(`Unknown ingredient: ${ingredientType}`);
		}
	}
}

class Dragon implements Creature {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	useAbility(): void {
		console.log(`${this.name} breathes fire`);
	}
}

class Phoenix implements Creature {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	useAbility(): void {
		console.log(`${this.name} uses reborn`);
	}
}

class Unicorn implements Creature {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	useAbility(): void {
		console.log(`${this.name} uses Dancing on rainbow`);
	}
}

const creature1 = new Dragon("grisu");
const creature2 = new Phoenix("birb");
const creature3 = new Unicorn("pony");

creature1.useAbility();
creature2.useAbility();
creature3.useAbility();

const circle1 = new SummoningCircle();

const creature4 = circle1.summon("fire");
const creature5 = circle1.summon("air");
const creature6 = circle1.summon("sparkles");

creature4.useAbility();
creature5.useAbility();
creature6.useAbility();

const creature7 = circle1.summon("earth");
creature7.useAbility();
