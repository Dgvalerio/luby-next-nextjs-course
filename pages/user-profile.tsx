import { GetServerSideProps, NextPage } from 'next';

interface UserProfilePageProps {
  username: string;
}

const UserProfilePage: NextPage<UserProfilePageProps> = ({ username }) => (
  <h1>{username}</h1>
);

export const getServerSideProps: GetServerSideProps<UserProfilePageProps> =
  async () => ({
    props: {
      username: 'Max',
    },
  });

export default UserProfilePage;
