interface IUserData {
	username: string;
	status: string;
	lastActivity: number;
}

interface IOnlineData {
	online?: string[];
	offline?: string[];
	away?: string[];
}

const inputData: IUserData[] = [
	{
		username: "David",
		status: "online",
		lastActivity: 10,
	},
	{
		username: "Lucy",
		status: "offline",
		lastActivity: 22,
	},
	{
		username: "Bob",
		status: "online",
		lastActivity: 104,
	},
];

const outputData = {
	online: ["David"],
	offline: ["Lucy"],
	away: ["Bob"],
};

function whoIsOnline(userData: IUserData[]): IOnlineData {
	const outputObj: IOnlineData = {};

	userData.forEach((user) => {
		if (user.status === "offline") {
			if (!outputObj.offline) {
				outputObj.offline = [];
			}
			outputObj.offline.push(user.username);
		} else {
			if (user.lastActivity > 10) {
				if (!outputObj.away) {
					outputObj.away = [];
				}
				outputObj.away.push(user.username);
			} else {
				if (!outputObj.online) {
					outputObj.online = [];
				}
				outputObj.online.push(user.username);
			}
		}
	});

	return outputObj;
}

console.log(whoIsOnline(inputData));
