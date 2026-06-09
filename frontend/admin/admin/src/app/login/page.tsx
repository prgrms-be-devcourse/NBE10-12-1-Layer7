'use client';

import { apiFetch } from "@/lib/backend/client";
import { useRouter } from "next/navigation";
import BasePage from "../BasePage";

export default function LoginPage() {
    const router = useRouter();
    const handleSubmit = (e:
        React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault();
            const form = e.target as HTMLFormElement;

            const email = form.elements.namedItem("email") as HTMLInputElement;
            const password = form.elements.namedItem("password") as HTMLInputElement;
            email.value = email.value.trim();
            if(email.value.length === 0){
                alert("이메일을 입력해주세요.");
                email.focus();
                return;
            }
            password.value = password.value.trim();
            if(password.value.length===0){
                alert("비밀번호를 입력해주세요.");
                password.focus();
                return;
            }
            apiFetch(`/api/v1/members/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                }),
            })
            .then((data) => {
                alert(data.msg ?? "로그인되었습니다.");
                if(data.resultCode==="200-1"){
                    router.replace(`/`);
                }
            })
            .catch((error) => {
                alert(error.message ?? "로그인에 실패했습니다.");
            });
        }
    return (
        <BasePage>
            <div className="mx-auto max-w-md rounded-3xl bg-white p-10 shadow-lg">
                <h1 className="mb-8 text-center text-3xl font-bold text-stone-800">
                     Admin Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                            ID
                        </label>
                        <input
                            type="text"
                            placeholder="아이디를 입력하세요"
                            name="email"
                            className="w-full rounded-xl border border-stone-300 bg-white p-3 text-coffee-primary placeholder:text-coffee-secondary/50 outline-none focus:border-amber-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력하세요"
                            className="w-full rounded-xl border border-stone-300 bg-white p-3 text-coffee-primary placeholder:text-coffee-secondary/50 outline-none focus:border-amber-500"
                        />
                    </div>

                    <button type="submit"className="w-full rounded-xl bg-amber-700 p-3 font-semibold text-white transition hover:bg-amber-800">
                        로그인
                    </button>

                    <button type="button" onClick={()=>{router.push("/signup")}} className="w-full rounded-xl border border-stone-300 p-3 font-medium text-stone-700 transition hover:bg-stone-100">
                        회원가입
                    </button>
                </form>
            </div>
        </BasePage>
    );
}