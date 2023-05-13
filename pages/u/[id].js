import ApiService from '../../src/api';
import App from '../../src/components/layouts/App';
import { UserProfile } from '../../src/components/UserProfile/UserProfile';

function UserPage({ user }) {
  return (
    <App>
      <UserProfile user={user} />
    </App>
  );
}

export default UserPage;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  // TODO - should mock ApiService on SSR more generally
  const api = new ApiService({
    getIdToken: () => '',
  });
  const user = await api.getUser(Array.isArray(id) ? id[0] : id);

  return {
    props: {
      user,
    },
  };
};
