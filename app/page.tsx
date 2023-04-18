import React from 'react';
import Link from 'next/link';
import UserProfile from '@/containers/UserProfile';
import AuthActions from '@/containers/AuthActions';

export default async function Page() {  
  return (
    <>
      <Link href="/landing">To</Link>
      <AuthActions />
      <UserProfile></UserProfile>
      <UserProfile></UserProfile>
      <UserProfile></UserProfile>
      <UserProfile></UserProfile>
      <UserProfile></UserProfile>
      <UserProfile></UserProfile>
      <UserProfile></UserProfile>
    </>
  );
}
