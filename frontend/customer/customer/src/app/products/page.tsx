'use client'
import { useEffect, useState } from "react";
import BasePage from "../BasePage";
import { CartFAB } from "./cart-fab";
import { ProductCard } from "./product-card";
import Image from 'next/image';
import OrderPage from '../order/page';
import { apiFetch, getUrl } from "@/lib/backend/client";
import { Product, ProductDto, toProduct } from "@/type/products";
import { CartItem } from "../order/cart-item";
import { ReceiptListItem, Receipts } from "@/type/receipts";

// products.tsx
export default function Page() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false)
  const increaseQuantity = (productId: number) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
  };
  const decreaseQuantity = (productId: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  useEffect(() => {
      const fetchData = async () => {
          //상품 목록
          const productData = await apiFetch(`/api/v1/products`);
          const productList: ProductDto[] = productData;
          setProducts(productList);

          //내 actorId
          const myData = await apiFetch(`/api/v1/members/my`, {
              credentials: "include",
          });
          const actorId = myData.data;

          //영수증 목록
          const receiptData = await apiFetch(`/api/v1/receipts?actorId=${actorId}`);
          const pendingReceipt = receiptData.data.find(
              (p: Receipts) => p.status === "PENDING"
          );

          if (!pendingReceipt) return; // PENDING 없으면 종료

          //CartItem 변환 (state 말고 로컬 변수 productList 사용)
          const tempCartItems: CartItem[] = pendingReceipt.items
              .filter((item: ReceiptListItem) =>
                  productList.some((p) => p.id === item.productId)
              )
              .map((item: ReceiptListItem) => ({
                  product: toProduct(productList.find((p) => p.id === item.productId)!),
                  quantity: item.quantity,
              }));

          setCartItems(tempCartItems); 
      };
      fetchData().catch(() => alert("알 수 없는 오류입니다."));
  }, []);
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
    const existing = prev.find((item) => item.product.id === product.id);

    if (existing) {
      return prev.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prev, { product, quantity: 1 }];
  });
  }
  
  return (
    <BasePage>
      <div className="products-page">
        <h1 className="products-header">상품 목록</h1>
          <div className="products-block">
            <ul className="product-list">
              {products ? products.map((product) => (
                <li key={product.id}>
                  <ProductCard name={product.beanName} imageUrl={getUrl(product.image?.url??"")} onClick={() => addToCart(toProduct(product))} {...product} />
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
      <CartFAB badge={cartItems.length} onClick={() => setIsOpen(true)} icon={<Image src="/coffee-cart-fab.svg" alt={""} width={80} height={80}/>}></CartFAB>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center p-6">
          <button
            type="button"
            className="absolute inset-0 bg-coffee-nav/60"
            aria-label="장바구니 닫기"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative z-10">
            <OrderPage items={cartItems} onDecrease={decreaseQuantity} onIncrease={increaseQuantity} modalOff={()=>{setIsOpen(false)}} />
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
    </BasePage>
  );
}
