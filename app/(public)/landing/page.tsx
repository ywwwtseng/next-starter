async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/2');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Landing() {
  const data = await getData();

  return (
    <div>{JSON.stringify(data)}</div>
  )
}