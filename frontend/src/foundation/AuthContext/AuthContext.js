//auth context
import React, {createContext, useState, useContext} from 'react';
import {useCookies} from 'react-cookie';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [cookies] = useCookies(['token']);
  const {token} = cookies;
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

  // TODO: check if token is valid in backend

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  return {isAuthenticated, setIsAuthenticated};
};
