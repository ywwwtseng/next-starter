import { cookies } from 'next/headers';
import { ClientStore, ClientService } from '.';

export const getProductService = () => {
  const cookieStore = cookies();
  const token: string | undefined = cookieStore.get('token')?.value;
  const client = new ClientStore({ token }, [ClientService.PRODUCT]);
  return client.productService;
};