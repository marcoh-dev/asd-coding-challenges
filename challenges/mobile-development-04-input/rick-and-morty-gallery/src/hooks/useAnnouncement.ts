import { useEffect } from "react";
import { AccessibilityInfo } from "react-native";

export function useAnnouncement(message: string) {
	useEffect(() => {
		AccessibilityInfo.announceForAccessibility(message);
	}, [message]);
}
