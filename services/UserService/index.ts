import { IClientStore } from '@/stores/ClientStore';
import { API_URL } from '@/constants/app';


export class UserService {
  client: IClientStore;

  constructor(client: IClientStore) {
    this.client = client;
  }

  fetchMeProfile = async (): Promise<User> => {
    try {
      // const res = await this.client.request('/api/user');
      // return res?.data?.user;
      return { id: 123, name: 'William' };
    }
    catch(error) {
      throw error;
    }
  }

  fetchUserById = async (id: number): Promise<User> => {
    try {
      const res = await this.client.request(API_URL + '/users/' + id);
      return res;
    }
    catch(error) {
      console.log(error, 'error')
      throw error;
    }
  }
}