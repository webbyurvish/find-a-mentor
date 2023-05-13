import { useRouter } from 'next/router';

export const useRoutes = () => {
  const { asPath } = useRouter();
  const getUrlWithFilterParams = (url) => {
    const queryParamsOnly =
      /(.*)(?<query>\?.*)/.exec(asPath)?.groups.query ?? '';
    return url + queryParamsOnly;
  };

  return {
    root: {
      get: () => getUrlWithFilterParams('/'),
    },
    user: {
      get: (userOrUsreId) =>
        getUrlWithFilterParams(
          `/u/${
            typeof userOrUsreId === 'string' ? userOrUsreId : userOrUsreId._id
          }`
        ),
    },
    me: {
      get: () => '/me',
      requests: {
        get: () => '/me/requests',
      },
      admin: {
        get: () => '/me/admin',
      },
    },
  };
};
