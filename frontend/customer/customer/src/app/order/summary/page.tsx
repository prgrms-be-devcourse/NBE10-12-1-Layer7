import { CartItem } from "../cart-item";

interface SummaryProps{
    items : CartItem[]
}
export default function Summary({items=[]} : SummaryProps){
    return (
        <ul className="summary-list">
            {items.map((item) => (
                <li key={item.product.id} className="summary-item">
                    <div className="summary-product-name">{item.product.name}</div>
                    <div className="summary-product-quantity">{item.quantity}개</div>
                </li>
            ))}
        </ul>
    )

}