import { Receipts } from "@/type/receipts";
import { ReceiptItem } from "./receipt-item";


type ReceiptListProps = {
  receipts: Receipts[];
};

export function ReceiptList({receipts}:ReceiptListProps){
    return (
        <ul>
            {receipts.map((receipt, index) => (
                <ReceiptItem key={index} receipt={receipt} />
            ))}
        </ul>
    );
}