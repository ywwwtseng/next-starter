export async function POST(request: Request) {
  const body = await request.json();

  if (!body.access_token) {
    return new Response(JSON.stringify({ result: 'error' }), { status: 422 });
  }

  return new Response(JSON.stringify({ result: 'ok', data: { access_token: body.access_token } }), {
    status: 200,
    // headers: { 'Set-Cookie': `token=123; Max-Age=86400; Path=/; Secure; HttpOnly` },
    headers: { 'Set-Cookie': `token=${body.access_token}; Max-Age=86400; Path=/; Secure` }
  });
}
