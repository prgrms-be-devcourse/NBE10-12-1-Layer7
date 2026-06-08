export type ProductDto = {
    id : number
    createDate : string
    modifyDate : string
    beanName : string
    price : number
    category : string
    imageId: number
}
export type Product = {
    id : number
    name : string
    price : number
    category : string
    imageUrl : string
}

export function toProduct(dto: ProductDto): Product {
  return {
    id: dto.id,
    name: dto.beanName,
    price: dto.price,
    category: dto.category,
    imageUrl: "/default-coffee-product.svg"
  };
}

