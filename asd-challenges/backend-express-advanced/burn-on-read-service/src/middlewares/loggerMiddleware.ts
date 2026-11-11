import type { NextFunction, Request, Response } from "express";
import { access, constants, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "logs.txt");

async function addLogMessage(message: string): Promise<void> {
	await appendFile(LOG_FILE, message + "\n", { encoding: "utf-8" });
}

async function fileExists(filePath: string): Promise<boolean> {
	try {
		await access(filePath, constants.W_OK);
		return true;
	} catch {
		return false;
	}
}

async function ensureLogFile(filePath: string): Promise<void> {
	const exists = await fileExists(filePath);

	if (!exists) {
		await writeFile(filePath, "", { encoding: "utf-8" });
	}
}

export function logger(req: Request, res: Response, next: NextFunction) {
	res.on("finish", async () => {
		const logEntry = [
			new Date().toISOString(),
			req.method,
			req.ip,
			req.originalUrl,
			res.statusCode,
		].join(" ");

		await addLogMessage(logEntry);
	});

	next();
}

await ensureLogFile(LOG_FILE);
