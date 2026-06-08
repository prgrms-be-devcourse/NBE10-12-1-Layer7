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
            quantity: number,
            price: number
        }
    ] | [];
}
export type ReceiptListItem = {
    productId: number,
    quantity: number,
    price: number
}