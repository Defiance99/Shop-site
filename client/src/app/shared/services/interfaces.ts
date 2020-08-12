
export interface User {
  name?: string,
  login: string,
  password: string
}


export interface Product {
  name: string,
  cost: number,
  category: string,
  description?: string,
  image?: string
  isEdit?: boolean
}

export interface Profile {
  name: string,
  login: string,
  password: string
}

export interface Order {
  list: [
    {
      _id: string,
      productId: string,
      name: string,
      cost: number,
      description: string
    }
  ],
  orderPrice?: number,
  userId?: string,
  completed?: boolean
}

export interface Message {
  message: string
}
