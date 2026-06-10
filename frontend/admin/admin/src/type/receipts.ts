export type BaseEntity = {
  id: number;
  createDate: string;
  modifyDate: string;
};

export type ReceiptListItem = {
  name: string;
  productId: number;
  quantity: number;
  price: number;
};

export type Receipts = {
  receiptId: number;
  email: string;
  address: string;
  postalCode: string;
  deliveryDate: string;
  status: string;
  totalPrice: number;
  items: ReceiptListItem[] | [];
};

//관리자 API 응답 타입
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'DELIVERED' | 'CANCELLED';

export type AdminMember = BaseEntity & {
  email: string;
  password: string;
  address: string;
  postalCode: string;
};

export type ProductImage = BaseEntity & {
  url: string;
};

//기본 카테고리 - 프론트에 존재하기 애매함
export type ProductCategory = 'ETHIOPIA' | 'COLOMBIA' | 'BRAZIL';

export type AdminProduct = BaseEntity & {
  beanName: string;
  price: number;
  category: ProductCategory;
  image: ProductImage;
};

export type AdminReceiptItem = BaseEntity & {
  product: AdminProduct;
  quantity: number;
  price: number;
};

export type AdminReceipt = BaseEntity & {
  member: AdminMember;
  deliveryDate: string;
  status: OrderStatus;
  totalPrice: number;
  receiptItems: AdminReceiptItem[];
};