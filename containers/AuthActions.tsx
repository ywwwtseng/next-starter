'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext} from '@/stores';
import { IClientStore } from '@/stores/ClientStore';

const AuthActions = observer(() => {
  const { client } = React.useContext(StoreContext) as { client: IClientStore };

  return (
    <div>
      {client.token}
      <button onClick={() => client?.authService?.signIn()}>Sign In</button>
      <button onClick={() => client?.authService?.logout()}>Logout</button>
    </div>
  );
});

export default AuthActions;
