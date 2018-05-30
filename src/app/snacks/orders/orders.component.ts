import {Component, Injectable, Inject, OnInit } from '@angular/core'
import {Router} from '@angular/router'
import {OrderService} from './shared/order.service'
import {ICartItem, IOrders, IOrderItem} from './shared/order.model'
import {IToastr} from '../../common/toastr.model'
import {Toastr_Token} from '../../common/toastr.service'
import {JQ_Token} from '../../common/jquery.service'
import {AuthService} from '../../user/auth.service'
import {SnacksService} from '../shared/snacks.service'
@Component({
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
    orderId: number
    totalCost: number
    currentItem: IOrderItem
    processedItems: IOrderItem[]
    constructor(private orderService: OrderService, private auth: AuthService,
        private router: Router, @Inject(Toastr_Token) private toastr: IToastr, private snackService: SnacksService) {}
    ngOnInit() {
        // this.snackService.getSnacks(item.itemType).subscribe((snacks) => {
        //     return  snacks.find(sk => sk.name.includes(item.itemName)).availableSizes
        //     })
        // console.log('orders: ', this.orderService.userOrders)
    }
    getTotalCost(order: IOrders) {
        this.totalCost = 0
        order.items.forEach(item => {
            this.totalCost += item.quantity * item.price
        })
        return this.totalCost
    }
    cancelOrder(orderId: number) {
        this.orderService.deleteOrder(orderId)
        if (this.orderService.orders.length < 1) {
            this.router.navigate(['/foodmenu'])
        }
        this.toastr.success('Order deleted')
    }
    getProcessdItem(items: IOrderItem[]) {
        this.processedItems = items
    }
    updateOrder(id: number) {
        if (this.processedItems.length > 0) {
            this.orderService.updateOrder(id, this.processedItems)
            this.toastr.success('Order Id:' + id + ' updated')
        }
    }
}
