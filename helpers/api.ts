import {
  CommentGetResponse,
  CommentPostRequest,
  CommentPostResponse,
  NewsletterPostRequest,
  NewsletterPostResponse,
} from '../types/api';

export const routes = {
  api: {
    newsletter: (): string => `/api/newsletter`,
    comment: (eventId?: string): string =>
      eventId ? `/api/comments/${eventId}` : `/api/comments`,
  },
};

const init = (body) => ({
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  newsletter: {
    create: (body: NewsletterPostRequest): Promise<NewsletterPostResponse> =>
      fetch(routes.api.newsletter(), init(body)).then((response) =>
        response.ok
          ? response.json()
          : response.json().then(({ data }: NewsletterPostResponse) => {
              throw new Error(data.message || 'Something went wrong!');
            })
      ),
  },
  comment: {
    create: (
      body: CommentPostRequest,
      eventId?: string
    ): Promise<CommentPostResponse> =>
      fetch(routes.api.comment(eventId), init(body)).then((response) =>
        response.ok
          ? response.json()
          : response.json().then(({ data }: CommentPostResponse) => {
              throw new Error(data.message || 'Something went wrong!');
            })
      ),
    list: (eventId?: string): Promise<CommentGetResponse> =>
      fetch(routes.api.comment(eventId)).then((response) => response.json()),
  },
};

export default api;
