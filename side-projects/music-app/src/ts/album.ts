import { getAlbumDetail, getAlbum } from "./functions.ts";

const albumDetail = document.getElementById("album-detail") as HTMLElement;

const params: URLSearchParams = new URLSearchParams(window.location.search);
const albumId: number = Number(params.get("album-id"));

const currentAlbum = getAlbum(albumId);
if (currentAlbum) {
	albumDetail.append(getAlbumDetail(currentAlbum));
}
