import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [responseData, setResponseData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  return (
    <AppContext.Provider value={{ responseData, setResponseData, imageUrl, setImageUrl, totalPages, setTotalPages }}>
      {children}
    </AppContext.Provider>
  );
};
