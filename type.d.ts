interface User {
  id: number
  name: string
}

interface APIResponse {
  result: 'ok' | 'error'
  data: any
}