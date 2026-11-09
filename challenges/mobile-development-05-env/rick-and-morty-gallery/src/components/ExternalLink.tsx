import { Link } from "expo-router";
import { ExternalLink as ExternalLinkIcon } from "lucide-react-native";

import { useTheme } from "@/theme/ThemeProvider";

type Props = {
	href: `https://${string}`;
	children: string;
};

export default function ExternalLink({ href, children }: Props) {
	const { theme, styles } = useTheme();

	return (
		<Link href={href} style={styles.link} accessibilityHint="Opens in your browser">
			{children}
			{" "}
			<ExternalLinkIcon size={14} color={theme.primary} />
		</Link>
	);
}
