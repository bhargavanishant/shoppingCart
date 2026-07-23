import { useLocation, useParams } from 'react-router-dom';
import "./ProductDetails.css";
import { useEffect, useMemo, useState } from 'react';
import { getShowcasedPrice, getSavings } from "../../utils/priceCalculation";
import Tabs from '../../components/Tabs/Tabs';
import { ProductSpecifications } from './ProductSpecifications';
import { ProductReviews } from './ProductReviews';
import type { Product } from '../../types/categories';
import { addToCart } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import { setBreadcrumbs } from '../../features/ui/uiSlice';

export default function ProductDetails() {
    const { id } = useParams();
    const location = useLocation();
    const cached = location.state?.product as Product | undefined;
    const [product, setProduct] = useState<Product | undefined>(cached);
    const [justAddedId, setJustAddedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(!cached);

    // Track which product's images we've initialized the selection for, and
    // reset the selection during render (not in an effect) when the product
    // changes — React's recommended pattern for "adjusting state when a prop
    // changes" without an extra render pass.
    const [imageSelectionFor, setImageSelectionFor] = useState<number | undefined>(product?.id);
    const [selectedProductImageOverride, setSelectedProductImageOverride] = useState<string | undefined>(undefined);
    if (product && product.id !== imageSelectionFor) {
        setImageSelectionFor(product.id);
        setSelectedProductImageOverride(undefined);
    }
    const selectedProductImage = selectedProductImageOverride ?? product?.images?.[0] ?? "";

    useEffect(() => {
        if (cached) {
            return;
        }
        let cancelled = false;
        fetch(`https://dummyjson.com/products/${id}`)
            .then(r => r.json())
            .then(data => { if (!cancelled) setProduct(data); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [id, cached]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!product) return;

        dispatch(
            setBreadcrumbs([
                { label: "Home", path: "/" },
                { label: product.category, path: `/categories/${product.category}` },
                { label: product.title, path: `/products/${product.id}` }
            ])
        );
    }, [product, dispatch]);

    const tabItems = useMemo(() => {
        if (!product) return [];
        return [
            {
                label: "Specifications",
                content: <ProductSpecifications {...product} />
            },
            {
                label: "Reviews",
                content: <ProductReviews rating={product.rating} reviews={product.reviews} />
            }
        ];
    }, [product]);

    const showcasedPrice = useMemo(() => {
        if (!product) return 0;
        return getShowcasedPrice(
            product.price,
            product.discountPercentage
        );
    }, [product]);

    if (loading) return (<>
        <div>Loading...</div>
    </>);

    if (!product) return (<>
        <div>Not Found</div>
    </>);

    const savings = getSavings(product.price, showcasedPrice);

    const changeProductImage = (image: string) => {
        setSelectedProductImageOverride(image);
    };

    const isInStock = product.availabilityStatus.toLowerCase() === "in stock";

    const stockColor = isInStock
        ? "oklch(45% 0.12 150)"
        : "oklch(55% 0.16 30)";

    const stockText = isInStock
        ? `· ${product.stock} units left`
        : "";

    const addProductCart = (product: Product) => {
        dispatch(addToCart(product));
        setJustAddedId(product.id);
        setTimeout(() => setJustAddedId(null), 1200);
    };

    return (
        <>
            <Header />
            <section className="product-page-container">
                <div className="product-images-container">
                    {product.images.map((img: string, index: number) => (
                        <img key={index} onClick={() => changeProductImage(img)} className="product-image-holder" src={img} />
                    ))}
                </div>
                <div className='product-primary-image'>
                    <img src={selectedProductImage} />
                </div>
                <div className="product-details-container">
                    <h5 className='product-brand-title'>{product.brand}</h5>
                    <h2 className='product-title'>{product.title}</h2>
                    <div className="product-tags-container">{product.tags.map((tag: string, index: number) =>
                        <span key={index} className='product-tag'>{tag}</span>
                    )
                    }</div>
                    <div className='product-rating-holder'>
                        <svg width="15" height="15" viewBox="0 0 20 20" fill="oklch(65% 0.15 75)"><path d="M10 1.5l2.6 5.55 6.1.72-4.5 4.2 1.2 6.03L10 14.9l-5.4 3.1 1.2-6.03-4.5-4.2 6.1-.72z"></path></svg>
                        <span className="star-rating">{product.rating}</span>
                        <span className='product-reviews'>({product.reviews.length} reviews)</span>
                    </div>
                    <div className="product-pricing">
                        <div className='showcased-price'>${showcasedPrice}</div>
                        <div className='product-actual-price'>${product.price}</div>
                    </div>
                    <div className="product-savings">You save ${savings} ({product.discountPercentage}%)</div>
                    <div className="product-stock-container">
                        <div className="product-stock-status-icon" style={{ backgroundColor: stockColor }}></div>
                        <div className="product-stock-status-value" style={{ color: stockColor }}>{product.availabilityStatus}</div>
                        <span className="product-stock-quantity">{stockText} · SKU {product.sku}</span>
                    </div>
                    <div className="product-description">{product.description}</div>
                    <button onClick={() => addProductCart(product)} className='add-to-cart' disabled={product.stock === 0}>
                        {justAddedId === product.id ? "Added ✓" : "Add to Cart"}
                    </button>
                    <button className="add-to-wishlist">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20.8 8.6c0 5-8.8 10.4-8.8 10.4S3.2 13.6 3.2 8.6a4.8 4.8 0 019.6-2 4.8 4.8 0 018 2z"></path></svg>
                        Add to Wishlist
                    </button>
                    <div className='brand-shippping-banner'>
                        <div className="day-returns-container">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="oklch(56% 0.19 254)" stroke-width="1.7"><path d="M3 7h11v9H3z"></path><path d="M14 10h4l3 3v3h-7z"></path><circle cx="7" cy="18" r="1.6"></circle><circle cx="18" cy="18" r="1.6"></circle></svg>
                            <div><div className="returns-label">Free Shipping</div>On orders over $49</div>
                        </div>
                        <div className='day-returns-container'>
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="oklch(56% 0.19 254)" stroke-width="1.7"><path d="M3 12a9 9 0 109-9"></path><path d="M3 4v5h5"></path></svg>
                            <div><div className="returns-label">30-Day Returns</div>Easy returns</div>
                        </div>
                        <div className="secure-payment-container">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="oklch(56% 0.19 254)" stroke-width="1.7"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"></path></svg>
                            <div><div className="returns-label">Secure Payment</div>100% secure</div>
                        </div>
                    </div>
                    <Tabs items={tabItems} />
                </div>
            </section>
        </>

    )
}
