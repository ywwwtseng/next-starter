import { 
  AuthService,
  UserService
} from '@/services';
import request, { RequestError } from '@/utils/request';
import { makeAutoObservable } from 'mobx';
import { delay } from '@/utils/common';

export interface IClientStoreState {
  token: string | undefined;
}


export interface IClientStore extends IClientStoreState {
  authService: AuthService;
  userService: UserService;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  request: (url: string, options?: RequestInit, retryCount?: number) => Promise<any>;
  getState: () => IClientStoreState;
  
}

export class ClientStore implements IClientStore {
  token: string | undefined;
  authService: AuthService;
  userService: UserService;

  constructor(initialState: IClientStoreState) {
    makeAutoObservable(this);

    this.token = initialState.token || undefined;
    this.authService = new AuthService();
    this.userService = new UserService(this);
  }

  getState = (): IClientStoreState => {
    return { token: this.token }
  }

  setToken = (token: string | undefined) => {
    this.token = token;
  }

  signIn = async () => {
    try {
      const res: APIResponse = await this.authService.signIn();

      if (res.result === 'ok') {
        this.setToken(res.data.access_token);
      }

    } catch (error) {
      throw error;
    }
  }

  async refreshToken() {
    try {
      const res: APIResponse = await this.authService.memoizedRefreshToken();

      if (res.result === 'ok') {
        this.setToken(res.data.access_token);
      }

    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const res: APIResponse = await this.authService.logout();

      if (res.result === 'ok') {
        this.setToken(undefined);
      }

    } catch (error) {
      throw error;
    }
  }

  request = async (url: string, options: RequestInit = {}, retryCount: number = 0): Promise<any> => {
    const isExpiredAccessToken = false;
    try {
      if (isExpiredAccessToken) {
        await this.refreshToken();
      }

      const res: any = await request(this.token)(url, options);
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

