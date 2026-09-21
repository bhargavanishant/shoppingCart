import './OrderConfirmation.css';

type OrderConfirmationProps = {
    orderId: string;
    orderDate: string;
    onContinueShopping: () => void;
    helpCenterHref?: string;
};

export default function OrderConfirmation({
    orderId,
    orderDate,
    onContinueShopping,
    helpCenterHref = '#',
}: OrderConfirmationProps) {
    return (
        <div className="order-confirmation">
            <div className="order-confirmation-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12.5l5 5L20 6.5" />
                </svg>
            </div>
            <h1 className="order-confirmation-title">Thank you for your order!</h1>
            <p className="order-confirmation-subtitle">
                Your order has been placed successfully. You'll receive an email confirmation shortly.
            </p>
            <div className="order-confirmation-meta">
                <div className="order-confirmation-meta-item">
                    <div className="order-confirmation-meta-label">Order ID</div>
                    <div className="order-confirmation-meta-value">{orderId}</div>
                </div>
                <div className="order-confirmation-meta-item">
                    <div className="order-confirmation-meta-label">Order Date</div>
                    <div className="order-confirmation-meta-value">{orderDate}</div>
                </div>
            </div>
            <button type="button" className="order-confirmation-continue" onClick={onContinueShopping}>
                Continue Shopping
            </button>
            <div className="order-confirmation-divider" />
            <div className="order-confirmation-help">
                <div className="order-confirmation-help-title">Need help?</div>
                <a className="order-confirmation-help-link" href={helpCenterHref}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9.5 9.2a2.5 2.5 0 014.8 1c0 1.6-2.3 1.8-2.3 3.3" />
                        <circle cx="12" cy="16.8" r="0.1" fill="currentColor" />
                    </svg>
                    Help Center
                </a>
            </div>
        </div>
    );
}
