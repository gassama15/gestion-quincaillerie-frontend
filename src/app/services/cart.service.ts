import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[] = [];
  cartData = {len: 0, cost: 0};

  constructor() { }

  updateCart() {
    let len = 0;
    let cost = 0;
    this.cart.forEach(element => {
      len += element.qty;
      cost += (element.qty * element.product.prix)
    });
    this.cartData.len = len;
    this.cartData.cost = cost;
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
    console.log(indexProduct)
    if (indexProduct) {
      if (this.cart[indexProduct].qty > 1) {
        this.cart[indexProduct].qty--;
      }else {
        this.cart.splice(indexProduct, 1);
      }
    }

    this.updateCart();

  }
}
