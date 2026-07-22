import type { IAlbum, ISong, IAlbumSearchResult } from "./types";
import albumData from "../assets/albums.json";
import { addId, getIds, removeId } from "./localstorageHelper";
const albums = albumData as IAlbum[];

function getAlbumTrack(track: ISong): HTMLElement {
	const minutes = Math.floor(track.duration / 60);
	const remainingSeconds = track.duration % 60;

	const durationFormatted = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;

	const albumTrack = document.createElement("li");
	albumTrack.textContent = `${track.title} (${durationFormatted})`;

	return albumTrack;
}

export function getAlbumCard(
	album: IAlbum,
	isBookmarkedList: boolean = false,
): HTMLElement {
	const myAlbumIds = getIds("albumIds");

	const albumElement = document.createElement("article");
	const albumCover = document.createElement("img");
	albumCover.alt = `Cover of the album ${album.title}`;
	albumCover.src = album.cover;

	const albumHeader = document.createElement("header");

	const albumHeadline = document.createElement("h3");
	albumHeadline.textContent = album.title;

	const albumLink = document.createElement("a");
	albumLink.href = `/album?album-id=${album.id}`;

	const albumArtist = document.createElement("p");
	albumArtist.textContent = album.artist ? `Artist: ${album.artist.name}` : ``;

	const albumAddToBookmarks = document.createElement("button");

	if (isBookmarkedList) {
		albumAddToBookmarks.textContent = "-";
		albumAddToBookmarks.addEventListener("click", (event: MouseEvent) => {
			removeId(album.id, "albumIds");
			window.location.reload();
		});
	} else {
		albumAddToBookmarks.textContent = "+";
		albumAddToBookmarks.addEventListener("click", (event: MouseEvent) => {
			addId(album.id, "albumIds");
			window.location.reload();
		});
	}

	const albumTracksList = document.createElement("ul");

	const albumTracksToggle = document.createElement("button");
	albumTracksToggle.textContent = `Tracks`;
	albumTracksToggle.addEventListener("click", (event: MouseEvent) => {
		if (albumTracksList.childNodes.length) {
			albumTracksList.innerHTML = "";
		} else {
			album.tracks.forEach((track) => albumTracksList.append(getAlbumTrack(track)));
		}
	});

	albumLink.append(albumHeadline);
	albumHeader.append(albumLink);

	albumElement.append(albumHeader);
	albumElement.append(albumCover);

	if (isBookmarkedList || !myAlbumIds.includes(album.id)) {
		albumElement.append(albumAddToBookmarks);
	}

	albumElement.append(albumArtist);
	albumElement.append(albumTracksToggle);
	albumElement.append(albumTracksList);
	return albumElement;
}

export function getAlbum(albumId: number): IAlbum | undefined {
	return albums.find((album) => album.id === albumId);
}

export function getAlbumDetail(album: IAlbum): HTMLElement {
	const albumElement = document.createElement("article");
	const albumCover = document.createElement("img");
	albumCover.alt = `Cover of the album ${album.title}`;
	albumCover.src = album.cover_big;

	const albumHeader = document.createElement("header");

	const albumHeadline = document.createElement("h2");
	albumHeadline.textContent = album.title;

	const albumArtist = document.createElement("p");
	albumArtist.textContent = album.artist ? `Artist: ${album.artist.name}` : ``;

	albumHeader.append(albumHeadline);

	albumElement.append(albumHeader);
	albumElement.append(albumCover);
	albumElement.append(albumArtist);
	return albumElement;
}

// CORS error https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSMissingAllowOrigin
export async function fetchAlbums(term: string): Promise<IAlbum[]> {
	const response = await fetch(`https://api.deezer.com/search?q=album:"${term}"`);
	const data: IAlbumSearchResult = await response.json();
	console.log(data);
	return data.data as IAlbum[];
}

export function fetchLocalAlbums(term: string): IAlbum[] {
	return albums.filter((album) => album.title.toLowerCase().includes(term));
}
