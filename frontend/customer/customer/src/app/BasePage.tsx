import Link from "next/link";

export default function BasePage({
                                     children,
                                 }: {
    children: React.ReactNode;
}) {
    const isLogin = true; // 나중에 로그인 상태로 바꿀 예정

    return (
        <div className="base-page">
            <header className="base-header">
                <div className="base-nav">
                    <Link href="/" className="text-5xl font-bold">
                        로고
                    </Link>

                    <nav className="nav-service">
                        <Link href="/products">상품 목록</Link>
                        {(isLogin) && (
                            <>
                            <Link href="/mypage">마이페이지</Link>
                            <Link href="/orders">주문 내역</Link>
                            </>
                        )}
                    </nav>

                    <div className="nav-right">
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
            <main className="base-main">
                {children}
            </main>
        </div>
    );
}