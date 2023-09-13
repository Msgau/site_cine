import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles/person.css";
import PictureList from "../components/PictureList";

const Person = () => {
  const { personID } = useParams();
  const [personDetails, setpersonDetails] = useState(null);
  const [showFullBiography, setShowFullBiography] = useState(false);
  const [popularCredits, setPopularCredits] = useState([]);
  const [moviesDirected, setMoviesDirected] = useState([]);


  useEffect(() => {
    const apiKey = "3d5c29e0c046f6e5a8ccfd97fd8abd28";
    const personUrl = `https://api.themoviedb.org/3/person/${personID}?api_key=${apiKey}&language=fr-FR`;
    const combinedCreditsUrl = `https://api.themoviedb.org/3/person/${personID}/combined_credits?api_key=${apiKey}&language=fr-FR`;
    const creditsUrl = `https://api.themoviedb.org/3/person/${personID}/credits?api_key=${apiKey}&language=fr-FR`;
    
    // Requête pour obtenir les détails de la personne
    axios
      .get(personUrl)
      .then((response) => {
        setpersonDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Requête pour obtenir les crédits combinés (films, séries, etc.)
    axios
      .get(combinedCreditsUrl)
      .then((response) => {
        // Filtrer les crédits pour les films et les séries
        const movieCredits = response.data.cast.filter(
          (credit) => credit.media_type === "movie"
        );

        // Trier les crédits par popularité (par exemple, par vote_average décroissant)
        movieCredits.sort((a, b) => b.vote_average - a.vote_average);

        // Limiter le nombre de crédits affichés (par exemple, les 5 premiers)
        const topMovieCredits = movieCredits.slice(0, 8);

        setPopularCredits(topMovieCredits);

        // Filtrer les films réalisés par la personne
        const moviesDirected = movieCredits.filter(
          (credit) => credit.job === "Director"
        );
    
        // Afficher les titres des films réalisés dans la console
        console.log(movieCredits)
        console.log("Films réalisés par la personne :", moviesDirected.map((movie) => movie.title));
    
        // Mettre à jour l'état avec les films réalisés
        setMoviesDirected(moviesDirected);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [personID]);

  if (!personDetails) {
    return <div>Loading...</div>;
  }

  const biography = personDetails.biography;
  const shouldShowMore = biography.length > 800 && !showFullBiography;
  const truncatedBiography = shouldShowMore
    ? biography.slice(0, 800) + "..."
    : biography;

  return (
    <>
      <Header />
      <div className="personPage">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${personDetails.profile_path}`}
            alt={personDetails.name}
            className="PersonPortrait"
          />
        </div>
        <div className="personDetails">
          <h2>{personDetails.name}</h2>
          <div className="bio block">
            <h3><strong>Biographie :</strong></h3>
            <p>
              {truncatedBiography}{" "}
              {shouldShowMore && (
                <button onClick={() => setShowFullBiography(true)}>
                  Voir plus
                </button>
              )}
            </p>
          </div>
          <div className="birthdayDate block">
            <h3><strong>Date de naissance :</strong> {personDetails.birthday}</h3>
          </div>
          <div className="job block">
            <h3><strong>Métier :</strong> {personDetails.known_for_department}</h3>

          </div>
        </div>
      </div>
      <PictureList
        objects={popularCredits}
        componentTitle="Films populaires :"
        statut="movie"
        imagePathKey="poster_path"
      />
    </>
  );
};

export default Person;
