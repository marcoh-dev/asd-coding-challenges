import { EllipsisVertical, type LucideIcon } from "lucide-react-native";
import { useRef, useState } from "react";
import {
	Modal,
	Pressable,
	type StyleProp,
	Text,
	View,
	type ViewInstance,
	type ViewStyle,
} from "react-native";

import { useTheme } from "@/theme/ThemeProvider";

const ITEM_HEIGHT = 48;
const MENU_PADDING = 8;
const SCREEN_MARGIN = 16;
const MENU_GAP = 4;

export type ActionMenuItem = {
	label: string;
	icon: LucideIcon;
	onPress: () => void;
	destructive?: boolean;
};

type Frame = {
	x: number;
	y: number;
	width: number;
	height: number;
};

type Props = {
	items: ActionMenuItem[];
	accessibilityLabel: string;
	buttonStyle: StyleProp<ViewStyle>;
	iconColor: string;
};

export default function ActionMenu({ items, accessibilityLabel, buttonStyle, iconColor }: Props) {
	const { theme, styles } = useTheme();
	const buttonRef = useRef<ViewInstance>(null);
	const overlayRef = useRef<ViewInstance>(null);
	const [anchor, setAnchor] = useState<Frame | null>(null);
	const [overlay, setOverlay] = useState<Frame | null>(null);

	function open() {
		buttonRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
			setAnchor({ x: pageX, y: pageY, width, height });
		});
	}

	function measureOverlay() {
		overlayRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
			setOverlay({ x: pageX, y: pageY, width, height });
		});
	}

	function close() {
		setAnchor(null);
		setOverlay(null);
	}

	function select(item: ActionMenuItem) {
		close();
		item.onPress();
	}

	function getMenuPosition(button: Frame, container: Frame): ViewStyle {
		const top = button.y - container.y;
		const bottom = top + button.height;
		const menuHeight = items.length * ITEM_HEIGHT + MENU_PADDING * 2;
		const opensUpward = bottom + MENU_GAP + menuHeight > container.height - SCREEN_MARGIN;

		return {
			right: Math.max(
				container.width - (button.x - container.x) - button.width,
				SCREEN_MARGIN,
			),
			...(opensUpward
				? { bottom: container.height - top + MENU_GAP }
				: { top: bottom + MENU_GAP }),
		};
	}

	return (
		<>
			<Pressable
				ref={buttonRef}
				style={({ pressed }) => [buttonStyle, pressed && styles.pressed]}
				onPress={open}
				accessibilityRole="button"
				accessibilityLabel={accessibilityLabel}
				accessibilityState={{ expanded: anchor !== null }}
			>
				<EllipsisVertical size={20} color={iconColor} />
			</Pressable>

			<Modal
				visible={anchor !== null}
				transparent
				animationType="none"
				statusBarTranslucent
				navigationBarTranslucent
				onRequestClose={close}
			>
				<View ref={overlayRef} style={styles.menuOverlay} onLayout={measureOverlay}>
					<Pressable
						style={styles.menuBackdrop}
						onPress={close}
						accessibilityRole="button"
						accessibilityLabel="Close menu"
					/>

					{anchor && overlay && (
						<View
							style={[styles.menu, getMenuPosition(anchor, overlay)]}
							accessibilityRole="menu"
						>
							{items.map((item) => {
								const color = item.destructive ? theme.statusDead : theme.text;

								return (
									<Pressable
										key={item.label}
										style={({ pressed }) => [
											styles.menuItem,
											pressed && styles.pressed,
										]}
										onPress={() => select(item)}
										accessibilityRole="menuitem"
									>
										<item.icon size={20} color={color} />
										<Text style={[styles.menuItemText, { color }]}>
											{item.label}
										</Text>
									</Pressable>
								);
							})}
						</View>
					)}
				</View>
			</Modal>
		</>
	);
}
