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