import to from 'await-to-js';
import { delay } from '@/utils/common';
import { RequestError } from './errors';

export { RequestError } from './errors';

export interface RetryParams {
  errorRetryCount: number
  _retryCount?: number
  onBeforeRetry?: (error: any) => Promise<any>
  errorRetryInterval?: number
}

export const retry = ({errorRetryCount, errorRetryInterval = 1000, _retryCount = 0, onBeforeRetry = async () => {}}: RetryParams) => async (promise: () => Promise<any>): Promise<any> => {
  const [err, res] = await to(promise());

  if (err) {
    if (_retryCount < errorRetryCount) {

      const [retryError] = await to(onBeforeRetry(err));

      if (retryError) {
        throw retryError;
      }

      await delay(errorRetryInterval);

      return retry({ errorRetryCount, _retryCount: _retryCount + 1, onBeforeRetry })(promise);
    }

    throw err;
  }

  return res;
}

const request = (token?: string) => async (url: string, options: RequestInit = {}): Promise<any> => {
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
    const error = new RequestError(info.message || 'An error occurred', res.status, info);
    throw error;
  }

  const result = await res.json();

  return result;
};

export default request;