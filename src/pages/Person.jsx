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

  useEffect(() => {
    const apiKey = "3d5c29e0c046f6e5a8ccfd97fd8abd28";
    const personUrl = `https://api.themoviedb.org/3/person/${personID}?api_key=${apiKey}&language=fr-FR`;
    const combinedCreditsUrl = `https://api.themoviedb.org/3/person/${personID}/combined_credits?api_key=${apiKey}&language=fr-FR`;

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
      })
      .catch((error) => {
        console.error(error);
      });
  }, [personID]);

  if (!personDetails) {
    return <div>Loading...</div>;
  }

  const biography = personDetails.biography;
  const shouldShowMore = biography.length > 1000 && !showFullBiography;
  const truncatedBiography = shouldShowMore
    ? biography.slice(0, 1000) + "..."
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
            <h3>Biographie :</h3>
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
            <h3>Date de naissance : </h3>
            <p>{personDetails.birthday}</p>
          </div>
          <div className="job block">
            <h3>Métier :</h3>
            <p>{personDetails.known_for_department}</p>
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
