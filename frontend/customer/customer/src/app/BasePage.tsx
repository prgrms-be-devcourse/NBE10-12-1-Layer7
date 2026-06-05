import Link from "next/link";

export default function BasePage({
                                     children,
                                 }: {
    children: React.ReactNode;
}) {
    const isLogin = false; // 나중에 로그인 상태로 바꿀 예정

    return (
        <div className="min-h-screen bg-lime-400">
            <header className="bg-gray-300 px-10 py-4">
                <div className="text-center text-2xl font-semibold">
                    Navigation_Bar
                </div>

                <div className="flex items-center justify-between">
                    <Link href="/" className="text-5xl font-bold">
                        로고
                    </Link>

                    <nav className="flex gap-8 text-2xl font-semibold">
                        <Link href="/products">상품 목록</Link>
                   </nav>

                    <div className="flex gap-2 text-2xl font-semibold">
                        {isLogin ? (
                            <button>로그아웃</button>
                        ) : (
                            <>
                                <Link href="/login">로그인</Link>
                                <span>/</span>
                                <Link href="/signup">회원가입</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex min-h-[calc(100vh-120px)] items-center justify-center">
                {children}
            </main>
        </div>
    );
}