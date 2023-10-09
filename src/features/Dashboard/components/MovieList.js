import React from "react";
import { ShowMovies } from "./ShowMovies";

function MovieList({ items, title, isTopRated }) {
    return (
        <div className="movies-container">
            <h2 className="genereh2">{title}</h2>
            <ShowMovies items={items} isTopRated={isTopRated} />
        </div>
    );
}

export default MovieList;