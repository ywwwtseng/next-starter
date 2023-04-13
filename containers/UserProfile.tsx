'use client';

import React from 'react';
import useSWR from 'swr';
import { genURL } from '@/utils/swr';
import { API_URL } from '@/constants';
import { StoreContext} from '@/stores';
import { IAuthStore } from '@/stores/AuthStore';
import UserProfileName from '@/components/UserProfileName';

interface Props {
  uid: number
}

const UserProfile = ({ uid }: Props) => {
  const { auth } = React.useContext(StoreContext) as { auth: IAuthStore };
  const { data } = useSWR(genURL(API_URL, uid));
  const { data: user } = useSWR(genURL('/api/user', '?uid=', uid));

  return (
    <div>
      <button onClick={() => auth.signIn()}>Sign In</button>
      <button onClick={() => auth.logout()}>Logout</button>
      <UserProfileName name={data?.name} />
    </div>
  );
};

export default UserProfile;
