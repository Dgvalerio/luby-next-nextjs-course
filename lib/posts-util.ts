import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { IPost } from '../types/interfaces';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostFiles = (): string[] => fs.readdirSync(postsDirectory);

export const getPostData = (postIdentifier: string): IPost => {
  const postSlug = postIdentifier.replace(/.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);

  return {
    slug: postSlug,
    title: data.title,
    image: data.image,
    date: data.date,
    excerpt: data.excerpt,
    isFeatured: data.isFeatured,
    content,
  };
};

export const getAllPosts = (): IPost[] => {
  const postFiles = getPostFiles();

  const allPosts = postFiles.map((file) => getPostData(file));

  return allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
};

export const getFeaturedPosts = (): IPost[] => {
  const allPosts = getAllPosts();

  return allPosts.filter((post) => post.isFeatured);
};
