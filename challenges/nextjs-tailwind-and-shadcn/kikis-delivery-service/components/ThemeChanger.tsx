"use client";

import { useTheme } from "next-themes";

export default function ThemeChanger() {
	const { theme, setTheme } = useTheme();

	return (
		<div>
			{theme === "dark" ? (
				<button onClick={() => setTheme("light")}>☀️</button>
			) : (
				<button onClick={() => setTheme("dark")}>🌒</button>
			)}
		</div>
	);
}
