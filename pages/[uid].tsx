import { GetServerSideProps, NextPage } from 'next';

interface UserIdPageProps {
  id: string;
}

const UserIdPage: NextPage<UserIdPageProps> = ({ id }) => <h1>{id}</h1>;

export const getServerSideProps: GetServerSideProps<UserIdPageProps> = async ({
  params: { uid },
}) => ({
  props: {
    id: `userid-${uid}`,
  },
});

export default UserIdPage;
