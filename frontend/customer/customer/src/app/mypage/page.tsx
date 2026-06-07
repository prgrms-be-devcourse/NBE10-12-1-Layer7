import BasePage from "../BasePage";

export default function MyPage() {
    return (
        <BasePage>
            <main className="flex min-h-screen justify-center bg-lime-400 px-6 py-16">
                <section className="w-full max-w-3xl rounded-[36px] bg-white p-14 shadow-xl">
                    <h1 className="mb-10 text-center text-5xl font-bold text-neutral-900">
                        MyPage
                    </h1>

                    <div className="space-y-8">
                        <div>
                            <p className="mb-2 text-xl font-semibold">
                                Email
                            </p>

                            <div className="rounded-2xl border border-neutral-300 p-5 text-neutral-400">
                                로그인한 사용자의 이메일
                            </div>
                        </div>

                        <div>
                            <p className="mb-2 text-xl font-semibold">
                                주소
                            </p>

                            <div className="rounded-2xl border border-neutral-300 p-5 text-neutral-400">
                                로그인한 사용자의 주소
                            </div>
                        </div>

                        <div>
                            <p className="mb-2 text-xl font-semibold">
                                우편번호
                            </p>

                            <div className="rounded-2xl border border-neutral-300 p-5 text-neutral-400">
                                로그인한 사용자의 우편번호
                            </div>
                        </div>

                        {/* 주문 내역 */}
                        <div className="pt-6">
                            <p className="mb-3 text-2xl font-semibold">
                                주문 내역
                            </p>

                            <div className="min-h-[200px] rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-neutral-400">
                                주문 내역 영역
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </BasePage>
    );
}