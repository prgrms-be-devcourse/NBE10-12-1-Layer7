import { Receipts, ReceiptListItem } from "@/type/receipts";


type ReceiptItemProps = {
    receipt: Receipts;
}

export function ReceiptItem({receipt}:ReceiptItemProps){
    function representativeProductName(items:ReceiptListItem[]){
        let repName = "";
        // if(items.length>0)repName+=items[0].productId.toString();
        if(items.length>0)repName+= "상품 이름입니다.";
        if(items.length>1)repName+=" 외 " + (items.length-1) + " 개";
        return repName;
    }
    return (
        <li className="receipt-item">
            <div className="receipt-item-id">주문 #{receipt.receiptId}</div>
            <div className="receipt-item-created">{receipt.deliveryDate}</div>
            <div className="receipt-item-name">{representativeProductName(receipt.items)}</div>
            <div className="receipt-item-price">{receipt.totalPrice.toLocaleString()}원</div>
            <div className="receipt-item-status">{receipt.status}</div>
        </li>
    );
}