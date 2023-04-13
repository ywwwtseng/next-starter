import { RequestError } from './errors';

export { RequestError } from './errors';

const request = (token?: string) => async (url: string, options: RequestInit) => {
  const headers = new Headers();
  if (token && token !== 'undefined') headers.append('Authorization', `Bearer ${token}`);

  const res = await fetch(url, { 
    credentials: 'same-origin',
    cache: 'no-store',
    headers,
    ...options
  });

  if (!res.ok) {
    const info = await res.json();
    const error = new RequestError('An error occurred', res.status, info);
    throw error;
  }

  const result = await res.json();

  return result;
};

export default request;