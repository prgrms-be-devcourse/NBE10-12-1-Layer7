import BasePage from "../BasePage";

export default function LoginPage() {
    return (
        <BasePage>
            <div className="mx-auto max-w-md rounded-3xl bg-white p-10 shadow-lg">
                <h1 className="mb-8 text-center text-3xl font-bold text-stone-800">
                     Login
                </h1>

                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                            ID
                        </label>
                        <input
                            type="text"
                            placeholder="아이디를 입력하세요"
                            className="w-full rounded-xl border border-stone-300 p-3 outline-none focus:border-amber-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-stone-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            className="w-full rounded-xl border border-stone-300 p-3 outline-none focus:border-amber-500"
                        />
                    </div>

                    <button className="w-full rounded-xl bg-amber-700 p-3 font-semibold text-white transition hover:bg-amber-800">
                        로그인
                    </button>

                    <button className="w-full rounded-xl border border-stone-300 p-3 font-medium text-stone-700 transition hover:bg-stone-100">
                        회원가입
                    </button>
                </div>
            </div>
        </BasePage>
    );
}