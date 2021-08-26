import {
  NewsletterPostRequest,
  NewsletterPostResponse,
} from '../pages/api/newsletter';

export const routes = {
  api: {
    newsletter: (): string => `/api/newsletter`,
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
};

export default api;
