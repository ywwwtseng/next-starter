import request from '@/utils/request';
import mem from 'mem';

export class AuthService {
  static signIn(): Promise<APIResponse> {
    return request()('/api/signin', { method: 'POST', body: JSON.stringify({ access_token: '1234566hh' }) });
  }

  static logout(): Promise<APIResponse> {
    return request()('/api/logout', { method: 'POST' });
  }

  static refreshToken(): Promise<APIResponse> {
    return request()('/api/token', { method: 'POST', body: JSON.stringify({ grant_type: 'refresh_token' }) });
  }

  static memoizedRefreshToken = mem(AuthService.refreshToken, { maxAge: 10_000 });
}
