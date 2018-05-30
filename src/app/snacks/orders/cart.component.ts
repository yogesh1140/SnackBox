import {Component, Injectable, Inject} from '@angular/core'
import {Router} from '@angular/router'
import {OrderService} from './shared/order.service'
import {ICartItem} from './shared/order.model'
import {IToastr} from '../../common/toastr.model'
import {Toastr_Token} from '../../common/toastr.service'
import {JQ_Token} from '../../common/jquery.service'
import {AuthService} from '../../user/auth.service'
@Injectable()
@Component({
    templateUrl: './cart.component.html'
})
export class CartComponent {

    constructor(private orderService: OrderService, private auth: AuthService, @Inject(Toastr_Token) private toastr: IToastr,
                    @Inject(JQ_Token) private $: any, private router: Router) {}
    addToCart(type: string, url: string, item: string, price: number, size: string, quantity: number) {
        this.orderService.addToCart(type, url, item, size, price, quantity, this.auth.currentUser.username ).subscribe()
    }
    getTotalPrice(): number {
        let total = 0
        this.orderService.cartItems.forEach(item => {
            total += item.price * item.quantity
        });
        return total
    }
    deleteFromCart(cartItem: ICartItem) {
        this.orderService.deleteFromCart(cartItem, this.auth.currentUser.username).subscribe()
    }
    cancelOrder() {
        // this.$('#cancelOrederCart').modal('toggle');
        this.orderService.cancelOrder(this.auth.currentUser.username).subscribe()
        this.router.navigate(['/foodmenu'])
        this.toastr.success('Order Cancelled')
    }
    placeOrder() {
        this.orderService.placeOrder(this.auth.currentUser.username).subscribe((res) => {
            this.router.navigate(['/foodmenu'])
            this.toastr.success('Order Placed Successfully with #: ', res)
            this.orderService.cancelOrder(this.auth.currentUser.username).subscribe()
        })
        // this.orderService.getUserData(this.auth.currentUser.username)
    }
}

