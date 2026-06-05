import BasePage from "./BasePage";

export default function Page() {
    return (
        <BasePage>
            <section className="rounded-3xl bg-white/90 p-10 shadow-lg">
                <p className="mb-3 text-sm font-semibold text-amber-700">
                    Local Coffee Beans Store
                </p>

                <h1 className="mb-6 text-4xl font-bold text-stone-800">
                    ☕ Grids & Circles
                </h1>

                <div className="space-y-4 text-lg leading-8 text-stone-700">
                    <p>
                        우리는 작은 로컬 카페{" "}
                        <strong>'Grids & Circles'</strong> 입니다.
                    </p>

                    <p>
                        고객들은 온라인 웹사이트를 통해 커피 원두 패키지를 주문합니다.
                    </p>

                    <p>
                        우리는 <strong>
                        매일 전날 오후 2시부터 당일 오후 2시까지의 주문
                    </strong>
                        을 모아서 처리합니다.
                    </p>

                    <p>
                        현재 총 <strong>4개의 상품</strong>이 있습니다.
                    </p>
                </div>
            </section>
        </BasePage>
    );
}