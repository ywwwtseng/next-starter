export async function GET(request: Request) {
  const authorization = request.headers.get('Authorization');

  if (!authorization) {
    return new Response(JSON.stringify({ result: 'error' }), { status: 401 });
  }

  return new Response(JSON.stringify({ result: 'ok', data: { user: { name: 'William' } } }), {
    status: 200,
  });
}
