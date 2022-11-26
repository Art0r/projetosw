import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Login.css';
import LoginUser from './LoginUser';
import LoginInst from './LoginInst';

function Login() {
    const queryParams = new URLSearchParams(useLocation().search);
    const [loginType, setLoginType] = useState<Number>(1)

    const handleLoginType = () => {
        setLoginType(loginType == 1 ? 2 : 1)
    }

    return (
        <section className='section'>
            {loginType == 1 ?
                <LoginUser handleLoginType={handleLoginType} />
                : <LoginInst handleLoginType={handleLoginType} />}
        </section>

    );
}

export default Login;