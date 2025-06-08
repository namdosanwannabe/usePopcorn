import React, { useRef } from "react";
import useKey from "../hooks/useKey";

type Props = {
    query: string;
    setQuery: (value: string) => void;
};

const Search: React.FC<Props> = ({ query, setQuery }) => {
    const inputEl = useRef<HTMLInputElement>(null);

    useKey("Enter", () => {
        if (document.activeElement === inputEl.current) return;
        if (inputEl.current) inputEl.current.focus();
        setQuery("");
    });

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    );
};

export default Search;
