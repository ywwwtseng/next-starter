export async function POST(request: Request) {
  const body = await request.json();

  if (!body.grant_type) {
    return new Response(JSON.stringify({ result: 'error' }), { status: 422 });
  }

  return new Response(JSON.stringify({ result: 'ok', data: { access_token: 'new_token_1' } }), {
    status: 200,
    headers: { 'Set-Cookie': `token=123; Max-Age=86400; Path=/; Secure; HttpOnly` },
  });
}
