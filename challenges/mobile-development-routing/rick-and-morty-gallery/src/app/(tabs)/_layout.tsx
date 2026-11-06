import { Tabs } from "expo-router";
import { House, Images, Settings } from "lucide-react-native";

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
					headerShown: false,
					tabBarIcon: ({ color, size }) => <Images color={color} size={size} />,
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
