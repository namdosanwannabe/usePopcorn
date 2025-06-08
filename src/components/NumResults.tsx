import type { Movie } from "../interfaces/movie";

type Props = {
    movies: Movie[];
};

const NumResults = ({ movies }: Props) => {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
};

export default NumResults;
