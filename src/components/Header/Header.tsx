import './Header.css';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import type { RootState } from '../../app/store';
import Navbar from '../Navbar/Navbar';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { getHeaderConfig, HEADER_CONFIG_BY_ROUTE } from '../../features/ui/headerConfig';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const headerConfig =
        getHeaderConfig(location.pathname);

    const {
        showSearch,
        showNavbar,
        showBreadcrumbs,
        showCart,
    } = headerConfig;

    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );


    const headToCart = () => navigate('/cart');
    const headToLogin = () => navigate('/login');

    return (
        <div className="header-container">
            <header className="custom-header">
                <Link to="/" className='branding'>
                    <div className='branding-container'>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1 12H7z"></path><path d="M9 8V6a3 3 0 016 0v2"></path></svg>
                    </div>
                    <span className='app-name'>ShopEase</span>
                </Link>

                {showSearch && (
                    <div className="search-container">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="oklch(50% 0.015 70)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path></svg>
                        <input className="search-input" type="text" placeholder="Search for products, brands and more…" />
                    </div>
                )}

                {showCart && (
                    <div className="cart">
                        <button onClick={headToCart} className="cart-button-holder">
                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1 12H7z"></path><path d="M9 8V6a3 3 0 016 0v2"></path></svg>
                            {totalItems > 0 && (
                                <div className="cart-items-badge">
                                    {totalItems}
                                </div>
                            )}
                            <span>Cart</span>
                        </button>
                    </div>
                )}
                <div className="login">
                    <button onClick={headToLogin}>
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.6"></circle><path d="M4.5 20c1.4-4 4-6 7.5-6s6.1 2 7.5 6"></path></svg>
                    </button>
                </div>
            </header>
            {showNavbar && <Navbar />}
            {showBreadcrumbs && <Breadcrumbs />}
        </div>
    )
}