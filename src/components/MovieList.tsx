import MovieComponent from "./Movie";
import type { Movie } from "../interfaces/movie";

type Props = {
    movies: Movie[];
    onSelectMovie: (id: string) => void;
};

const MovieList = ({ movies, onSelectMovie }: Props) => {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <MovieComponent
                    movie={movie}
                    key={movie.imdbID}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
};

export default MovieList;
