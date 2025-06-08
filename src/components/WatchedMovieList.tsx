import type { WatchedMovie } from "../types/watchedMovie";
import WatchedMovieComponent from "./WatchedMovie";

type Props = {
    watched: WatchedMovie[];
    onDeleteWatched: (value: string) => void;
};

const WatchedMovieList = ({ watched, onDeleteWatched }: Props) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovieComponent
                    key={movie.imdbID}
                    movie={movie}
                    onDeleteWatched={onDeleteWatched}
                />
            ))}
        </ul>
    );
};

export default WatchedMovieList;
