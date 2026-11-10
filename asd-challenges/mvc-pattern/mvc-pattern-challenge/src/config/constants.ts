import path from "node:path";

export const PAGE_SIZE = 2;
export const port = Number(process.env.PORT) || 3000;

export const projectRoot = path.resolve(process.cwd());

export const publicDir = path.join(projectRoot, "public");
export const dataDir = path.join(projectRoot, "data");
export const viewsDir = path.join(projectRoot, "src", "views");
export const postsFilePath = path.join(dataDir, "posts.json");
