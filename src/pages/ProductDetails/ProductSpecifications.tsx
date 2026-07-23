import type { Product } from "../../types/categories";

export const ProductSpecifications = (value: Product) => {
    return (
    <>
    <div className="product-specifications-container">
        <span className="review-comment">Brand</span>
        <span className="review-comment product-bold">{value.brand}</span>
    </div>
    <div className="product-specifications-container">
        <span className="review-comment">Category</span>
        <span className="review-comment product-bold">{value.category}</span>
    </div>
    <div className="product-specifications-container">
        <span className="review-comment">Minimum Order Qty</span>
        <span className="review-comment product-bold">1</span>
    </div>
    <div className="product-specifications-container">
        <span className="review-comment">Warranty</span>
        <span className="review-comment product-bold">{value.warrantyInformation}</span>
    </div>
    <div className="product-specifications-container">
        <span className="review-comment">Shipping</span>
        <span className="review-comment product-bold">{value.shippingInformation}</span>
    </div>
    <div className="product-specifications-container">
        <span className="review-comment">Return Policy</span>
        <span className="review-comment product-bold">{value.returnPolicy}</span>
    </div>
    <div className="product-specifications-container">
        <span className="review-comment">Weight</span>
        <span className="review-comment product-bold">{value.weight} gms</span>
    </div>
        <div className="product-specifications-container">
        <span className="review-comment">Dimensions (W X H X D)</span>
        <span className="review-comment product-bold">{value.dimensions.width} X {value.dimensions.height} X {value.dimensions.depth} cm</span>
    </div>
    </>)
}