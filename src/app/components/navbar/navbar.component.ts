import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

export interface CartInfo {
  items: number,
  totalPrice: number,
  currency: string,
  products?: any[]
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // cartInfo: any = {
  //     items: 2,
  //     totalPrice: 100,
  //     currency: 'USD'
  // };

  cartInfo: CartInfo;
  userInfo: any;

  constructor(
    private _authService: AuthService,
    private _cartService: CartService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart'));
      this._cartService.updateCart(cart);
    }

    this._authService.getAuthInfo().subscribe(res => {
      this.userInfo = res;
    });

    this._cartService.currentCart.subscribe(res => {
      let products = res.products;
      let totalPrice = 0;
      products.forEach(el => {
        totalPrice += el.price;
      });

      this.cartInfo = {
        items: products.length,
        totalPrice: totalPrice,
        currency: res.currency
      };
    });
  }

}
