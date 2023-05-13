import React, { FC, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '../apiContext/ApiContext';

const UserContext = React.createContext(undefined);

export const UserProvider = ({ children }) => {
  const [isLoading, setIsloading] = useState(true);
  const [currentUser, updateCurrentUser] = useState();
  const auth = useAuth0();
  const api = useApi();
  const isAuthenticated = auth.isAuthenticated;
  const isMentor = !!currentUser?.roles?.includes('Mentor');
  const isAdmin = !!currentUser?.roles?.includes('Admin');

  const logout = () => {
    auth.logout(api);
  };

  useEffect(() => {
    api.getCurrentUser().then((user) => {
      updateCurrentUser(user);
      setIsloading(false);
    });
  }, [api]);

  return (
    <UserContext.Provider
      value={{
        isAdmin,
        isMentor,
        isLoading,
        currentUser,
        isAuthenticated,
        logout,
        updateCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error(`"useUser" has to be called inside UserProvider`);
  }
  return userContext;
};

export default UserContext;
