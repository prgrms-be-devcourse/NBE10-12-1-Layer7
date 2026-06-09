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

