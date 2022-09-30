import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public currentCart: Observable<any> = this.cartSubject.asObservable();

  constructor() { }

  public updateCart(cart){
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  public clearCart(){
    this.cartSubject.next(null);
  }

}
