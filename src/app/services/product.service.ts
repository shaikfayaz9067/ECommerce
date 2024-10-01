import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ecart, eorder, eproduct } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<eproduct[] | []>();

  constructor(private http: HttpClient) {}

  addProduct(data: eproduct) {
    return this.http.post('http://localhost:8081/api/eproducts', data); // Updated endpoint
  }

  // Fetch all products
  productList() {
    return this.http.get<eproduct[]>('http://localhost:8081/api/eproducts'); // Updated endpoint
  }

  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:8081/api/eproducts/${id}`); // Updated endpoint
  }

  getProduct(id: string) {
    return this.http.get<eproduct>(`http://localhost:8081/api/eproducts/${id}`); // Updated endpoint
  }

  updateProduct(product: eproduct) {
    return this.http.put<eproduct>(
      `http://localhost:8081/api/eproducts/${product.id}`,
      product
    ); // Updated endpoint
  }

  searchProduct(query: string) {
    return this.http.get<eproduct[]>(
      `http://localhost:8081/api/eproducts?q=${query}` // Updated endpoint
    );
  }

  localAddToCart(data: eproduct) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: eproduct[] = JSON.parse(cartData);
      items = items.filter((item: eproduct) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: ecart) {
    return this.http.post('http://localhost:8081/api/ecarts', cartData); // Updated endpoint
  }

  getCartList(userId: string) {
    return this.http
      .get<ecart[]>('http://localhost:8081/api/ecarts/user/' + userId, {
        observe: 'response',
      })
      .subscribe(
        (result) => {
          if (result && result.body && Array.isArray(result.body)) {
            const cartItems = result.body.map((item) => ({
              ...item,
              id: item.id || '', // Ensure 'id' is always a string
            })) as eproduct[];

            this.cartData.emit(cartItems); // Emit as eproduct[]
          } else {
            console.error('Unexpected response format:', result.body);
            this.cartData.emit([]); // Emit empty array on error
          }
        },
        (error) => {
          console.error('Error fetching cart list:', error);
          this.cartData.emit([]); // Emit empty array on error
        }
      );
  }

  removeToCart(cartId: string) {
    return this.http.delete('http://localhost:8081/api/ecarts/' + cartId); // Updated endpoint
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<ecart[]>(
      'http://localhost:8081/api/ecarts/user/' + userData.id // Updated endpoint
    );
  }

  orderNow(data: eorder) {
    return this.http.post('http://localhost:8081/api/eorders', data); // Updated endpoint
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<eorder[]>(
      'http://localhost:8081/api/eorders/user/' + userData.id // Updated endpoint
    );
  }

  deleteCartItems(cartId: string) {
    return this.http
      .delete('http://localhost:8081/api/ecarts/' + cartId) // Updated endpoint
      .subscribe((result) => {
        this.cartData.emit([]);
      });
  }

  cancelOrder(orderId: string) {
    return this.http.delete('http://localhost:8081/api/eorders/' + orderId); // Updated endpoint
  }
}
