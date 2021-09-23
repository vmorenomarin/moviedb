import axios from "axios";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";

export const Movie = () => {
  const history = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const search = async () => {
      try {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?apikey=bd920ef5&i=${id}`
        );
        setMovie(data);
      } catch (error) {
          console.log("Error en search", error.message)
      }
    };
    search();
  }, [id]);

  const goBack = () => {
    if (history.length <= 2) {
      history.push("/");
    } else {
      history.goBack();
    }
  };

  return (
    <div id="card-movie" className="card mt-4 p-3">
      <div className="row">
        <div className="col-md-4">
          {movie.Poster === "N/A" ? (
            <img src="/img/movie.png" alt="img" className="card-img-top" />
          ) : (
            <img src={movie.Poster} alt="img" className="card-img-top" />
          )}
        </div>
        <div className="col-md-8">
          <h4 className="card-title">
            {movie.Title} (<strong>{movie.Year}</strong>)
          </h4>
          <p className="carda-text">{movie.Plot}</p>
          <h5 className="card-text">
            <span className="badge bg-primary">Rating: {movie.imdbRating}</span>
          </h5>
        </div>
        <div className="text-end">
          <buttopn className="btn btn-primary btn-lg" onClick={() => goBack()}>
            Go Back
          </buttopn>
        </div>
      </div>
    </div>
  );
};
