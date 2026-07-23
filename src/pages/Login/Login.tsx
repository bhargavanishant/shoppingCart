import Tabs from '../../components/Tabs/Tabs';
import CreateAccount from './CreateAccount';
import './Login.css';
import SignIn from './SignIn';
import { useHeaderConfig } from '../../features/ui/useHeaderConfig';
import Header from '../../components/Header/Header';

export default function Login() {
    useHeaderConfig({
        showSearch: false,
        showNavbar: false,
        showBreadcrumbs: false,
        showCart: false
    });

    return (<>
    <Header/>
    <section className="login-page">
            <div className='login-box-holder'>
                <div className='login-box'>
                    <Tabs
                        items={[
                            {
                                label: "Sign In",
                                content: <SignIn />
                            },
                            {
                                label: "Create Account",
                                content: <CreateAccount />
                            }
                        ]}
                    />
                </div>
            </div>
        </section>
    </>
        
    )
}