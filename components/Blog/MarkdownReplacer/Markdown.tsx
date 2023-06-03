import { Image } from '@mantine/core';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Tweet } from 'react-twitter-widgets';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';

import useStyles from './style';

interface Props {
  text: string;
}

export function Markdown({ text }: Props) {
  const { classes } = useStyles();
  const imageRegex = /!\[(.*?)\]\((.*?)\)/gi;

  const markdownBody = useMemo(() => {
    const replacedBody = text.replace(imageRegex, (match, alt, url) => {
      if (url.match(/\.(png|jpe?g|gif|bmp|svg)$/i)) {
        return `<Image alt="${alt}" src="${url}" />`;
      } else {
        return match;
      }
    });

    return (
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[gfm]}
        components={{
          // Render the Image component for the "img" Markdown element
          img: ({ node }) => {
            const { src, alt }: any = node.properties;
            return (
              <div className={classes.image}>
                <Image src={src} alt={alt} sx={{ maxWidth: '500px' }} />
              </div>
            );
          },
          // Render the anchor element for the "a" Markdown element
          a: ({ href, children }: any) => {
            if (href.match(/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|svg)$/i)) {
              return (
                <div className={classes.image}>
                  <Image src={href} alt="Image" sx={{ maxWidth: '250px' }} />
                </div>
              );
            } else if (href.match(/^https:\/\/twitter\.com\/[^/]+\/status\/\d+$/)) {
              const tweetId = href.match(/\/status\/(\d+)$/)[1];
              return <Tweet tweetId={tweetId} options={{ width: 350 }} />;
            }
            return <a href={href}>{children}</a>;
          },
        }}
      >
        {replacedBody}
      </ReactMarkdown>
    );
  }, [text]);

  return <>{markdownBody}</>;
}