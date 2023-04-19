import { IClientStore } from '@/stores/ClientStore';

export class ProductService {
  client: IClientStore;

  constructor(client: IClientStore) {
    this.client = client;
  }

  fetchProducts = async (page: number = 1, pageSize: number = 25): Promise<Product[]> => {
    try {
      const res = await this.client.request(`https://api.escuelajs.co/api/v1/products?offset=${(page - 1) * pageSize}&limit=${pageSize}`);

      if (page === 3) {
        return [];
      }
      return res;
    }
    catch(error) {
      return [];
      throw error;
    }
  }

}