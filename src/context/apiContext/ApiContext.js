import { createContext, useContext, FC, useMemo } from 'react';
import ApiService from '../../api';
import { useAuth0 } from '@auth0/auth0-react';

export const ApiContext = createContext(null);

export const ApiProvider = (props) => {
  const { children } = props;
  const auth = useAuth0();
  const api = useMemo(() => new ApiService(auth), [auth]);
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export function useApi() {
  const api = useContext(ApiContext);
  return api;
}
