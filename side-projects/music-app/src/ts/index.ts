import type { IAlbum } from "./types";
import { getAlbumCard, fetchLocalAlbums } from "./functions";
import albumData from "../assets/albums.json";
import { getIds } from "./localstorageHelper";

const albums = albumData as IAlbum[];
const albumCards = document.getElementById("album-cards") as HTMLElement;

albums.forEach((album) => {
	albumCards.append(getAlbumCard(album));
});

const albumSearchForm = document.getElementById(
	"album-search",
) as HTMLFormElement;

albumSearchForm.addEventListener("submit", async (event: SubmitEvent) => {
	event.preventDefault();

	const data = Object.fromEntries(new FormData(albumSearchForm));
	const albumResults = fetchLocalAlbums(data.album_query as string);
	const albumResultCards = document.getElementById(
		"search-album-cards",
	) as HTMLElement;
	albumResultCards.innerHTML = ``;
	albumResults.forEach((album) => {
		albumResultCards.append(getAlbumCard(album));
	});
});

const myAlbumCards = document.getElementById("my-album-cards") as HTMLElement;

const myAlbumIds = getIds("albumIds");
albums
	.filter((album) => myAlbumIds.includes(album.id))
	.forEach((album) => {
		myAlbumCards.append(getAlbumCard(album, true));
	});
