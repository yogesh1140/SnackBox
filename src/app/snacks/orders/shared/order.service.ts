
import {throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core'
import {Http, RequestOptions, Response, RequestOptionsArgs, Headers} from '@angular/http'
import {Observable} from 'rxjs/RX'
import {IUserData, ICartItem, IOrders, IOrderItem} from './order.model'
@Injectable()
export class OrderService  {
    cartItems: ICartItem[]
    orders: IOrders[] = []
    userOrders: IOrders[] = []
    usersData: IUserData[] = [{cartItems: [], user: 'test'}]
    constructor(private http: Http) {}

    getCartItems(user: string): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json'})
        const options = new RequestOptions({headers: headers});
    return this.http.post('/api/cart', JSON.stringify({user: user}), options).pipe(map((response: Response) => {
      return response.json();
    }),catchError(this.handleError),);
    }
    getOrders(user: string): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json'})
        const options = new RequestOptions({headers: headers});
    return this.http.get('/api/orders/' + user ,  options).pipe(map((response: Response) => {
      return response.json();
    }),catchError(this.handleError),);
    }
    deleteFromCart(cartItem: ICartItem, user: string) {
        this.cartItems = this.cartItems.filter(cit => !cit.itemName.includes(cartItem.itemName)
        || !(cit.size.includes(cartItem.size) && cit.itemName.includes(cartItem.itemName)))
        const headers = new Headers({ 'Content-Type': 'application/json'})
        const options = new RequestOptions({headers: headers});
        return this.http.put('/api/cart/delete', JSON.stringify({user: user, cartItem: cartItem}), options).pipe(map((response: Response) => {
        return response.json();
        }),catchError(this.handleError),);
    }
    addToCart(itemType: string, itemUrl: string, item: string, size: string, price: number, quantity: number, user: string ) {
        const cartEntry: ICartItem = {
            itemType: itemType, itemUrl: itemUrl, itemName: item, size: size, price: price, quantity: quantity
            }
        if (this.cartItems.find(cit => cit.itemName === item && cit.size === size)) {
            this.cartItems.find(cit => cit.itemName === item && cit.size === size).quantity += +quantity
        } else {
            this.cartItems.push(cartEntry)
        }
        const headers = new Headers({ 'Content-Type': 'application/json'})
        const options = new RequestOptions({headers: headers});
        return this.http.put('/api/cart/add', JSON.stringify({user: user, cartItem: cartEntry}), options).pipe(map((response: Response) => {
        return response.json();
        }),catchError(this.handleError),);
    }
    cancelOrder(user: string) {
        this.cartItems = []
        const cartEntry: ICartItem = {
            itemType: 'ALL', itemUrl: '', itemName: '', size: '', price: 0, quantity: 0
            }
        const headers = new Headers({ 'Content-Type': 'application/json'})
        const options = new RequestOptions({headers: headers});
        return this.http.put('/api/cart/delete', JSON.stringify({user: user, cartItem:  cartEntry}), options).pipe(map((response: Response) => {
        return response.json();
        }),catchError(this.handleError),);
    }
    placeOrder(user: string) {
        const orderItems: IOrderItem[] = []
        this.cartItems.forEach(cItem => {
            let  ordItem: IOrderItem
           // console.log(cItem)
            ordItem =  {itemType: cItem.itemType, itemName: cItem.itemName, price: cItem.price, quantity: cItem.quantity, size: cItem.size}
            orderItems.push(ordItem)
        })
        // this.usersData.find(cart => cart.user === user).cartItems = []
        const headers = new Headers({ 'Content-Type': 'application/json'})
        const options = new RequestOptions({headers: headers});
        return this.http.post('/api/orders', JSON.stringify({user: user, items:  orderItems}), options).pipe(map((response: Response) => {
        return response.json();
        }),catchError(this.handleError),);
        // let nextId = Math.max.apply(null, this.orders.map(ord => ord.id) )
        // if (nextId === Math.max()) {
        //     nextId = 0
        // }
        // this.orders.push({id: nextId + 1, items: orderItems, orderDate: new Date(), status: 'In Progress', user: user})
    }
    updateOrder(orderId: number, processedItems: IOrderItem[]) {
        // this.orders.find(ord => ord.id === orderId).items = processedItems
        this.userOrders.find(ord => ord.id === orderId).items = processedItems
        const headers = new Headers({ 'Content-Type': 'application/json'})
        const options = new RequestOptions({headers: headers});
        return this.http.put('/api/orders' , JSON.stringify({orderId: orderId, items: processedItems}),
         options).pipe(map((response: Response) => {
        return response.json();
        }),catchError(this.handleError),).subscribe();
    }
    deleteOrder(orderId: number) {
        // this.orders = this.orders.filter(ord => ord.id !== orderId)
        this.userOrders = this.userOrders.filter(ord => ord.id !== orderId)
        const headers = new Headers({ 'Content-Type': 'application/json'})
        const options = new RequestOptions({headers: headers});
        return this.http.delete('/api/orders/' + orderId , options).pipe(map((response: Response) => {
        return response.json();
        }),catchError(this.handleError),).subscribe();
    }
    getUserData(user: string) {
        // this.cartItems = this.usersData.find(cart => cart.user === user).cartItems
        this.userOrders = this.orders.filter(ord => ord.user === user)
    }
    addUserData(user: string) {
       const userData: IUserData = {user: user, cartItems: []}
       this.usersData.push(userData)
    }
    private handleError(error: Response) {
        console.log('api error')
        return observableThrowError(error.statusText);
    }
}

