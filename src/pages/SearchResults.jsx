import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "../styles/SearchResults.css";
import defaultImage from "../assets/image-non-disponible.png";
import Header from "../components/Header";
import axios from "axios";

const SearchResults = () => {
  const {
    responseData,
    setResponseData,
    imageUrl,
    setImageUrl,
    totalPages,
    setTotalPages,
    requestUrl,
    setRequestUrl,
    movieId,
    setMovieId,
    releaseDate,
    setReleaseDate,
  } = useContext(AppContext); // Accédez à responseData, imageUrl et totalPages via useContext
  const pageQueryParam = new URLSearchParams(requestUrl).get("page");
  const navigate = useNavigate();

  function formatDate(dateString) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  }

  const handleNextPage = () => {
    const nextPageQueryParam = parseInt(pageQueryParam) + 1;
    const updatedUrl = requestUrl.replace(
      `page=${pageQueryParam}`,
      `page=${nextPageQueryParam}`
    );

    // Effectuer la requête GET avec l'URL mise à jour ici
    axios
      .get(updatedUrl)
      .then((response) => {
        // Traitement des données de réponse ici
        const totalPages = response.data.total_pages;
        const title = response.data.results.map((movie) => movie.title);
        const imageUrl = response.data.results.map(
          (movie) => movie.poster_path
        );

        // Mettez à jour le contexte avec les nouvelles données et l'URL
        setResponseData(title); // Mise à jour de responseData via setResponseData
        setImageUrl(imageUrl);
        setRequestUrl(requestUrl);
        setTotalPages(totalPages);
        setRequestUrl(updatedUrl);
        navigate(`/site_cine/searchresults/${nextPageQueryParam}`);
      })
      .catch((error) => {
        // Gestion des erreurs ici
        console.error(error);
      });
  };

  const handlePreviousPage = () => {
    const previousPageQueryParam = parseInt(pageQueryParam) - 1;
    const updatedUrl = requestUrl.replace(
      `page=${pageQueryParam}`,
      `page=${previousPageQueryParam}`
    );
    // Effectuer la requête GET avec l'URL mise à jour ici
    axios
      .get(updatedUrl)
      .then((response) => {
        // Traitement des données de réponse ici
        const totalPages = response.data.total_pages;
        const title = response.data.results.map((movie) => movie.title);
        const imageUrl = response.data.results.map(
          (movie) => movie.poster_path
        );

        // Mettez à jour le contexte avec les nouvelles données et l'URL
        setResponseData(title); // Mise à jour de responseData via setResponseData
        setImageUrl(imageUrl);
        setRequestUrl(requestUrl);
        setTotalPages(totalPages);
        setRequestUrl(updatedUrl);
        navigate(`/site_cine/searchresults/${previousPageQueryParam}`);
      })
      .catch((error) => {
        // Gestion des erreurs ici
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="searchResults">
        {responseData && (
          <>
            {responseData.map((title, index) => (
              <div key={index} className="result">
                {imageUrl && imageUrl[index] ? (
                  <Link
                    to={`/site_cine/movie/${movieId[index]}`}
                    className="trendMovie"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${imageUrl[index]}`}
                      alt={`Poster for ${title}`}
                    />
                  </Link>
                ) : (
                  <Link
                    to={`/site_cine/movie/${movieId[index]}`}
                    className="trendMovie"
                  >
                    <img src={defaultImage} alt="Default Image" />
                  </Link>
                )}
                <div className="titleDate">
                  <Link
                    to={`/site_cine/movie/${movieId[index]}`}
                    className="trendMovie"
                  >
                    <h3 title={title}>{title}</h3>
                  </Link>
                  <h4>{formatDate(releaseDate[index])}</h4>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="pagesNavigate">
        {pageQueryParam > 1 && (
          <button className="previous" onClick={handlePreviousPage}>
            précédent
          </button>
        )}
        <div>
          Page {pageQueryParam}/{totalPages}
        </div>
        {pageQueryParam < totalPages && (
          <button className="next" onClick={handleNextPage}>
            suivant
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
