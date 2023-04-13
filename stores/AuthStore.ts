'use client';

import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';
import { AuthService } from '@/services/AuthService';
import request, { RequestError } from '@/utils/request';
import { delay } from '@/utils/common';

export interface IAuthStoreState {
  token: string | undefined;
}

export interface IAuthStore extends IAuthStoreState {
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export class AuthStore implements IAuthStore {
  token: string | undefined;

  constructor(initialState: IAuthStoreState) {
    makeAutoObservable(this);

    this.token = typeof window === 'undefined' ? initialState.token : Cookies.get('token');
  }

  setToken(token: string | undefined) {
    this.token = token;
  }

  async signIn() {
    try {
      const res: APIResponse = await AuthService.signIn();

      if (res.result === 'ok') {
        this.setToken(res.data.access_token);
      }

    } catch (error) {
      throw error;
    }
  }

  async refreshToken() {
    try {
      const res: APIResponse = await AuthService.memoizedRefreshToken();

      if (res.result === 'ok') {
        this.setToken(res.data.access_token);
      }

    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const res: APIResponse = await AuthService.logout();

      if (res.result === 'ok') {
        this.setToken(undefined);
      }

    } catch (error) {
      throw error;
    }
  }

  request = async (url: string, options: RequestInit = {}, retryCount: number = 0): Promise<APIResponse> => {
    const isExpiredAccessToken = false;
    try {
      if (isExpiredAccessToken) {
        await this.refreshToken();
      }

      const res: APIResponse = await request(this.token)(url, options);
      return res;
    } catch (unKnownError) {
      const error = unKnownError as RequestError;

      if (retryCount < 3) {
        if (error?.status === 401) {
          await this.refreshToken();
        } else {
          await delay(2000);
        }

        return await this.request(url, options, retryCount + 1);
      } 

      throw error;
    }


  }
}

