export async function GET(request: Request) {
  const authorization = request.headers.get('Authorization');

  if (!authorization) {
    return new Response(JSON.stringify({ result: 'error', message: 'Unauthorized Error' }), { status: 401 });
  }

  return new Response(JSON.stringify({ result: 'ok', data: { id: 123, name: 'William' } }), {
    status: 200,
  });
}
