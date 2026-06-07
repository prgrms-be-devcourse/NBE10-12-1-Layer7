import BasePage from "../BasePage";
import { OrderItem } from "./order-item";

export default function Page(){
    const totalPrice = "10000";
    return (
        <BasePage>
        <div className="order-page">
            <header>Grids & Circle</header>
            <div className="order-block">
                <div className="order-area">
                    <h2>상품 목록</h2>
                    <div className="order-list">
                        <ul>
                            {Array.from({ length: 10 })
                            .map((_, index) => (
                                        <li key={index}>
                                            <OrderItem
                                            name={`상품 ${index + 1}`}
                                            price={10000}
                                            category="테스트"
                                            />
                                        </li>
                                        ))}
                        </ul>
                    </div>
                </div>
                <div className="order-summary">
                    <div className="summary-header">
                        <h1>Summary</h1>
                    </div>
                    <div>
                        {/* todo: list */}
                        상품 요약 리스트
                    </div>
                    <form className="order-form">
                        <div>
                            <label className="order-email">이메일</label>
                            <input
                                className="order-text-input"
                                type="email" 
                                placeholder="이메일" 
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="order-address">주소</label>
                            <input
                                className="order-text-input"
                                type="text"
                                name="address"
                                placeholder="주소"
                            />
                        </div>
                        <div>
                            <label className="order-postal-code">우편번호</label>
                            <input
                                className="order-text-input"
                                type="text"
                                name="postal_code"
                                placeholder="우편번호"
                            />
                        </div>
                        <p className="order-notice">
                            매일 전날 오후 2시부터 당일 오후 2시까지의 주문을 모아서 처리합니다.
                        </p>
                        <div className="order-price">
                            <span className="text-sm font-medium">총금액</span>
                            <span className="text-sm font-medium">{totalPrice.toLocaleString()}원</span>
                        </div>
                        <button className="order-button">결제하기</button>
                    </form>
                </div>
            </div>
        </div>
        </BasePage>
    );
}