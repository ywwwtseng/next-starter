import { cookies } from 'next/headers';
import request from '.';

export default (url: string, options: RequestInit = {}) => {
  const cookieStore = cookies();
  const token: string | undefined = cookieStore.get('token')?.value;
  return request(token)(url, options);
};
