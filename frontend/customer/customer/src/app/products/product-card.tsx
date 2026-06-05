import Image from "next/image";
interface ProductCardProps{
    id: number;
    name: string;
    price: number;
    category: string;
    imageUrl?: string;
}

export function ProductCard({name="none", price=0, category="미분류", imageUrl="/file.svg"}: ProductCardProps){
    return(
        <div className="product-card">
            <div className="product-card-category">{category}</div>
            <div className="product-card-img">
                <Image 
                    src={imageUrl}
                    alt={name}
                    className="object-contain"
                    fill
                />
            </div>
            <div className="product-card-body">
                <div className="product-name">{name}</div>
                <div className="product-price">{price}</div>
            </div>
        </div>
    );
}