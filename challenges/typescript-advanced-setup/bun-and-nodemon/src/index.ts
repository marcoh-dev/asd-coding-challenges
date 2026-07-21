import { readFile } from "node:fs/promises";

const content = await readFile("./src/message.txt");
console.log(content.toString());
