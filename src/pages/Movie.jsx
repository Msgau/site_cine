import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles/Movie.css";
import PictureList from "../components/PictureList";
import CrewInfo from "../components/CrewInfo";

export default function Movie() {
  return (
    <div>
      <Header />
      <MovieDetails />
    </div>
  );
}

const MovieDetails = () => {
  const { id } = useParams();
  const apiKey = "3d5c29e0c046f6e5a8ccfd97fd8abd28";
  const [movieDetails, setMovieDetails] = useState(null);
  const [casting, setCasting] = useState([]);

  useEffect(() => {
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`;
    const castingUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;

    const fetchMovieDetails = axios.get(movieUrl);
    const fetchCasting = axios.get(castingUrl);

    Promise.all([fetchMovieDetails, fetchCasting])
      .then(([movieResponse, castingResponse]) => {
        setMovieDetails(movieResponse.data);
        const cast = castingResponse.data.cast.slice(0, 50);
        setCasting(cast);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  }

  const {
    title,
    overview,
    poster_path,
    release_date,
    vote_average,
    genres,
    runtime,
  } = movieDetails;

  return (
    <div className="container">
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="movie-poster"
        />
        <div className="movie-info">
          <h2 className="movie-title">{title}</h2>
          <CrewInfo
            id={id}
            apiKey={apiKey}
            job="Director"
            title="Réalisation : "
          />
          <CrewInfo
            id={id}
            apiKey={apiKey}
            job="Screenplay"
            title="Scénario : "
          />
          <p className="movie-date">
            Date de sortie : {formatDate(release_date)}
          </p>
          <p className="movie-rating">Note : {vote_average} / 10</p>
          <p className="movie-runtime">Durée : {runtime} minutes</p>
          <p className="movie-genres">
            Genres : {genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="movie-overview">{overview}</p>
        </div>
      </div>
      <PictureList
        objects={casting}
        componentTitle="Casting :"
        statut="person"
        imagePathKey="profile_path"
      />
      {/* <PictureList
        objects={projects}
        componentTitle="Projets de réalisation :"
        statut="movie"
        imagePathKey="poster_path"
      /> */}
    </div>
  );
};
