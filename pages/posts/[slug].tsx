import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostFiles } from '../../lib/posts-util';
import { IPost } from '../../types/interfaces';

interface PostDetailPageProps {
  post: IPost;
}

const PostDetailPage: NextPage<PostDetailPageProps> = ({ post }) => (
  <PostContent post={post} />
);

export const getStaticProps: GetStaticProps<PostDetailPageProps> = ({
  params: { slug },
}) => {
  const featuredPosts = getPostData(`${slug}`);

  return {
    props: {
      post: featuredPosts,
    },
    revalidate: 600,
  };
};
export const getStaticPaths: GetStaticPaths = () => {
  const postFileNames = getPostFiles();

  const slugs = postFileNames.map((fileName) => fileName.replace(/.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default PostDetailPage;
