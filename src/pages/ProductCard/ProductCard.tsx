import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/categories";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { getShowcasedPrice } from "../../utils/priceCalculation";
import './ProductCard.css';

export default function ProductCard(product: Product) {
    const [justAddedId, setJustAddedId] = useState<number | null>(null);
    const navigate = useNavigate();

    const openProductDetailsPage = function (product: Product) {
        if (!product) {
            return;
        }
        navigate(`/products/${product.id}`, {
            state: {
                product,
            },
        });
    };

    const dispatch = useDispatch();

    const addProductCart = (product: Product) => {
        dispatch(addToCart(product));
        setJustAddedId(product.id);
        setTimeout(() => setJustAddedId(null), 1200);
    };

    const showcasedPrice = getShowcasedPrice(
        product.price,
        product.discountPercentage
    );

    return (
        <article key={product.id} className="product-card" >
            <div className="product-card__image" onClick={() => openProductDetailsPage(product)}>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                />
            </div>
            <div className="product-card__body" onClick={() => openProductDetailsPage(product)}>
                <div className="product-card__brand">{product.brand}</div>
                <h3 className="product-card__name">{product.title}</h3>
                <div className="product-card__rating">
                    <svg className="icon" data-icon="Star" viewBox="0 0 20 20"><path d="M10 1.5l2.6 5.55 6.1.72-4.5 4.2 1.2 6.03L10 14.9l-5.4 3.1 1.2-6.03-4.5-4.2 6.1-.72z" /></svg>
                    <strong>{product.rating}</strong> <span>({product.reviews.length})</span>
                </div>
                <div className="product-card__price-row">
                    <span className="product-card__price">${showcasedPrice}</span>
                    <span className="product-card__price--original">${product.price}</span>
                </div>
            </div>
            <button onClick={() => addProductCart(product)} className="btn btn-secondary product-card__cta">
                {justAddedId === product.id ? "Added ✓" : "Add to Cart"}
            </button>
        </article>);
}