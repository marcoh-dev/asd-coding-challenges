interface Watchable {
	readonly id: number;
	title: string;
	year: number;
}

interface Film extends Watchable {
	watched: boolean;
	rating?: 1 | 2 | 3 | 4 | 5;
}

export interface Playlist {
	name: string;
	films: Film[];
}

export function formatFilm(film: Film): string {
	return `${film.title} (${film.year})${film.watched ? ` rating: ${film.rating}/5` : ``}`;
}

export function getUnwatched(playlist: Playlist): Film[] {
	return playlist.films.filter((film) => !film.watched);
}
