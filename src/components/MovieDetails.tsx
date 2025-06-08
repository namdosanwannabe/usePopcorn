import React, { useState, useRef, useEffect } from "react";
import type { WatchedMovie } from "../types/watchedMovie";
import type { MovieDetail } from "../interfaces/movie";

import { API_KEY } from "../../API_KEY";
import useKey from "../hooks/useKey";
import Loader from "./Loader";
import StarRating from "./StarRating";

type Props = {
    watched: WatchedMovie[];
    selectedId: string;
    onCloseMovie: () => void;
    onAddWatched: (value: WatchedMovie) => void;
};

const MovieDetails = ({
    watched,
    selectedId,
    onCloseMovie,
    onAddWatched,
}: Props) => {
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userRating, setUserRating] = useState<number>(0);

    const countRef = useRef(0);
    let count = 0;

    useEffect(() => {
        if (userRating) countRef.current++;
        if (userRating) count++;
    }, [userRating, count]);

    useKey("Escape", onCloseMovie);

    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true);

            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
            );
            const data = await res.json();
            setMovie(data);

            setIsLoading(false);
        }

        getMovieDetails();
    }, [selectedId]);

    useEffect(() => {
        if (!movie?.Title) return;
        document.title = `Movie | ${movie.Title}`;
        return () => {
            document.title = "usePopcorn";
        };
    }, [movie?.Title]);

    if (isLoading) return <Loader />;
    if (!movie) return <div>Movie not found.</div>;

    const {
        Title,
        Year,
        Poster,
        Runtime,
        imdbRating,
        Plot,
        Released,
        Actors,
        Director,
        Genre,
    } = movie!;

    const isWatched = watched.map((watch) => watch.imdbID).includes(selectedId);

    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

    function handleAdd() {
        const newWatchedMovie: WatchedMovie = {
            imdbID: selectedId,
            title: Title,
            year: Year,
            poster: Poster,
            imdbRating: Number(imdbRating),
            runtime: Number(Runtime.split(" ")[0]),
            userRating,
            countRatingDecisions: countRef.current,
            count,
        };

        onAddWatched(newWatchedMovie);
    }

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={Poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>{Title}</h2>
                            <p>
                                {Released} &bull; {Runtime}
                            </p>
                            <p>{Genre}</p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />

                                    {userRating > 0 && (
                                        <button
                                            type="button"
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You rated this movie {watchedUserRating}{" "}
                                    <span>⭐</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{Plot}</em>
                        </p>
                        <p>Starring {Actors}</p>
                        <p>Directed by {Director}</p>
                    </section>
                </>
            )}
        </div>
    );
};

export default MovieDetails;
