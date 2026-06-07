import Image from "next/image"
export function OrderItem({name="", category="", price=0, imageUrl="/file.svg"}){
    const quantity=1;
    return (
        <>
            <div className="order-item">
                <div className="order-item-img">
                    <Image
                        src={imageUrl}
                        alt={name}
                        className="object-contain"
                        fill
                    />
                </div>
                <div className="order-item-desc">
                    <div className="item-category">{category}</div>
                    <div className="item-name">{name}</div>
                </div>
                <div className="order-item-price">
                    <div>{price}원</div>
                </div>
                <div className="order-item-quantity">
                    <button className="quantity-button-m">-</button>
                    <div className="item-quantity">{quantity}</div>
                    <button className="quantity-button-p">+</button>
                </div>
            </div>
        </>
    )
}