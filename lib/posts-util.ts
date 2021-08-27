import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { IPost } from '../types/interfaces';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostData = (fileName: string): IPost => {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/.md$/, '');

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
  const postFiles = fs.readdirSync(postsDirectory);

  const allPosts = postFiles.map((file) => getPostData(file));

  return allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
};

export const getFeaturedPosts = (): IPost[] => {
  const allPosts = getAllPosts();

  return allPosts.filter((post) => post.isFeatured);
};
