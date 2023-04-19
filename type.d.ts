interface User {
  id: number
  name: string
}

interface Product {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  creationAt: string
  updatedAt: string
}

interface APIResponse {
  result: 'ok' | 'error'
  data: any
}