import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { parse } from "query-string";
import { Search } from "./Search";

export const Movies = () => {
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState([
    {
      Poster: "",
      Title: "",
      Type: "",
      Year: "",
      imdbID: "",
      ok: true,
    },
  ]);

  useEffect(() => {
    const { q = "" } = parse(location.search);
    if (q === "") {
      return setMovies([
        {
          Poster: "",
          Title: "",
          Type: "",
          Year: "",
          imdbID: "",
          ok: true,
        },
      ]);
    }
    getMovies(q);
  }, [location.search]);

  const getMovies = async (q) => {
    try {
      const { data } = await axios.get(
        `http://www.omdbapi.com/?apikey=bd920ef5&s=${q}`
      );
      setMovies(data.Search);
    } catch (error) {
      console.log("Error en getMovies", error.message)
    }

    // console.log(data.Search);
  };

  const search = (e) => {
    history.push("?q=" + e.target.value);
    getMovies(e.target.value);
  };
  return (
    <div>
      <Search search={search} />
      <section className="row">
        {typeof movies !== "undefined" &&
          movies[0].ok !== true &&
          movies.map((movie) => (
            <Link
              to={`/description/${movie.imdbID}`}
              className="col-md-4 my-3 text-decoration-none"
              key={movie.imdbID}
            >
              <div id="card-movies" className="card">
                <div className="card-header">
                  {movie.Poster === "N/A" ? (
                    <img
                      src="/img/movie.png"
                      alt="img"
                      className="card-img-top"
                    />
                  ) : (
                    <img
                      src={movie.Poster}
                      alt="img"
                      className="card-img-top"
                    />
                  )}
                </div>
                <div className="card-body">
                  <h4>{movie.Title}</h4>
                </div>
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
};
