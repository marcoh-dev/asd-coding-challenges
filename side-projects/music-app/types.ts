import albumData from "./assets/albums.json";
const albums = albumData as IAlbum[];

interface ISong {
	id: number;
	title: string;
	link: string;
	duration: number;
}

interface IArtist {
	id: number;
	name: string;
	picture: string;
}

export interface IAlbum {
	id: number;
	title: string;
	link: string;
	cover: string;
	cover_big: string;
	artist: IArtist;
	tracks: ISong[];
}

function getAlbumTrack(track: ISong): HTMLElement {
	const minutes = Math.floor(track.duration / 60);
	const remainingSeconds = track.duration % 60;

	const durationFormatted = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;

	const albumTrack = document.createElement("li");
	albumTrack.textContent = `${track.title} (${durationFormatted})`;

	return albumTrack;
}

export function getAlbumCard(album: IAlbum): HTMLElement {
	const albumElement = document.createElement("article");
	const albumCover = document.createElement("img");
	albumCover.alt = `Cover of the album ${album.title}`;
	albumCover.src = album.cover;

	const albumHeader = document.createElement("header");

	const albumHeadline = document.createElement("h3");
	albumHeadline.textContent = album.title;

	const albumLink = document.createElement("a");
	albumLink.href = `./album.html?album-id=${album.id}`;

	const albumArtist = document.createElement("p");
	albumArtist.textContent = album.artist ? `Artist: ${album.artist.name}` : ``;

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
