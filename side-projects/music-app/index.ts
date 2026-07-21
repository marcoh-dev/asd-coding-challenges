import type { IAlbum } from "./types.ts";
import { getAlbumCard } from "./types.ts";
import albumData from "./assets/albums.json";

const albums = albumData as IAlbum[];
const albumCards = document.getElementById("album-cards") as HTMLElement;

albums.forEach((album) => {
	albumCards.append(getAlbumCard(album));
});
