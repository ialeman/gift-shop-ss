import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { CartInfo } from '../components/navbar/navbar.component';
import { ProductsService } from '../products/services/products.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  styles: [`
        .carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-details > .p-grid {
            border: 1px solid #b3c2ca;
            border-radius: 3px;
            margin: 0.3em;
            text-align: center;
            padding: 2em 0 2.25em 0;
        }
        .carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data .car-title {
            font-weight: 700;
            font-size: 20px;
            margin-top: 24px;
        }
        .carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data .car-subtitle {
            margin: 0.25em 0 2em 0;
        }
        .carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data button {
            margin-left: 0.5em;
        }
        .carousel-demo .ui-carousel .ui-carousel-content .ui-carousel-item .car-data button:first-child {
            margin-left: 0;
        }
        .carousel-demo .ui-carousel.custom-carousel .ui-carousel-dot-icon {
            width: 16px !important;
            height: 16px !important;
            border-radius: 50%;
        }
        .carousel-demo .ui-carousel.ui-carousel-horizontal .ui-carousel-content .ui-carousel-item.ui-carousel-item-start .car-details > .p-grid {
            margin-left: 0.6em;
        }
        .carousel-demo .ui-carousel.ui-carousel-horizontal .ui-carousel-content .ui-carousel-item.ui-carousel-item-end .car-details > .p-grid {
            margin-right: 0.6em;
        }
    `],
})
export class CartViewComponent implements OnInit {

  cartInfo: CartInfo;
  products: any[];
  repeatedProduct: any[] = [];

  productsList: any[] = [];
  responsiveOptions: any;
  orderSummary: any;

  constructor(
    private _cartService: CartService,
    private _productsService: ProductsService,
    private confirmationService: ConfirmationService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart'));
      this._cartService.updateCart(cart);
    }

    this._productsService.getProducts().then(res => this.productsList = res);

    this._cartService.currentCart.subscribe(res => {
      if(res == null){
        return;
      }
      
      // reset the list
      this.products = []; 
      this.repeatedProduct = [];

      this.products = res.products;
      let totalPrice = 0;

      this.products.forEach(el => {
        el.items = 1;
        totalPrice += el.price;
      });

      // this.products.filter(x => x.id == x.id);

      this.cartInfo = {
        items: this.products.length,
        totalPrice: totalPrice,
        currency: res.currency
      };

      this.products.forEach(prod => {
        let value = this.repeatedProduct.find(x => x.id == prod.id);
        if (value) {
          // let index = this.repeatedProduct.findIndex(x=> x.id == value.id);
          this.repeatedProduct = this.repeatedProduct.filter(val => val.id != value.id);
          // this.repeatedProduct.
          prod.items += 1;
        }

        this.repeatedProduct.push(prod);
      });

      let IVA = totalPrice * 0.16;
      let subtotal = totalPrice - IVA;

      this.orderSummary = {
        subtotal: subtotal,
        iva: IVA,
        total: totalPrice
      };

      // this.products.forEach(item => {
      //   let value = this.repeatedProduct.find(x => x.id == item.id);
      //   if(!value){
      //     item['items'] = 1;
      //     this.repeatedProduct.push(item);
      //   } else{
      //     let items = value.items + 1;

      //   }
      // });


    });
  }

  confirmDelete(product: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete from the Cart?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let products = cart.products;
        products = products.filter(prod => prod.id != product.id);
        cart.products = products;

        this._cartService.updateCart(cart);
      }
    });
  }


}
