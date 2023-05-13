import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth0 } from '@auth0/auth0-react';

export const ActionsHandler = ({ children }) => {
  const auth = useAuth0();
  const router = useRouter();
  const { query } = router;
  const redirectTo = query.redirectTo || '';

  useEffect(() => {
    const redirectedFrom = query.from;
    if (redirectedFrom) {
      auth.login(redirectedFrom);
    }
  }, [query]);

  if (redirectTo) {
    router.push(redirectTo);
    return <p>Redirecting to {redirectTo}</p>;
  }

  return <>{children}</>;
};
