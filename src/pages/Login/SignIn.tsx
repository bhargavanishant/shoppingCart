

export default function SignIn() {
    return (<>
            <form id="login-form" action="" method="post">
                <div className="field-container">
                    <label className="label" htmlFor="email">Email</label>
                    <input className="input-box" type="email" id="email" name="email" placeholder="you@example.com" />
                </div>
                <div className="field-container">
                    <label className="label" htmlFor="user-password">Password</label>
                    <input className="input-box" type="password" id="user-password" value="password" name="password" required />
                </div>
                <button className="sign-in-button" type="submit">Sign In</button>
            </form>
            <div className='login-divider'>
                <div className="divider-line"></div>
                <div className='continue-with-label'>or continue with</div>
                <div className="divider-line"></div>
            </div>
            <div className='button-container'>
                <button className='google-button'>
                    <img className='google-logo' src="" />
                    <span>Google</span>
                </button>
                <button className='google-button'>
                    <img className='google-logo' src="" />
                    <span>Apple</span>
                </button>
            </div>
    </>);
}