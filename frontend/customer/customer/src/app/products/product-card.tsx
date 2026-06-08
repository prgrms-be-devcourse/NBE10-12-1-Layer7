import Image from "next/image";
interface ProductCardProps{
    id?: number;
    name?: string;
    price: number;
    category: string;
    imageUrl?: string;
    onClick: () => void
}

export function ProductCard({name="none", price=0, category="미분류", imageUrl="/default-coffee-product.svg", onClick=(()=>{})}: ProductCardProps){
    return(
        <div className="product-card" onClick={onClick}>
            <div className="product-card-category">{category}</div>
            <div className="product-card-img">
                <Image
                    src={imageUrl || "/default-coffee-product.svg"}
                    alt={name}
                    fill
                    className="object-cover"
                />
                </div>
            <div className="product-card-body">
                <div className="product-name">{name}</div>
                <div className="product-price">{price.toLocaleString()} 원</div>
            </div>
        </div>
    );
}