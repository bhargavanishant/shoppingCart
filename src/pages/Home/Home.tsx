import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../../components/Header/Header';
import { useHeaderConfig } from '../../features/ui/useHeaderConfig';

export default function Home() {
    const navigate = useNavigate();

    useHeaderConfig({
        showSearch: true,
        showNavbar: true,
        showBreadcrumbs: false,
        showCart: true
    });

    return (<>
        <Header />
        <section data-screen-label="Home">
            <div className="homa-container">
                <div className="home-brading">
                    <div className="summer-sale">Summer Sale</div>
                    <div className="main-heading">Up to 50% Off <p>On Best Selling Styles</p></div>
                    <div className='supporting-line'>Explore top deals on fashion, electronics, home & more!</div>
                    <button
                        className='shop-now-button'
                        aria-label='Shop Now'
                        onClick={() => navigate('/categories')}
                    >
                        Shop Now
                    </button>
                </div>
                <div className="image-holder"></div>
            </div >
            <div className='banner-branding'>
                <div className="branding-item-container">
                    <div className='branding-item-container-inside'>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 7h11v9H3z"></path><path d="M14 10h4l3 3v3h-7z"></path><circle cx="7" cy="18" r="1.6"></circle><circle cx="18" cy="18" r="1.6"></circle></svg>
                    </div>
                    <div><div className='branding-item-heading'>Free Shipping</div><div className='branding-item-subtitle'>On orders over $49</div></div>
                </div>
                <div className="branding-item-container">
                    <div className='branding-item-container-inside'>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 12a9 9 0 109-9"></path><path d="M3 4v5h5"></path></svg>
                    </div>
                    <div><div className='branding-item-heading'>Easy Returns</div><div className='branding-item-subtitle'>30 days return policy</div></div>
                </div>
                <div className="branding-item-container">
                    <div className='branding-item-container-inside'>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"></path></svg>
                    </div>
                    <div><div className='branding-item-heading'>Secure Payment</div><div className='branding-item-subtitle'>100% secure checkout</div></div>
                </div>
                <div className="branding-item-container">
                    <div className='branding-item-container-inside'>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 13v-1a8 8 0 0116 0v1"></path><rect x="3" y="13" width="4" height="6" rx="1.4"></rect><rect x="17" y="13" width="4" height="6" rx="1.4"></rect><path d="M21 19a4 4 0 01-4 4h-2"></path></svg>
                    </div>
                    <div><div className='branding-item-heading'>24/7 Support</div><div className='branding-item-subtitle'>We are here to help</div></div>
                </div>
            </div>
        </section>
    </>

    );
}