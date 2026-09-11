import type { Metadata } from "next";
import Link from "next/link";
import { Cherry_Bomb_One, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import ThemeChanger from "@/components/ThemeChanger";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
		<html
			lang="en"
			className={cn("font-sans", geist.variable, cherryBombOne.variable)}
			suppressHydrationWarning
		>
			<body>
				<ThemeProvider attribute="class">
					<header>
						<div className="flex justify-between">
							<h1 className="font-cherry-bomb text-3xl text-red-500">
								<Link href="/">Kiki’s Delivery Service</Link>
							</h1>
							<ThemeChanger />
						</div>
					</header>
					<main>{children}</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
