import { CartItem } from "../cart-item";

interface SummaryProps{
    items : CartItem[]
}
export default function Summary({items=[]} : SummaryProps){
    return (
        <ul>
             {/* {items ? (
                <p className="admin-order-empty">불러오는 중...</p>
            ) : items.length === 0 ? (
                <p className="admin-order-empty">주문 내역이 없습니다.</p>
            ) : (<></>)
            } */}
        </ul>
    )

}