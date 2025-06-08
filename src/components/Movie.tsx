import type { Movie } from "../interfaces/movie";

type Props = {
    movie: Movie;
    onSelectMovie: (value: string) => void;
};

const MovieComponent = ({ movie, onSelectMovie }: Props) => {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
};

export default MovieComponent;
