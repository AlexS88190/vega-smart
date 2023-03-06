import React from 'react';
import './Login.css';
import ButtonLogin from "../ButtonLogin/ButtonLogin";

function Login() {
    // const navigate = useNavigate();

    return (
        <div className="login">
            <h1 className="login__title">Авторизация</h1>
            <p className="login__paragraph">(здесь возможно сделать окно авторизации)</p>
            <ButtonLogin/>
            {/*<Link className="not-found__back" onClick={() => navigate(-1)}>Назад</Link>*/}
        </div>
    )
}

export default Login;