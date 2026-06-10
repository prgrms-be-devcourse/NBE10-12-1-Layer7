export type Receipts = {
    receiptId: number,
    email: string,
    address: string
    postalCode: string
    deliveryDate: string
    status: string
    totalPrice: number,
    items: [
        {
            productId: number,
            name: string,
            quantity: number,
            price: number
        }
    ] | [];
}
export type ReceiptListItem = {
    name: string
    productId: number,
    quantity: number,
    price: number
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED';