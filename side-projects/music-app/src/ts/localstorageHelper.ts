export function getIds(storageKey: string): number[] {
	const storedIds = localStorage.getItem(storageKey);
	return storedIds ? JSON.parse(storedIds) : [];
}

export function saveIds(ids: number[], storageKey: string): void {
	localStorage.setItem(storageKey, JSON.stringify(ids));
}

export function addId(id: number, storageKey: string): void {
	const ids = getIds(storageKey);

	if (!ids.includes(id)) {
		ids.push(id);
		saveIds(ids, storageKey);
	}
}

export function removeId(id: number, storageKey: string): void {
	const ids = getIds(storageKey).filter((existingId) => existingId !== id);
	saveIds(ids, storageKey);
}
