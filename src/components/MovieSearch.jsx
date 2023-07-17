import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    setResponseData,
    setImageUrl,
    setTotalPages,
    setRequestUrl,
    setMovieId,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const apiKey = '3d5c29e0c046f6e5a8ccfd97fd8abd28';
    const requestUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&include_adult=false&page=1`;

    axios
      .get(requestUrl)
      .then((response) => {
        const totalPages = response.data.total_pages;
        const title = response.data.results.map((movie) => movie.title);
        const imageUrl = response.data.results.map(
          (movie) => movie.poster_path
        );
        const movieId = response.data.results.map((movie) => movie.id);

        setResponseData(title);
        setImageUrl(imageUrl);
        setRequestUrl(requestUrl);
        setTotalPages(totalPages);
        setMovieId(movieId); // Stockage de l'ID du film dans le contexte
        navigate(`/searchresults/1`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
      <form onSubmit={handleSearch}>
        <input
          type="text"
          aria-label="Rechercher un film"
          placeholder={`${searchTerm ? searchTerm : 'rechercher un film'}`}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">GO</button>
      </form>
  );
};

export default MovieSearch;
