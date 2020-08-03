
export interface User {
  login: string,
  password: string
}

export interface Product {
  name: string,
  cost: number,
  category: string,
  description?: string,
  image?: string
}

export interface Profile {
  name: string,
  login: string,
  password: string
}

export interface Order {
  date: Date,
  list: [
    {
      name: string,
      quantity: number,
      cost: number
    }
  ]
}

export interface Message {
  message: string
}
