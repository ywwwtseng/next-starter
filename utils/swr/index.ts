'use client';
// import serialize from 'serialize-javascript';

import { unstable_serialize } from 'swr';

export const serializeSwrFallback = (swrFallback: any[]): { [key: string]: any; } => {
  return swrFallback.reduce((acc: any, val: any) => {
    acc[unstable_serialize(val[0])] = val[1];
    return acc;
  }, {});
};