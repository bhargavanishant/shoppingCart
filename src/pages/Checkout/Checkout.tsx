import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import ConfigForm from "../../components/ConfigForm/ConfigForm";
import Stepper from "../../components/Stepper/Stepper";
import ReviewSummary from "../../components/ReviewSummary/ReviewSummary";
import OrderConfirmation from "../../components/OrderConfirmation/OrderConfirmation";
import type { RootState } from '../../app/store';
import { clearCart } from '../../features/cart/cartSlice';
import { getShowcasedPrice, getItemsTotalCost, getTaxLevied, getTotalCartCost } from '../../utils/priceCalculation';
import { shippingFormFields } from './shippingFormConfig';
import { paymentFormFields, defaultPaymentFormValues, getPaymentMethodLabel } from './paymentFormConfig';
import './Checkout.css';

const checkoutSteps = [
    { label: 'Shipping Information' },
    { label: 'Payment Method' },
    { label: 'Review & Place Order' },
];

const generateOrderId = () => `SE${Math.floor(1_000_000 + Math.random() * 9_000_000)}`;

const formatOrderDate = (date: Date) =>
    date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(1);
    const [shippingValues, setShippingValues] = useState<Record<string, string>>({});
    const [paymentValues, setPaymentValues] = useState<Record<string, string>>(defaultPaymentFormValues);
    const [placedOrder, setPlacedOrder] = useState<{ id: string; date: string } | null>(null);

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

    const goToCart = () => navigate('/cart');

    const handleShippingSubmit = (values: Record<string, string>) => {
        setShippingValues(values);
        setCurrentStep(2);
    };

    const handlePaymentSubmit = (values: Record<string, string>) => {
        setPaymentValues(values);
        setCurrentStep(3);
    };

    const handleStepClick = (stepNumber: number) => {
        if (stepNumber < currentStep) {
            setCurrentStep(stepNumber);
        }
    };

    const handlePlaceOrder = () => {
        setPlacedOrder({ id: generateOrderId(), date: formatOrderDate(new Date()) });
        dispatch(clearCart());
    };

    const goToHome = () => navigate('/');

    const shippingAddressLine = [
        [shippingValues.address, shippingValues.apartment].filter(Boolean).join(', '),
        [shippingValues.city, [shippingValues.state, shippingValues.pinCode].filter(Boolean).join(' ')]
            .filter(Boolean)
            .join(', '),
    ]
        .filter(Boolean)
        .join(', ');

    const reviewSections = [
        {
            title: 'Shipping to',
            lines: [
                shippingValues.fullName,
                shippingAddressLine,
                shippingValues.phone,
            ],
        },
        {
            title: 'Payment Method',
            lines: [getPaymentMethodLabel(paymentValues.paymentMethod)],
        },
    ];

    if (placedOrder) {
        return (<>
            <Header />
            <section data-screen-label="Order Confirmation">
                <OrderConfirmation
                    orderId={placedOrder.id}
                    orderDate={placedOrder.date}
                    onContinueShopping={goToHome}
                />
            </section>
        </>);
    }

    return (<>
        <Header />
        <section data-screen-label="Checkout">
            <h1>Checkout</h1>
            <div className="checkout-layout">
                <div className="checkout-steps">
                    <Stepper steps={checkoutSteps} currentStep={currentStep} onStepClick={handleStepClick} />
                </div>
                <div className="checkout-form-area">
                    {currentStep === 1 && (
                        <ConfigForm
                            fields={shippingFormFields}
                            initialValues={shippingValues}
                            submitLabel="Continue to Payment"
                            onSubmit={handleShippingSubmit}
                        />
                    )}
                    {currentStep === 2 && (
                        <ConfigForm
                            fields={paymentFormFields}
                            initialValues={paymentValues}
                            submitLabel="Continue to Review"
                            onSubmit={handlePaymentSubmit}
                        />
                    )}
                    {currentStep === 3 && (
                        <ReviewSummary
                            sections={reviewSections}
                            submitLabel="Place Order"
                            onSubmit={handlePlaceOrder}
                        />
                    )}
                </div>
                <div className="order-summary">
                    <div className='order-summary-header'>
                        <div className='order-summary-title'>Order Summary</div>
                        <button className='edit-cart-link' onClick={goToCart}>Edit Cart</button>
                    </div>
                    <div className='checkout-items-count'>{totalCartItems} Items</div>
                    <div className='checkout-items-list'>
                        {cartItems.map((item) => {
                            const showcasedPrice = getShowcasedPrice(
                                item.price,
                                item.discountPercentage
                            );

                            return (
                                <div key={item.id} className='checkout-item-row'>
                                    <img
                                        className='checkout-item-img'
                                        src={item.thumbnail}
                                        alt={item.title}
                                    />
                                    <div className='checkout-item-name'>{item.title}</div>
                                    <div className='checkout-item-price'>${showcasedPrice.toFixed(2)}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='order-subtotal'>
                        <div>Subtotal</div>
                        <div className='cost-label'>${itemsTotalCost.toFixed(2)}</div>
                    </div>
                    <div className='order-subtotal'>
                        <div>Shipping</div>
                        <div className='free-label'>Free</div>
                    </div>
                    <div className='order-subtotal tax-box'>
                        <div>Tax</div>
                        <div className='cost-label'>${taxLevied.toFixed(2)}</div>
                    </div>
                    <div className='total-order-value'>
                        <div className='total-label'>Total</div>
                        <div className='total-label'>${totalCartCost.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}