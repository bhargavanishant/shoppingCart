import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './Cart.css';
import Counter from '../../components/Counter/Counter';
import type { RootState } from '../../app/store';
import { clearCart, increment, decrement, removeFromCart } from '../../features/cart/cartSlice';
import { getShowcasedPrice, getItemsTotalCost, getTaxLevied, getTotalCartCost } from '../../utils/priceCalculation';
import Header from '../../components/Header/Header';
import { useHeaderConfig } from '../../features/ui/useHeaderConfig';

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useHeaderConfig({
        showSearch: true,
        showNavbar: false,
        showBreadcrumbs: false,
        showCart: true
    });

    const cartItems = useSelector(
        (state: RootState) => state.cart.items
    );

    const totalCartItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const itemsTotalCost = getItemsTotalCost(cartItems);
    const taxLevied = getTaxLevied(itemsTotalCost);
    const totalCartCost = getTotalCartCost(itemsTotalCost, taxLevied);

const clearCartItems = function () {
        dispatch(clearCart());
    }

    const goHome = function () {
        navigate(`/`);
    }

    const handleCountChange = (productId: number, previousValue: number, newValue: number) => {
        if (newValue > previousValue) {
            dispatch(increment(productId));
        } else {
            dispatch(decrement(productId));
        }
    };

    const proceedCheckout = () => navigate('/checkout');

    return (
        <>
            <Header />
            <section data-screen-label="Cart">
                <div className='card-header-holder'>
                    <h1>Your Cart ({totalCartItems})</h1>
                    {totalCartItems > 0 ? <button onClick={clearCartItems} className='remove-all'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 48 48">
                        <path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z"></path>
                    </svg> Remove all</button> : <></>}
                </div>
                {cartItems.length === 0 ? (
                    <div className="empty-cart-container">
                        <div className='cart-is-empty-label'>Your cart is empty</div>
                        <div className='below-empty-label'>Browse the shop and add something you love.</div>
                        <button onClick={() => goHome()} className='continue-shopping'>Continue Shopping</button>
                    </div>) : (
                    <div className='cart-data-holder'>
                        <div className='cart-container'>
                            {cartItems.map((item) => {
                                const showcasedPrice = getShowcasedPrice(
                                    item.price,
                                    item.discountPercentage
                                );

                                return (
                                    <div key={item.id} className="cart-items-container">
                                        <img
                                            className="cart-item-img"
                                            src={item.thumbnail}
                                            alt={item.title}
                                        />

                                        <div className="cart-item-name-holder">
                                            <div className="cart-item-name">{item.title}</div>
                                            <div className="cart-item-category">{item.category}</div>
                                        </div>

                                        <div className="cart-item-price">
                                            ${showcasedPrice}
                                        </div>

                                        <Counter
                                            value={item.quantity}
                                            onChange={(newValue) =>
                                                handleCountChange(item.id, item.quantity, newValue)
                                            }
                                        />
                                        <div className="cart-item-price">
                                            ${(parseFloat((item.quantity * showcasedPrice).toFixed(2)))}
                                        </div>

                                        <button className="delete-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 48 48">
                                                <path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="order-summary">
                            <div className='order-summary-title'>Order Summary</div>
                            <div className='order-subtotal'>
                                <div>Subtotal ({totalCartItems} items)</div>
                                <div className='cost-label'>${itemsTotalCost}</div>
                            </div>
                            <div className='order-subtotal'>
                                <div>Shipping</div>
                                <div className='free-label'>Free</div>
                            </div>
                            <div className='order-subtotal tax-box'>
                                <div>Tax</div>
                                <div className='cost-label'>${taxLevied}</div>
                            </div>
                            <div className='total-order-value'>
                                <div className='total-label'>Total</div>
                                <div className='total-label'>${totalCartCost}</div>
                            </div>
                            <button className='proceed-to-checkout' onClick={proceedCheckout}>Proceed to Checkout</button>
                            <div className='secure-checkout'>
                                <img />
                                <div>Secure Checkout</div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}