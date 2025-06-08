export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: "movie" | "series" | "episode";
    Poster: string;
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface MovieDetail extends Rating, Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: "movie" | "series" | "episode";
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: "True" | "False";
}
