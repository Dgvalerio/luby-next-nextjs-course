import {
  CommentGetResponse,
  CommentPostRequest,
  CommentPostResponse,
} from '../pages/api/comments/[eventId]';
import {
  NewsletterPostRequest,
  NewsletterPostResponse,
} from '../pages/api/newsletter';

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
        response.json()
      ),
  },
  comment: {
    create: (
      body: CommentPostRequest,
      eventId?: string
    ): Promise<CommentPostResponse> =>
      fetch(routes.api.comment(eventId), init(body)).then((response) =>
        response.json()
      ),
    list: (eventId?: string): Promise<CommentGetResponse> =>
      fetch(routes.api.comment(eventId)).then((response) => response.json()),
  },
};

export default api;
