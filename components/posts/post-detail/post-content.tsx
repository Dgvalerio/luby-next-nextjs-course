import { NextPage } from 'next';
import Image from 'next/image';

import ReactMarkdown from 'react-markdown';
import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { NormalComponents } from 'react-markdown/lib/complex-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { IPost } from '../../../types/interfaces';
import classes from './post-content.module.css';
import PostHeader from './post-header';

const PostContent: NextPage<{ post: IPost }> = ({
  post: { slug, image, title, content },
}) => {
  const imagePath = `/images/posts/${slug}/${image}`;

  const customRenderers: Partial<
    Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
  > = {
    // img({ src, alt }) {
    //   return (
    //     <Image
    //       src={`/images/posts/${slug}/${src}`}
    //       alt={alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    p({ node, children }) {
      if (
        node.children[0].type === 'element' &&
        node.children[0].tagName === 'img'
      ) {
        const {
          properties: { src, alt },
        } = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${slug}/${src}`}
              alt={`${alt}`}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{children}</p>;
    },
    code({ className, children }) {
      const language = className.split('-')[1];
      return (
        <SyntaxHighlighter style={theme} language={language}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader image={imagePath} title={title} />
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
