import React from 'react';
import './Login.css';
import ButtonLogin from "../ButtonLogin/ButtonLogin";

function Login({handleLogin}) {

    return (
        <div className="login">
            <h1 className="login__title">Авторизация</h1>
            <p className="login__paragraph">(здесь возможно сделать окно авторизации)</p>
            <ButtonLogin handleLogin={handleLogin} />
        </div>
    )
}

export default Login;