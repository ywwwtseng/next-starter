import { 
  AuthService,
  UserService,
  ProductService,
} from '@/services';
import request, { retry, RequestError } from '@/utils/request';
import { makeAutoObservable } from 'mobx';

export enum ClientService {
  AUTH,
  USER,
  PRODUCT,
}

// type ClientServiceStrings = keyof typeof ClientService;

export interface IClientStoreState {
  token: string | undefined
}


export interface IClientStore extends IClientStoreState {
  errorRetryCount: number
  authService: AuthService | null
  userService: UserService | null
  productService: ProductService | null
  request: (url: string, options?: RequestInit) => Promise<any>
  setToken: (token: string | undefined) => void
  getState: () => IClientStoreState
  
}

export class ClientStore implements IClientStore {
  token: string | undefined;
  authService: AuthService | null;
  userService: UserService | null;
  productService: ProductService | null;
  errorRetryCount: number = 0;

  constructor(
    initialState: IClientStoreState,
    services: ClientService[] =  [ClientService.AUTH, ClientService.USER, ClientService.PRODUCT]
  ) {

    makeAutoObservable(this);

    this.token = initialState.token || undefined;
    this.authService = services.includes(ClientService.AUTH) ? new AuthService(this) : null;
    this.userService = services.includes(ClientService.USER) ? new UserService(this) : null;
    this.productService = services.includes( ClientService.PRODUCT) ? new ProductService(this) : null;
  }

  getState = (): IClientStoreState => {
    return { token: this.token }
  }

  setToken = (token: string | undefined) => {
    this.token = token;
  }

  request = async (url: string, options?: RequestInit): Promise<any> => {
    return retry(
      { 
        errorRetryCount: this.errorRetryCount,
        onBeforeRetry: async (error: RequestError) => {
          if (error.status === 401 && this.authService) {
            return this.authService.refreshToken();
          }
        },
      }
    )(() => request(this.token)(url, options));
  }
}

