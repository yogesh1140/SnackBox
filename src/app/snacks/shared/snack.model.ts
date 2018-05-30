export interface ISnack {
    id: number
    name: string
    imageUrl: string
    availableSizes: IAvailableSize[]
}
export interface ISnackList {
    snacksType: string
    imageUrl: string
    snacks: ISnack[]
}

export interface IAvailableSize {
    size: string,
    price: number
}
