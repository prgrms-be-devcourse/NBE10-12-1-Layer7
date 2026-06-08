"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BasePage({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogin = false;
  const router = useRouter();

  return (
    <div className="base-page">
      <header className="base-header">
        <div className="base-nav">
          <button
            type="button"
            onClick={() => router.replace("/")}
            className="base-logo-button"
            aria-label="홈으로 이동"
          >
            <Image
              src="/grids-circles-logo-nav.svg"
              alt="로고"
              width={360}
              height={88}
              priority
              className="h-20 w-auto"
            />
          </button>

          <nav className="nav-service">
            <Link href="/products">상품 목록</Link>
            {isLogin && ( 
              <>
                <Link href="/mypage">마이페이지</Link>
                <Link href="/orders">주문 내역</Link>
              </>
            )}
          </nav>

          <div className="nav-right">
            {isLogin ? (
              <button type="button">로그아웃</button>
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

      <main className="base-main">{children}</main>
    </div>
  );
}