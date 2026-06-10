"use client";
import { useEffect, useState } from "react";
import BasePage from "@/app/BasePage";
import { apiFetch } from "@/lib/backend/client";
import { AdminReceipt, OrderStatus } from "@/type/receipts";

export default function AdminOrdersPage() {
    const [receipts, setReceipts] = useState<AdminReceipt[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch(`/api/v1/admin/receipts`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json; charset=utf-8" },
        })
            .then((data) => {
                setReceipts(data.data);
            })
            .catch((error) => {
                console.error(error);
                alert("주문 내역을 불러오지 못했습니다.");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleStatusChange = async (id: number, status: OrderStatus) => {
        try {
            await apiFetch(`/api/v1/admin/receipts/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ status:status }),
            });
            setReceipts((prev) =>
                prev.map((r) => (r.id === id ? { ...r, status } : r))
            );
            alert("주문 상태가 변경되었습니다.")
        } catch {
            alert("상태 변경에 실패했습니다.");
        }
    };

    return (
        <BasePage>
            <div className="admin-order-page">
                <div className="admin-order-block">

                    <div className="admin-order-header">
                        <h1 className="admin-order-title">
                            전체 주문 내역
                            <span className="admin-order-count">{receipts.length}건</span>
                        </h1>
                    </div>

                    <div className="admin-order-list">
                        {loading ? (
                            <p className="admin-order-empty">불러오는 중...</p>
                        ) : receipts.length === 0 ? (
                            <p className="admin-order-empty">주문 내역이 없습니다.</p>
                        ) : (
                            receipts
                            .sort((a, b) => new Date(b.deliveryDate).getTime() - new Date(a.deliveryDate).getTime())
                            .map((receipt) => (
                                <div key={receipt.id} className="admin-order-card">

                                    <div className="admin-order-card-header">
                                        <div>
                                            <span className="admin-order-id">#{receipt.id}</span>
                                            <span className="admin-order-email">{receipt.member.email}</span>
                                        </div>
                                        <div className="admin-order-card-meta">
                                            <span className="admin-order-date">
                                                {receipt.deliveryDate}
                                            </span>
                                            <select
                                                className={`admin-order-status ${statusClass[receipt.status]}`}
                                                value={receipt.status}
                                                onChange={(e) =>
                                                    handleStatusChange(receipt.id, e.target.value as OrderStatus)
                                                }
                                            >
                                                {ORDER_STATUSES.map((status) => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <p className="admin-order-address">
                                        {receipt.member.address} ({receipt.member.postalCode})
                                    </p>

                                    <ul className="admin-order-items">
                                        {receipt.receiptItems.map((item) => (
                                            <li key={item.id} className="admin-order-item">
                                                <span>{item.product.beanName}</span>
                                                <span className="admin-order-item-detail">
                                                    {item.quantity}개 · {item.price.toLocaleString()}원
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="admin-order-total">
                                        총 {receipt.totalPrice.toLocaleString()}원
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </BasePage>
    );
}

const ORDER_STATUSES: OrderStatus[] = ['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED'];

const statusClass: Record<OrderStatus, string> = {
    PENDING:   "status-pending",
    PROCESSING: "status-processing",
    DELIVERED: "status-delivered",
    CANCELLED: "status-cancelled",
};