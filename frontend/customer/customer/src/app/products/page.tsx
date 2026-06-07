import BasePage from "../BasePage";
import { ProductCard } from "./product-card";

// products.tsx
export default function Page() {
  const products = [
      {
      id:0,
      name:"test",
      category:"category",
      price:10000,
      imageUrl:"/file.svg"
    }
  ];
  return (
    <BasePage>
     <div className="mx-8 flex flex-col flex-1">
      <h1 className="text-coffee-primary">상품 목록</h1>
        <div className="my-1 flex-1 overflow-y-auto">  {/* overflow를 여기로 올림 */}
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-1 gap-y-2">
            {Array.from({ length: 100 }).map((_, index) => (
              <li key={index}>
                <ProductCard
                  name={`상품 ${index + 1}`}
                  price={10000}
                  category="테스트"
                  id={0}
                />
              </li>
            ))}
            {/* {products.map((product) => (
              <li key={product.id}>
                <ProductCard {...product} />
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </BasePage>
  );
}
