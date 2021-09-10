import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[];
  cartData = {len: 0, cost: 0};

  constructor() {
    this.initCart();
  }


  initCart(): void {
    if (typeof(localStorage) !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const cartData = JSON.parse(localStorage.getItem('cartData'));
      this.cart = cart ? cart : [];
      this.cartData = cartData ? cartData : {len: 0, cost: 0};
    } else {
      this.cart = [];
      this.cartData = {len: 0, cost: 0};
    }
  }

  updateCart() {
    let len = 0;
    let cost = 0;
    this.cart.forEach(element => {
      len += element.qty;
      cost += (element.qty * element.product.prix);
    });
    this.cartData.len = len;
    this.cartData.cost = cost;

    if (typeof(localStorage) !== 'undefined') {
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("cartData", JSON.stringify(this.cartData));
    }
  }

  addTocart(p: Product): void {
    const existedProduct = this.cart.find(element => element.product == p);

    if (existedProduct) {
      existedProduct.qty++;
    }else {

      const newProduct = {
        qty: 1,
        product: p
      };

      this.cart.push(newProduct);

    }

    this.updateCart();

  }

  deleteFromCart(p: Product): void {
    const indexProduct = this.cart.findIndex(element => element.product == p);
    if (indexProduct != -1) {
      if (this.cart[indexProduct].qty > 1) {
        this.cart[indexProduct].qty--;
      }else {
        this.cart.splice(indexProduct, 1);
      }
    }

    this.updateCart();

  }
}
