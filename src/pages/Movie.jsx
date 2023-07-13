import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/Movie.css';

export default function Movie() {
    return(
        <div>
    <Header />
    <MovieDetails />
        </div>
    )
}

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const apiKey = '3d5c29e0c046f6e5a8ccfd97fd8abd28';
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`;

    axios
      .get(url)
      .then(response => {
        setMovieDetails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
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
          <p className="movie-date">Date de sortie : {release_date}</p>
          <p className="movie-rating">Note : {vote_average}</p>
          <p className="movie-runtime">Durée : {runtime} minutes</p>
          <p className="movie-genres">
            Genres : {genres.map(genre => genre.name).join(', ')}
          </p>
          <p className="movie-overview">{overview}</p>
        </div>
      </div>
    </div>
  );
};
