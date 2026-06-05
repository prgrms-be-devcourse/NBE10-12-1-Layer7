import { ProductCard } from "./product-card";
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
    <>
      <div className="mx-8">
        <h1>상품 목록</h1>
        <div className="my-1">
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-1 gap-y-2">
            {Array.from({ length: 10 }).map((_, index) => (
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
    </>
  );
}
