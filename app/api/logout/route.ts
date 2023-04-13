import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const token: string | undefined = cookieStore.get('token')?.value;

  return new Response(JSON.stringify({ result: 'ok' }), {
    status: 200,
    headers: { 'Set-Cookie': `token=${token}; Max-Age=0; Path=/; Secure` }
  });
}
