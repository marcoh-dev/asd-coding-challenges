import { Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Snippets",
	description: "Collection snippets",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
			<head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
				/>
				<style>{`
					body {
						font-family: var(--font-inter);
					}

					h1, h2, h3, h4, h5, h6 {
						font-family: var(--font-inter);
					}

					pre,
					code {
						font-family: var(--font-jetbrains-mono);
					}
				`}</style>
			</head>
			<body>{children}</body>
		</html>
	);
}
