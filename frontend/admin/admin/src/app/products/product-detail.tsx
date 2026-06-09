'use client';
import { apiFetch, getUrl } from "@/lib/backend/client";
import {ProductDto } from "@/type/products";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductDetailDTO{
    product:ProductDto;
}
type Category=string;

export default function ProductDetail({product}:ProductDetailDTO){
    const [categories, setCategories] = useState<Category[]>(["ETHIOPIA",
    "COLOMBIA",
    "BRAZIL",
    "DECAF"]);
    const [category, setCategory] = useState(product.category);
    const [modifyMode, setMode] = useState<boolean>(false);
    const [beanName, setBeanName] = useState(product.beanName);
    const [price, setPrice] = useState(product.price);
    const [imageId, setImageId] = useState(product.imageId);
    const router = useRouter();

    useEffect(()=>{
        apiFetch('/api/v1/products/categories')
        .then((data) => data ?? setCategories(data));
    },[]);

    const apply = (product : ProductDto) => {
        console.log(price, beanName, category);
        apiFetch(`/api/v1/admin/products/${product.id}`,{
            method:"PUT",
            credentials:"include",
            headers: {
                 "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                beanName: beanName.trim(),
                price: price,
                category: category.toUpperCase().trim(),
                imageId: 1,
            })
        }).then((data)=>{
            if(data.resultCode === "200-1") return router.push('/products');
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
    <div className="product-detail-block">
    <img
        className="product-detail-img"
        src={getUrl(product?.imageUrl ?? "") || "/default-coffee-product.svg"}
        alt={product.beanName}
    />

    <div className="product-detail-info">
        <div className="product-detail-id">상품 #{product.id}</div>
        {!modifyMode ? (
        <>
        <div className="product-detail-name">{product.beanName}</div>
        <div className="product-detail-category">{product.category}</div>
        <div className="product-detail-price">{product.price.toLocaleString()}원</div>
        </>
        ):(
        <>
        <input name="beanName" onChange={(e) => setBeanName(e.target.value)} className="product-detail-name-input" defaultValue={product.beanName}></input>
        {/* <input name="category" onChange={(e) => setCategory(e.target.value)} className="product-detail-category-input" defaultValue={product.category}></input> */}
        <label className="product-detail-label">카테고리</label>
        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="product-detail-select"
        >
        <option value="" disabled>
            카테고리를 선택하세요
        </option>

        {categories.map((category) => (
            <option key={category} value={category}>
            {category}
            </option>
        ))}
        </select>
        <input type="number" name="price" onChange={(e) => setPrice(Number(e.target.value))} className="product-detail-price-input" defaultValue={product.price}></input>
        </>
        )}
        <div className="product-detail-created">등록일 {product.createDate}</div>
        <div className="product-detail-modified">수정일 {product.modifyDate}</div>
        <button className="product-detail-modify-button" hidden={modifyMode} onClick={()=>(setMode(true))}>수정</button>
        <button className="product-detail-confirm-button" hidden={!modifyMode} onClick={()=>(apply(product))}>결정</button>
    </div>
    </div>
    );
}