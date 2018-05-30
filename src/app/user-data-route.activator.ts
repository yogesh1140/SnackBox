import { Injectable} from '@angular/core'
import {CanActivate, Router} from '@angular/router'
import {AuthService} from './user/auth.service'
import {OrderService} from './snacks/orders/shared/order.service'
import {SnacksService} from './snacks/shared/snacks.service'
@Injectable()
export class UserDataRouteActivator implements CanActivate {
    constructor(private orderService: OrderService, private snacksService: SnacksService,
        private auth: AuthService, private router: Router) {
          }
    canActivate() {
        this.auth.checkAuthenticationStatus().subscribe(() => {
            // console.log('authenticated: ', this.auth.isAuthenticated())
            if (!this.auth.isAuthenticated()) {
                this.router.navigate(['/user/login'])
            }
            if (!this.snacksService.snacksList) {
                this.snacksService.getMenu().subscribe((res) => {
                    this.snacksService.snacksList = res
                })
            }
                this.orderService.getCartItems(this.auth.currentUser.username).subscribe((res) => {
                    this.orderService.cartItems = res
                })
                this.orderService.getOrders(this.auth.currentUser.username).subscribe((res) => {
                    this.orderService.userOrders = res
                })
            return this.auth.isAuthenticated()
        })
        return true;
    }
}
