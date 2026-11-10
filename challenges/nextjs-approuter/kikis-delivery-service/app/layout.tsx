import type { Metadata } from "next";
import Link from "next/link";
import { Cherry_Bomb_One } from "next/font/google";

const cherryBombOne = Cherry_Bomb_One({
	variable: "--font-cherry-bomb-one",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "Kiki’s Delivery Service",
	description: "Fast, reliable deliveries across the city.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={cherryBombOne.variable}>
			<head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
				/>
			</head>
			<body>
				<header>
					<h1 style={{ fontFamily: "var(--font-cherry-bomb-one)" }}>
						<Link href="/">Kiki’s Delivery Service</Link>
					</h1>
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}
