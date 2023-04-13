import React from 'react';
import Link from 'next/link';
import UserProfile from '@/containers/UserProfile';

export default async function Page() {  
  return (
    <>
      <Link href="/landing">To</Link>
      <UserProfile uid={1}></UserProfile>
      <UserProfile uid={1}></UserProfile>
      <UserProfile uid={2}></UserProfile>
      <UserProfile uid={2}></UserProfile>
      <UserProfile uid={2}></UserProfile>
      <UserProfile uid={2}></UserProfile>
      <UserProfile uid={2}></UserProfile>
    </>
  );
}
