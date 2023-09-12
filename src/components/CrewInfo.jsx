import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/crewInfo.css";

const CrewInfo = ({ id, apiKey, job, title }) => {
  const [crewInfo, setCrewInfo] = useState([]);

  useEffect(() => {
    const crewUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;

    axios
      .get(crewUrl)
      .then((response) => {
        const crew = response.data.crew;
        const filteredCrew = crew.filter((member) => member.job === job);
        if (filteredCrew.length > 0) {
          setCrewInfo(filteredCrew);
        } else {
          setCrewInfo([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, apiKey, job]);

  return (
    <div className="infoContainer">
      <h3>{title}</h3>
      <ul>
        {crewInfo.length > 0 ? (
          crewInfo.map((crewMember, index) => (
            <li 
            key={index}
            >
              <Link to={`/person/${crewMember.id}`}>{crewMember.name}</Link>
              {index < crewInfo.length - 1 ? "," : ""}
            </li>
          ))
        ) : (
          <li
          style={{ fontWeight: 400 }}
          >Inconnu</li>
        )}
      </ul>
    </div>
  );
};

export default CrewInfo;
