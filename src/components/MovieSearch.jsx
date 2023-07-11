import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setResponseData, setImageUrl, setTotalPages } = useContext(AppContext); // Accédez à responseData via useContext
  const navigate = useNavigate(); // Initialisez useNavigate

  const handleSearch = (event) => {
    event.preventDefault();

    const apiKey = '3d5c29e0c046f6e5a8ccfd97fd8abd28';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&include_adult=false&page=1`;

    axios.get(url)
      .then(response => {
        // Traitement des données de réponse ici
        const totalPages = response.data.total_pages
        console.log(response.data);
        console.log(totalPages)
        const title = response.data.results.map(movie => movie.title);
        const imageUrl = response.data.results.map(movie => movie.poster_path);
        setResponseData(title); // Mise à jour de responseData via setResponseData
        setImageUrl(imageUrl);
        setTotalPages(totalPages);
        navigate('/searchresults');
      })
      .catch(error => {
        // Gestion des erreurs ici
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          aria-label="Rechercher un film"
          placeholder="Rechercher un film"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        <button type="submit">GO</button>
      </form>
    </div>
  );
};

export default MovieSearch;
