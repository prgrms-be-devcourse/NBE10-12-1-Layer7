import { getUrl } from "@/lib/backend/client"

export type ProductDto = {
    id : number
    createDate : string
    modifyDate : string
    beanName : string
    price : number
    category : string
    imageId?: number
    imageUrl: string | '../default-coffee-product.svg'
    image: {
    id: number;
    url: string;
  };
}
export const DEFAULT_PRODUCT_DTO: ProductDto = {
  id: 0,
  createDate: "",
  modifyDate: "",
  beanName: "",
  price: 0,
  category: "ETHIOPIA",
  imageUrl: '../default-coffee-product.svg',
  image: {
    id:1,
    url: ""
  },
};

export type Product = {
    id : number
    name : string
    price : number
    category : string
    imageUrl : string
}
// 왜 가능하지?
export function toProduct(dto: ProductDto): Product {
  console.log(dto);
  return {
    id: dto.id,
    name: dto.beanName,
    price: dto.price,
    category: dto.category,
    imageUrl: dto.imageUrl
  }
}

