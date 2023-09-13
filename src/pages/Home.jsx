import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../components/Header";
import "../styles/home.css";
import Menu from "../components/menu";
import NewsFeed from "../components/NewsFeed";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="home">
        <Menu />
        <NewsFeed />
        <TrendingMovies />
      </div>
    </div>
  );
}

function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  
  const handleMovieClick = (movieId) => {
    navigate(`/site_cine/movie/${movieId}`);
  };

  useEffect(() => {
    const apiKey = "3d5c29e0c046f6e5a8ccfd97fd8abd28";
    const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=fr-FR`;

    axios
      .get(url)
      .then((response) => {
        const movieResults = response.data.results;
        setMovies(movieResults);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="trending">
      <h2>Tendances</h2>
      <div className="trendingList">
      {movies.map(movie => (
        <Link key={movie.id} to={`/site_cine/movie/${movie.id}`} className='trendMovie' onClick={() => handleMovieClick(movie.id)}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            title={movie.title}
          />
          <h3 title={movie.title}>{movie.title}</h3>
        </Link>
      ))}
      </div>
    </div>
  );
}

