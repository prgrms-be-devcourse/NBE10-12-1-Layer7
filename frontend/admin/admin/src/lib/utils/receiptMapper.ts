import { AdminReceipt, Receipts, ReceiptListItem } from '@/type/receipts';

// AdminReceipt → 기존 Receipts 타입으로 변환
export function mapAdminReceiptToReceipts(adminReceipt: AdminReceipt): Receipts {
  const items: ReceiptListItem[] = adminReceipt.receiptItems.map((item) => ({
    productId: item.product.id,
    name: item.product.beanName,
    quantity: item.quantity,
    price: item.price,
  }));

  return {
    receiptId: adminReceipt.id,
    email: adminReceipt.member.email,
    address: adminReceipt.member.address,
    postalCode: adminReceipt.member.postalCode,
    deliveryDate: adminReceipt.deliveryDate,
    status: adminReceipt.status,
    totalPrice: adminReceipt.totalPrice,
    items,
  };
}

// 목록 전체 변환
export function mapAdminReceiptList(adminReceipts: AdminReceipt[]): Receipts[] {
  return adminReceipts.map(mapAdminReceiptToReceipts);
}