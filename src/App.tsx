import React, { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { WatchedMovie } from "./types/watchedMovie";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";

function App() {
    const [query, setQuery] = useState<string>("");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { movies, isLoading, error } = useMovies(query);

    const [watched, setWatched] = useLocalStorage([], "watched");

    function handleSelectMovie(id: string) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie: WatchedMovie) {
        setWatched((watched: WatchedMovie[]) => [...watched, movie]);
    }

    function handleDeleteWatched(selectedId: string) {
        setWatched((watched: WatchedMovie[]) =>
            watched.filter((movie) => movie.imdbID !== selectedId)
        );
    }

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>

            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            watched={watched}
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}

export default App;
