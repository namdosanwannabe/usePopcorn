import { useEffect, useState } from "react";
import type { Movie } from "../interfaces/movie";
import { API_KEY } from "../../API_KEY";

export function useMovies(query: string) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
                    { signal: controller.signal }
                );

                if (!res.ok)
                    throw new Error(
                        "Something went wrong with fetching movies"
                    );

                const data = await res.json();

                if (data.Response === "False")
                    throw new Error("Movie not found");

                setMovies(data.Search);
                setError("");
            } catch (e) {
                if (e instanceof Error && e.name !== "AbortError") {
                    console.log(e.message);
                    setError(e.message);
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();

        return () => {
            controller.abort();
        };
    }, [query]);

    return { movies, isLoading, error };
}
