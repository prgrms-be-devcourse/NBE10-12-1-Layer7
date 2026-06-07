import Link from "next/link";

export default function MyPage() {
    return (
        <main className="min-h-screen bg-lime-400">
            {/* Navigation Bar */}
            <header className="bg-gray-300 px-10 py-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <h1 className="text-5xl font-bold text-white">
                        로고
                    </h1>

                    {/* Navigation Menu */}
                    <nav className="flex flex-col items-center text-white">
            <span className="text-2xl font-semibold">
              Navigation_Bar
            </span>

                        <div className="mt-2 flex gap-10 text-xl font-medium">
                            <Link href="/menus">상품 목록</Link>
                            <Link href="/mypage">마이페이지</Link>
                            <Link href="/orders">주문 내역</Link>
                        </div>
                    </nav>

                        {/* Login / Logout */}
                        <div className="flex gap-4 text-2xl font-semibold text-white">
                            <button type="button">로그아웃</button>
                    </div>
                </div>
            </header>

            {/* MyPage Content */}
            <section className="flex justify-center px-6 py-16">
                <div className="w-full max-w-3xl rounded-[36px] bg-white p-14 shadow-xl">
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
                </div>
            </section>
        </main>
    );
}