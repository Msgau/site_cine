import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/SearchResults.css';
import defaultImage from '../assets/image-non-disponible.png';

const SearchResults = () => {
  const { responseData, imageUrl, totalPages } = useContext(AppContext); // Accédez à responseData, imageUrl et totalPages via useContext

  return (
    <div>
      <div className="searchResults">
        {responseData && (
          <>
            {responseData.map((title, index) => (
              <div key={index} className="result">
                {imageUrl && imageUrl[index] ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${imageUrl[index]}`}
                    alt={`Poster for ${title}`}
                  />
                ) : (
                  <img src={defaultImage} alt="Default Image" />
                )}
                <h3 title={title}>{title}</h3>
              </div>
            ))}
          </>
        )}
      </div>
      <p>Page 1/{totalPages}</p>
    </div>
  );
};

export default SearchResults;
