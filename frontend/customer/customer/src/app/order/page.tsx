"use client";

import { useEffect, useState } from "react";
import BasePage from "../BasePage";
import { apiFetch } from "@/lib/backend/client";
import { Member } from "@/type/members";
import { CartItem } from "./cart-item";
import { OrderItem } from "./order-item";

type OrderPageProps = {
    items?: CartItem[];
    onIncrease?: (productId: number) => void;
    onDecrease?: (productId: number) => void;
};

export default function OrderPage({
                                      items = [],
                                      onIncrease = () => {},
                                      onDecrease = () => {},
                                  }: OrderPageProps) {
    const [member, setMember] = useState<Member>();

    const totalPrice = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    useEffect(() => {
        apiFetch(`/api/v1/members/my`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then((data) => {
                const actorId = data.data;
                return apiFetch(`/api/v1/members/me?actorId=${actorId}`);
            })
            .then((res) => {
                setMember(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <BasePage>
            <section className="order-page">
                <div className="order-block">
                    <div className="order-area">
                        <h2>장바구니</h2>

                        <div className="order-list">
                            <ul>
                                {items.length > 0 ? (
                                    items.map((item) => (
                                        <li key={item.product.id}>
                                            <OrderItem
                                                item={item}
                                                onIncrease={() =>
                                                    onIncrease(item.product.id)
                                                }
                                                onDecrease={() =>
                                                    onDecrease(item.product.id)
                                                }
                                            />
                                        </li>
                                    ))
                                ) : (
                                    <p>장바구니가 비어 있습니다.</p>
                                )}
                            </ul>
                        </div>
                    </div>

                    <aside className="order-summary">
                        <div className="summary-header">
                            <h1>주문 요약</h1>
                            <p>상품 요약 리스트</p>
                        </div>

                        <form className="order-form">
                            <div>
                                <label className="order-label">이메일</label>
                                <input
                                    className="order-text-input"
                                    type="email"
                                    placeholder="이메일"
                                    value={member?.email ?? ""}
                                    readOnly
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="order-label">주소</label>
                                <input
                                    className="order-text-input"
                                    type="text"
                                    name="address"
                                    placeholder="주소"
                                    value={member?.address ?? ""}
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="order-label">우편번호</label>
                                <input
                                    className="order-text-input"
                                    type="text"
                                    name="postal_code"
                                    placeholder="우편번호"
                                    value={member?.postalCode ?? ""}
                                    readOnly
                                />
                            </div>

                            <p className="order-notice">
                                매일 전날 오후 2시부터 당일 오후 2시까지의 주문을 모아서 처리합니다.
                            </p>

                            <div className="order-price">
                                <span>총금액</span>
                                <strong>{totalPrice.toLocaleString()}원</strong>
                            </div>

                            <button type="submit" className="order-button">
                                결제하기
                            </button>
                        </form>
                    </aside>
                </div>
            </section>
        </BasePage>
    );
}