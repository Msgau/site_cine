import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [responseData, setResponseData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [requestUrl, setRequestUrl] = useState(null);
  const [movieId, setMovieId] = useState(null);

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
