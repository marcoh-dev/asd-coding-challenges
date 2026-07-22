export interface ISong {
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
