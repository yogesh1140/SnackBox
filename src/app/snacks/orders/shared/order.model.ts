export interface ICartItem {
    itemType: string
    itemUrl: string,
    itemName: string,
    size: string,
    price: number,
    quantity: number,
}

export interface IUserData {
    user: string,
    cartItems: ICartItem[]
}

export interface IOrderItem {
    itemType: string
    itemName: string,
    size: string,
    price: number,
    quantity: number,
}
export interface IOrders {
    id: number
    items: IOrderItem[]
    orderDate: Date,
    status: string,
    user: string
}
