import { Receipts } from "@/type/receipts";
import { ReceiptItem } from "./receipt-item";


type ReceiptListProps = {
    receipts: Receipts[];
    onCancel?: (receiptId: number) => void;
    hasCancel?:boolean;
};

export function ReceiptList({ receipts, onCancel=()=>{}, hasCancel=false }: ReceiptListProps) {
    return (
        <ul className="receipt-list">
            {receipts.toReversed().map((receipt, index) => (
                <ReceiptItem key={index} receipt={receipt} onCancel={onCancel} hasCancel={hasCancel} />
            ))}
        </ul>
    );
}