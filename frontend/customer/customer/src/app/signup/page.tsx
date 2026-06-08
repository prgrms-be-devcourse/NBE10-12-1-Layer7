'use client';
import { apiFetch } from "@/lib/backend/client";
import BasePage from "../BasePage";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const handleSubmit = (e:
        React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault();
            
            const form = e.target as HTMLFormElement;

            const email = form.elements.namedItem("email") as HTMLInputElement;
            const password = form.elements.namedItem("password") as HTMLInputElement;
            const password_check = form.elements.namedItem("password_check") as HTMLInputElement;
            const address = form.elements.namedItem("address") as HTMLInputElement;
            const postal_code = form.elements.namedItem("postal_code") as HTMLInputElement;

            email.value = email.value.trim();
            
            if(email.value.length === 0){
                alert("이메일을 입력해주세요.");
                email.focus();
                return;
            }
            password.value = password.value.trim();

            if(password.value.length === 0){
                alert("비밀번호를 입력해주세요.");
                password.focus();
                return;
            }
            password_check.value = password_check.value.trim();

            if(password_check.value.length === 0){
                alert("비밀번호를 입력해주세요.");
                password_check.focus();
                return;
            }
            if(password.value !== password_check.value){
                alert("비밀번호가 일치하지 않습니다.");
                password_check.focus();
                return;
            }

            address.value = address.value.trim();
            if(address.value.length === 0){
                alert("주소를 입력해주세요.");
                address.focus();
                return;
            }

            postal_code.value = postal_code.value.trim();
            if(postal_code.value.length === 0){
                alert("우편번호를 입력해주세요.");
                postal_code.focus();
                return;
            }

            apiFetch(`/api/v1/members/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                    address: address.value,
                    postalCode: postal_code.value
                }),
            })
            .then((data) => {
                alert(data.msg);
                router.replace(`/`);
            });
        };
    return (
        <BasePage>
            <div className="mx-auto max-w-md rounded-3xl bg-white p-10 shadow-lg">
                <h1 className="mb-8 text-center text-3xl font-bold text-stone-800">
                     Sign Up
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                            Email (ID)
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="이메일을 입력하세요"
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

                    <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                            Password Check
                        </label>
                        <input
                            type="password"
                            name="password_check"
                            placeholder="비밀번호를 다시 입력하세요"
                            className="w-full rounded-xl border border-stone-300 bg-white p-3 text-coffee-primary placeholder:text-coffee-secondary/50 outline-none focus:border-amber-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            placeholder="주소를 입력하세요"
                            className="w-full rounded-xl border border-stone-300 bg-white p-3 text-coffee-primary placeholder:text-coffee-secondary/50 outline-none focus:border-amber-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            name="postal_code"
                            placeholder="우편번호를 입력하세요"
                            className="w-full rounded-xl border border-stone-300 bg-white p-3 text-coffee-primary placeholder:text-coffee-secondary/50 outline-none focus:border-amber-500"
                        />
                    </div>

                    <button type="submit" className="w-full rounded-xl bg-amber-700 p-3 font-semibold text-white transition hover:bg-amber-800">
                        회원가입
                    </button>
                </form>
            </div>
        </BasePage>
    );
}