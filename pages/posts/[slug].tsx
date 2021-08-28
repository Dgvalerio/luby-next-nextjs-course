import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostFiles } from '../../lib/posts-util';
import { IPost } from '../../types/interfaces';

interface PostDetailPageProps {
  post: IPost;
}

const PostDetailPage: NextPage<PostDetailPageProps> = ({ post }) => (
  <>
    <Head>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
    </Head>
    <PostContent post={post} />
  </>
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
