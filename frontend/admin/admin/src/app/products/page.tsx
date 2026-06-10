'use client';
import { useEffect, useState } from "react";
import BasePage from "../BasePage";
import { CartFAB } from "./cart-fab";
import { ProductCard } from "./product-card";
import { apiFetch, getUrl } from "@/lib/backend/client";
import { DEFAULT_PRODUCT_DTO, Product, ProductDto, toProduct } from "@/type/products";
import ProductDetail from "./product-detail";



// products.tsx
export default function Page() {
  const [products, setProducts] = useState<ProductDto[] | null>([]);
  useEffect(() => {
    apiFetch(`/api/v1/products`)
      .then(setProducts);
  }, []);
  const [item, setItem] = useState<ProductDto>();
  
  
  const setDetail = (dto: ProductDto) =>{
    setItem(dto);
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  return (
    <BasePage>
      <div className="products-page">
        <h1 className="products-header">상품 목록</h1>
          <div className="products-block">
            <ul className="product-list">
              {products ? products.map((product) => (
                <li key={product.id}>
                  <ProductCard name={product.beanName} onClick={() => {setDetail(product)}} {...product} />
                </li>
              )):Array.from({ length: 100 }).map((_, index) => (
                <li key={index}>
                  <ProductCard
                    name={`상품 ${index + 1}`}
                    price={10000}
                    category="테스트"
                    id={index}
                    onClick={()=>{}}
                  />
                </li>
              ))}
            </ul>
        </div>
      </div>
      <CartFAB label="상품 추가 페이지 열기" icon={null} disabled={false} onClick={()=>(setIsFormOpen(true))}></CartFAB>
      {isOpen && item && (
        <div className="fixed inset-0 z-50 grid place-items-center p-6">
          <button
            type="button"
            className="absolute inset-0 bg-coffee-nav/60"
            aria-label="닫기"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative z-10">
            <ProductDetail product={item} canClick={false} modalOff={()=>setIsOpen(false)}/>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-xl font-bold text-coffee-secondary hover:bg-coffee-border"
              aria-label="닫기"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center p-6">
          <button
            type="button"
            className="absolute inset-0 bg-coffee-nav/60"
            aria-label="상품 추가 페이지 닫기"
            onClick={() => setIsFormOpen(false)}
          />
          <div className="relative z-10">
            <ProductDetail product={DEFAULT_PRODUCT_DTO} canClick={true} modalOff={()=>setIsFormOpen(false)} ></ProductDetail>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-xl font-bold text-coffee-secondary hover:bg-coffee-border"
              aria-label="닫기"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </BasePage>
  );
}
