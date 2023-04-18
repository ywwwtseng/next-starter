import request from '@/utils/request';
import mem from 'mem';

export class AuthService {
  memoizedRefreshToken: any;

  constructor() {
    this.memoizedRefreshToken = mem(this.refreshToken, { maxAge: 10_000 });
  }

  signIn(): Promise<APIResponse> {
    return request()('/api/signin', { method: 'POST', body: JSON.stringify({ access_token: '1234566hh' }) });
  }

  logout(): Promise<APIResponse> {
    return request()('/api/logout', { method: 'POST' });
  }

  refreshToken(): Promise<APIResponse> {
    return request()('/api/token', { method: 'POST', body: JSON.stringify({ grant_type: 'refresh_token' }) });
  }
}
