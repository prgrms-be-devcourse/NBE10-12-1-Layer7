
"use client";

import { useEffect, useState } from "react";
import BasePage from "../BasePage";
import { apiFetch, isLogin } from "@/lib/backend/client";
import { useRouter } from "next/navigation";
import { Member } from "@/type/members";
import { Receipts } from "@/type/receipts";
import { ReceiptList } from "../receipts/receipt-list";

export default function MyPage() {
    const [member, setMember] = useState<Member>();
    const [receipts, setRecipts] = useState<Receipts[]>();
    const router = useRouter();

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
            <main className="flex min-h-screen justify-center px-6 py-16">
                <section className="w-full max-w-3xl rounded-[36px] bg-white p-14 shadow-xl">
                    <h1 className="mb-10 text-center text-5xl font-bold text-neutral-900">
                        MyPage
                    </h1>

                    <div className="space-y-8">
                        <div>
                            <p className="mb-2 text-xl font-semibold text-coffee-nav-accent">
                                Email
                            </p>
                            <div className="rounded-2xl border border-neutral-300 p-5 text-neutral-700">
                                {member?.email ?? "회원 정보를 불러오는 중입니다."}

                            </div>
                        </div>

                        <div>
                            <p className="mb-2 text-xl font-semibold text-coffee-nav-accent">
                                주소
                            </p>
                            <div className="rounded-2xl border border-neutral-300 p-5 text-neutral-700">
                                {member?.address ?? "회원 정보를 불러오는 중입니다."}
                            </div>
                        </div>

                        <div>
                            <p className="mb-2 text-xl font-semibold text-coffee-nav-accent">
                                우편번호
                            </p>
                            <div className="rounded-2xl border border-neutral-300 p-5 text-neutral-700">
                                {member?.postalCode ?? "회원 정보를 불러오는 중입니다."}
                            </div>
                        </div>

                        {/* 주문 내역 */}
                        <div className="pt-6">
                            <p className="mb-3 text-2xl font-semibold text-coffee-nav-accent">
                                주문 내역
                            </p>

                            <div className="min-h-[200px] rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-neutral-400">
                                {receipts?.length ?? "주문 내역 정보를 불러오는 중입니다."}
                                {receipts && receipts.length > 0 && (
                                    <ReceiptList receipts={receipts} />
                                   )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </BasePage>
    );
}