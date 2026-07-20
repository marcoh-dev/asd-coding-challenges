export function formatFilm(film) {
    return `${film.title} (${film.year})${film.watched ? ` rating: ${film.rating}/5` : ``}`;
}
export function getUnwatched(playlist) {
    return playlist.films.filter((film) => !film.watched);
}
//# sourceMappingURL=watchlist.js.map