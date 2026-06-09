"use client";
import { useEffect, useState } from "react";
import BasePage from "../BasePage";
import { apiFetch } from "@/lib/backend/client";
import { Member } from "@/type/members";
import { Receipts } from "@/type/receipts";
import { ReceiptList } from "../receipts/receipt-list";

export default function MyOrders() {
    const [member, setMember] = useState<Member>();
    const [receipts, setRecipts] = useState<Receipts[]>();

    useEffect(() => {
            apiFetch(`/api/v1/members/my`,{ 
                method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },})
                .then((data) => {
                    const actorId = data.data;
                    return apiFetch(`/api/v1/members/me?actorId=${actorId}`);
                })
                .then((res)=>{
                    const actorId = res.data.id;
                    setMember(res.data);
                    return apiFetch(`/api/v1/receipts?actorId=${actorId}`)
                })
                .then((data) => {
                    setRecipts(data.data);
                })
                .catch((error) => {
                    console.error(error);
                    alert("회원 정보를 불러오지 못했습니다.");
                })}, []);


    return (
        <BasePage>
        <div className="myorder-page">
            <div className="myorder-block">
                <div className="myorder-owner">
                    {member?.email}님의 주문 내역입니다. ({receipts && receipts.length})
                </div>
                <div className="myorder-list-block">
                    {receipts && receipts.length > 0 && (
                        <ReceiptList receipts={receipts}></ReceiptList>
                    )}
                </div>
            </div>
        </div>
        </BasePage>
    );
}