import { Receipts, ReceiptListItem } from "@/type/receipts";
import { useState } from "react";


type ReceiptItemProps = {
    receipt: Receipts;
    onCancel?: (receiptId: number) => void;
    hasCancel?: boolean;
};

export function ReceiptItem({ receipt, onCancel=()=>{}, hasCancel=false }: ReceiptItemProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function representativeProductName(items: ReceiptListItem[]) {
        let repName = "";
        if (items.length > 0) repName += items[0].name;
        if (items.length > 1) repName += " 외 " + (items.length - 1) + " 개";
        return repName;
    }

    return (
        <li className="receipt-item" onClick={() => setIsOpen((prev) => !prev)}>
            <div className="receipt-summary">
                <div className="receipt-item-id">주문 #{receipt.receiptId}</div>
                <div className="receipt-item-created">{receipt.deliveryDate}</div>
                <div className="receipt-item-name">{representativeProductName(receipt.items)}</div>
                <div className="receipt-item-price">{receipt.totalPrice.toLocaleString()}원</div>
                <div className="receipt-item-status">{receipt.status}</div>
                {receipt.status === "PENDING" && hasCancel && (
                    <button
                        className="receipt-item-cancel"
                        onClick={(e) => {
                            e.stopPropagation();
                            onCancel(receipt.receiptId);
                        }}
                    >
                        취소
                    </button>
                )}
            </div>
            {isOpen && (
                <div className="receipt-detail" onClick={(e) => e.stopPropagation()}>
                    <ul className="receipt-detail-list">
                        {receipt.items.toReversed().map((product) => (
                            <li key={product.productId} className="receipt-detail-item">
                                <span className="receipt-detail-name">{product.name}</span>
                                <span className="receipt-detail-price">{product.price.toLocaleString()}원</span>
                                <span className="receipt-detail-quantity">{product.quantity}개</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
}