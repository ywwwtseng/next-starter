import request from '@/utils/request';
import mem from 'mem';
import { IClientStore } from '@/stores/ClientStore';
export class AuthService {
  client: IClientStore;
  memoizedRefreshToken: any;

  constructor(client: IClientStore) {
    this.client = client;
    this.memoizedRefreshToken = mem(this.refreshToken, { maxAge: 10_000 });
  }

  signIn = async (): Promise<void> => {
    try {
      const res = await request()('/api/signin', { method: 'POST', body: JSON.stringify({ access_token: '1234566hh' }) });
      this.client.setToken(res.data.access_token);
    } catch (error) {
      throw error;
    }
  }

  logout = async (): Promise<void> => {
    try {
      const res = await request()('/api/logout', { method: 'POST' });
      this.client.setToken(undefined);
    } catch (error) {
      throw error;
    }
  }

  refreshToken = async (): Promise<void> => {
    try {
      const res = await request()('/api/token', { method: 'POST', body: JSON.stringify({ grant_type: 'refresh_token' }) });
      this.client.setToken(res.data.access_token);
    } catch (error) {
      throw error;
    }
  }
}
