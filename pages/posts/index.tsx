import { NextPage } from 'next';

import AllPosts from '../../components/posts/all-posts';
import { DUMMY_POSTS } from '../index';

const AllPostsPage: NextPage = () => <AllPosts posts={DUMMY_POSTS} />;

export default AllPostsPage;
