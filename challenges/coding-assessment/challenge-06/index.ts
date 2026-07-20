/*

live cell:
dies if < 2 live neighb
dies if > 3 live neighb
lives if 2-3 live neighb

dead cell:
lives if 3 live neighb


neighbours are:

-51		-50		-49

-1		CELL	+1

+49		+50		+51


*/

const dolphin = [
	267, 268, 269, 270, 271, 272, 273, 313, 314, 315, 324, 325, 326, 327, 360, 361,
	363, 376, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 409, 410,
	411, 431, 441, 442, 458, 481, 493, 494, 507, 544, 545, 566, 584, 590, 591, 606,
	607, 616, 617, 635, 639, 655, 656, 666, 686, 703, 712, 737, 738, 752, 760, 789,
	802, 804, 805, 806, 807, 838, 839, 852, 869, 874, 890, 903, 904, 905, 906, 907,
	908, 909, 910, 911, 931, 940, 961, 962, 963, 964, 974, 975, 990, 1015, 1016,
	1017, 1018, 1019, 1020, 1025, 1065, 1070, 1071, 1076, 1090, 1091, 1115, 1120,
	1121, 1122, 1126, 1129, 1140, 1141, 1166, 1170, 1172, 1173, 1177, 1178, 1191,
	1216, 1217, 1220, 1221, 1223, 1224, 1225, 1228, 1229, 1231, 1241, 1268, 1269,
	1271, 1276, 1277, 1278, 1279, 1280, 1282, 1291, 1319, 1320, 1321, 1322, 1330,
	1331, 1333, 1341, 1382, 1391, 1432, 1433, 1441, 1483, 1485, 1534, 1540, 1584,
	1590, 1635, 1640, 1685, 1689, 1690, 1735, 1739, 1785, 1788, 1789, 1833, 1834,
	1835, 1838, 1881, 1889, 1929, 1934, 1936, 1940, 1978, 1991, 1992, 2027, 2041,
	2042, 2043, 2076, 2078, 2079, 2080, 2081, 2082, 2084, 2092, 2093, 2126, 2127,
	2128, 2132, 2133, 2134, 2135, 2136, 2137, 2144, 2188, 2189, 2190, 2193, 2194,
	2240, 2241, 2242, 2244, 2273, 2274, 2275, 2276, 2277, 2278, 2279, 2280, 2281,
	2282, 2283, 2284, 2285, 2286, 2287, 2288, 2289, 2290, 2291, 2292, 2293, 2294,
];

const rows: number = 50;
const columns: number = 50;

const generateRandomCells: boolean = false;
const cellsAliveInitialPositions = new Set<number>();

if (generateRandomCells) {
	let cellsAliveInitially: number = Math.floor(Math.random() * (rows * columns));
	//cellsAliveInitially = 1000;
	while (cellsAliveInitialPositions.size < cellsAliveInitially) {
		cellsAliveInitialPositions.add(Math.floor(Math.random() * (rows * columns)));
	}
} else {
	// use dolphin
	dolphin.forEach((cellAlive) => cellsAliveInitialPositions.add(cellAlive));
}

function neighbourCheck(
	cellsAliveNextGenerationPositions: Set<number>,
	isAlive: boolean,
	cellPosition: number,
): number {
	let neighboursAlive: number = 0;
	// left
	if (
		cellsAliveNextGenerationPositions.has(cellPosition - 1) &&
		cellPosition % columns !== 0
	) {
		neighboursAlive++;
	}
	// right
	if (
		cellsAliveNextGenerationPositions.has(cellPosition + 1) &&
		(cellPosition + 1) % columns !== 0
	) {
		neighboursAlive++;
	}
	// top
	if (cellsAliveNextGenerationPositions.has(cellPosition - columns)) {
		neighboursAlive++;
	}
	// bottom
	if (cellsAliveNextGenerationPositions.has(cellPosition + columns)) {
		neighboursAlive++;
	}
	// top-left
	if (
		cellsAliveNextGenerationPositions.has(cellPosition - columns - 1) &&
		cellPosition % columns !== 0
	) {
		neighboursAlive++;
	}
	// top-right
	if (
		cellsAliveNextGenerationPositions.has(cellPosition - columns + 1) &&
		(cellPosition + 1) % columns !== 0
	) {
		neighboursAlive++;
	}
	// bottom-left
	if (
		cellsAliveNextGenerationPositions.has(cellPosition + columns - 1) &&
		cellPosition % columns !== 0
	) {
		neighboursAlive++;
	}
	// bottom-right
	if (
		cellsAliveNextGenerationPositions.has(cellPosition + columns + 1) &&
		(cellPosition + 1) % columns !== 0
	) {
		neighboursAlive++;
	}

	return neighboursAlive;
}

function gameOfLife(
	generation: number = 0,
	cellsAlivePositions: Set<number>,
): void {
	const alive = "🟢";
	const dead = "🔴";

	const cellsAliveNextGenerationPositions = cellsAlivePositions;
	let generationChanged: boolean = false;

	let cellCounter: number = 0;
	for (let row = 0; row < rows; row++) {
		let cellsInARow = "";

		for (let column = 0; column < columns; column++) {
			let isAlive: boolean = cellsAlivePositions.has(cellCounter);
			let neighboursAlive: number = neighbourCheck(
				cellsAliveNextGenerationPositions,
				isAlive,
				cellCounter,
			);

			if (isAlive) {
				if (neighboursAlive < 2 || neighboursAlive > 3) {
					// under-/overpopulation
					cellsAliveNextGenerationPositions.delete(cellCounter);
					generationChanged = true;
				}
				// survival, nothing happens
			} else {
				if (neighboursAlive === 3) {
					// reproduction
					cellsAliveNextGenerationPositions.add(cellCounter);
					generationChanged = true;
				}
			}

			cellsInARow += isAlive ? alive : dead;
			cellCounter++;
		}

		console.log(cellsInARow);
	}
	console.log(" ");

	if (generationChanged) {
		const timer = generation > 0 ? 100 : 500;
		setTimeout(() => {
			generation++;
			gameOfLife(generation, cellsAliveNextGenerationPositions);
		}, timer);
	} else {
		console.log("Game of Live is over");
	}
}

gameOfLife(0, cellsAliveInitialPositions);
