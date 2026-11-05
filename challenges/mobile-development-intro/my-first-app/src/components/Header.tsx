import { Menu } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type Props = {
	title: string;
	onMenuPress: () => void;
	theme: any;
};

export default function Header({ title, onMenuPress, theme }: Props) {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				paddingVertical: 15,
			}}
		>
			<Text
				style={{
					fontSize: 22,
					fontWeight: "bold",
					color: theme.text,
				}}
			>
				{title}
			</Text>

			<Pressable onPress={onMenuPress}>
				<Menu size={26} color={theme.text} />
			</Pressable>
		</View>
	);
}
