import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core'
import {IOrderItem, IOrders} from './shared/order.model'
import {SnacksService} from '../shared/snacks.service'
@Component({
    selector: 'app-orderitems',
    templateUrl: './order-item-details.component.html'
})
export class OrderItemDetailsComponent implements OnInit {
    @Input() orderId: number
    @Input() orderItems: IOrderItem[]
    @Output() outItem = new EventEmitter()
    processedOrderItems: IOrderItem[]
    totalCost: number
    constructor(private snackService: SnacksService) {}
    ngOnInit() {
        this.processedOrderItems = this.orderItems
        this.getTotalCost()
    }
    getTotalCost() {
        this.totalCost = 0
        this.processedOrderItems.forEach(item => {
                this.totalCost += item.quantity * item.price
        })
    }
    getItemSizes(item: IOrderItem, i: Number) {
        // console.log('i: ', i)
        let availableSizes = this.snackService.getSnackSizes(item.itemType, item.itemName)
            for ( let index = 0; index < i; index++) {
                const cItem = this.processedOrderItems[index]
                if (cItem.itemName === item.itemName && cItem.itemType === item.itemType ) {

                    availableSizes = availableSizes.filter(asize => asize.size !== cItem.size || asize.size === item.size)
                }
            }
        // console.log(this.snackService.getSnackSizes(item.itemType, item.itemName))
         return availableSizes
    }
    updateOrderBySize(oItem: IOrderItem, size: string) {
        this.orderItems.find(item => item.itemType === oItem.itemType && item.itemName === oItem.itemName
            && item.price === oItem.price).size = size
        this.orderItems.find(item => item.itemType === oItem.itemType && item.itemName === oItem.itemName
                && item.price === oItem.price).price =  this.snackService.getSnackPrice(oItem.itemType, oItem.itemName, size)
        this.getTotalCost()
        this.outItem.emit(this.processedOrderItems)
    }
    updateOrder(oItem: IOrderItem, quantity: number) {
        // console.log(oItem)
        // console.log(value)
        this.orderItems.find(item => item.itemType === oItem.itemType && item.itemName === oItem.itemName
        && item.price === oItem.price).quantity = +quantity
        this.getTotalCost()
        this.outItem.emit(this.processedOrderItems)
    }
}
