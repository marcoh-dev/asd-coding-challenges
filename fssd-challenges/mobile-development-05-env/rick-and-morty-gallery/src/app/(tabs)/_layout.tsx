import { Tabs } from "expo-router";
import { House, Images, Settings } from "lucide-react-native";

import CreateCharacterButton from "@/components/CreateCharacterButton";

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="gallery"
				options={{
					title: "Gallery",
					tabBarIcon: ({ color, size }) => <Images color={color} size={size} />,
					headerRight: () => <CreateCharacterButton />,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
}
