export interface esignUp {
  name: string;
  email: string;
  password: string;
}
export interface elogin {
  email: String;
  password: String;
}

export interface eproduct {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id: string;
  quantity: number; // Make this optional to allow undefined
  productId?: string;
}
export interface ecart {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id?: string;
  quantity: number;
  productId: string;
  userId: string;
}

export interface epriceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface eorder {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: string;
  id: string | undefined;
}
