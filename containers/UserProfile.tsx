'use client';

import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { observer } from 'mobx-react-lite';
import { StoreContext} from '@/stores';
import { IClientStore } from '@/stores/ClientStore';
import { UserService } from '@/services';
import UserProfileName from '@/components/UserProfileName';
import { SWR_CACHE_KEY } from '@/constants/swr';


const UserProfile = observer(() => {
  const { client } = React.useContext(StoreContext) as { client: IClientStore };
  const userService = client.userService as UserService;
  const { data: me, error } = useSWR(client.token ? SWR_CACHE_KEY.ME : null, userService.fetchMeProfile);
  const { data: user1 } = useSWR(client.token ? [SWR_CACHE_KEY.USERS, 1] : null, ([,id]) => userService.fetchUserById(id));
  const { data: user2 } = useSWR(client.token ? [SWR_CACHE_KEY.USERS, 2] : null, ([,id]) => userService.fetchUserById(id));
  const { mutate, cache } = useSWRConfig();

  const revalidate = () => {
    console.log(cache);
    mutate(SWR_CACHE_KEY.ME);
  };

  if (error) {
    console.log(error);
    return null;
  }


  return (
    <div>
      {me && <UserProfileName name={me.name} />}
      {user1 && <UserProfileName name={user1.name} />}
      {user2 && <UserProfileName name={user2.name} />}
      <button onClick={revalidate}>Revalidate</button>
    </div>
  );
});

export default UserProfile;
