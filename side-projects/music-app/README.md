# Side Project: Music App

A basic music collection management app that allows users to search for albums, add them to their collection, and listen to previews. The app uses data from the [Deezer API](https://developer.deezer.com/api) to fetch album and song data.

## Basic Features

- **List of Albums:** A grid or list view fetching and displaying album covers, titles, and artist names from your data source.
- **List of Songs per Album:** A detailed view (or dropdown) showing the tracklist for a selected album, including song titles and durations.
- **Music Player and play button on each album / song:** A persistent UI component that controls playback. Clicking a "play" icon updates the global state to play the selected track.
- **Search Albums**: A search bar and results list to find albums by title or artist name.
- **Add Albums:** A mechanism to add albums to your collections from the search results list.
- **Delete Albums:** A simple mechanism to remove an album from your collection, ensuring your UI stays in sync with the database.

## Additional Features

- **Album Page:** A dedicated dynamic route providing a deep dive into an album, potentially including reviews, release dates, and related artists.
- **Create Playlists:** A feature allowing users to define custom collections with a unique name.
- **Add Songs to Playlists:** A selection tool (like a "+" button) to associate specific song IDs with a specific playlist ID.
- **Edit Playlists:** The ability to rename playlists or reorder the songs within them.
- **Delete Playlists:** A removal tool for unwanted collections.
- **Listen Together:** A real-time feature allowing multiple users to synchronize their playback state and listen to the same song simultaneously.

Feel free to add your own features to this app! We're excited to see what you come up with.

---

## Implementation Recommendations

You should start the project by rendering a list of albums from your data source. This can be the [albums.json](./albums.json) file in the assets folder or a database filled with this initial data.

For the playback of the music you need to fetch a fresh "preview" link from Deezer. You can use the following API endpoint:

```
https://api.deezer.com/track/${trackID}
```

The API returns a JSON object with the "preview" link. You can use this link to play the song in your app.

Depending on where you are in the course, you might want to focus on the following topics:

### TypeScript

- **Type Safety:** Define strict interfaces for `Album` and `Song` objects to avoid runtime errors during data fetching.
- **Frontend Only:** Use the albums data from the assets to create a static album list. Place it directly in the frontend typescript as an array.
- **Audio Element:** Utilize HTML `audio` element to control playback.
- **Deezer API**: Utilize the [Deezer API](https://developer.deezer.com/api) to fetch album and song data for the search results.

### Backend Basics / Template Engines

- **Server-Side Rendering:** Use `Express` with `Nunjucks` to render your album list directly on the server. Create fragments and macros for album cards and song lists.
- **Data Persistence:** Set up a `SQLite` database to store your album data.
- **REST API:** Create a REST API in express to handle album and song data.
- **Structure:** Follow the `MVC (Model-View-Controller)` pattern to keep your route logic separate from your data handling.
- **Frontend TS Code:** Use typescript with nodemon and tsx to watch and compile your frontend code.

### OOP (Object-Oriented Programming)

- **Data Modeling:** Use `Classes` to represent your `MusicPlayer`, managing state like `volume` and `currentTrack` through methods.
- **Abstraction:** Create `Abstract Classes` or `Interfaces` for different types of "Media" (e.g., Album and Playlist) to practice inheritance.
- **Design Patterns:** Implement the **Singleton** pattern for your audio controller to ensure only one instance of the player exists.

### NestJS

- **Modular Architecture:** Organize your code into `AlbumsModule`, `PlaylistsModule`, and `AuthModule`.
- **ORM Integration:** Use `TypeORM` with `MySQL` to persist your data.
- **REST API:** Create a REST API using `NestJS` and `TypeORM` for handling album and playlist data.

### Next.js App Router

- **Hybrid Rendering:** Use `Server Components` for SEO-friendly album pages and `Client Components` for interactive elements like the music player.
- **Custom Player Component:** Create a custom Player component instead of the `audio` html element that can be used across different pages.
- **State Management:** Utilize `Zustand` or `use-context` to manage the "Now Playing" state across different pages.
- **Dynamic Routing:** Use file-based routing (e.g., `/album/[id]`) to generate pages for each album automatically.

### WebSockets

- **Real-time Sync:** Use `Socket.io` or native WebSockets to broadcast "Play/Pause" events to all users in a "Listen Together" room.
- **Event Handling:** Implement listeners that trigger UI updates immediately when another user changes the track.
