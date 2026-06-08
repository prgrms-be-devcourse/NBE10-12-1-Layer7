import Image from "next/image";
import { CartItem } from "./cart-item";
type OrderItemProps = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
};
export function OrderItem({ item, onIncrease, onDecrease }: OrderItemProps) {

  return (
    <div className="order-item">
      <div className="order-item-img">
        <Image
            src={item.product.imageUrl || "/default-coffee-product.svg"}
            alt={item.product.name || "기본 원두 상품 이미지"}
            fill
            sizes="80px"
            className="object-cover"
        />
      </div>

      <div className="order-item-desc">
        <div className="item-category">{item.product.category}</div>
        <div className="item-name">{item.product.name}</div>
      </div>

      <div className="item-price">{item.product.price.toLocaleString()}원</div>

      <div className="order-item-quantity">
        <button type="button" onClick={onDecrease} className="quantity-button-m" aria-label="수량 감소">
          -
        </button>
        <div className="item-quantity">{item.quantity}</div>
        <button type="button" onClick={onIncrease} className="quantity-button-p" aria-label="수량 증가">
          +
        </button>
      </div>
    </div>
  );
}