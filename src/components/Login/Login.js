/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import useForm from '../../utils/Validation';
import { login, hideResMessage } from '../../redux/actions';
import { connect } from 'react-redux';

function Login({
    handleLogin,
    responseMessage,
    isLoading,
}) {
    const { values, handleChange, errors, isValid, resetForm } = useForm();

    useEffect(() => {
        hideResMessage();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const { email, password } = values;

        handleLogin(email, password, resetForm);
    }

    return (
        <div className="login">
            <Link to="/" className="login__logo button">
                <img
                    className="login__logo button"
                    alt="лого"
                    src={logo}
                />
            </Link>
            <h2 className="login__greeting">Рады видеть!</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__input-label" htmlFor="email">
                    E-mail
                </label>
                <input
                    type="email"
                    className={`login__input ${
                        errors.email && 'login__input_error'
                    }`}
                    id="email"
                    name="email"
                    required
                    onChange={handleChange}
                    value={values.email || ''}
                />
                <span className="login__input-error">{errors.email}</span>

                <label className="login__input-label" htmlFor="password">
                    Пароль
                </label>
                <input
                    type="password"
                    className={`login__input ${
                        errors.password && 'login__input_error'
                    }`}
                    id="password"
                    name="password"
                    required
                    onChange={handleChange}
                    value={values.password || ''}
                />
                <span className="login__input-error">
                    {errors.password}
                </span>

                <span className="login__response-error">
                    {responseMessage}
                </span>
                <button
                    className={`login__submit button ${
                        (!isValid || isLoading) && 'login__submit_disabled'
                    }`}
                    type="submit"
                    disabled={(!isValid || isLoading) && true}
                >
                    {isLoading ? 'Вход....' : 'Войти'}
                </button>
                <p className="login__to-register">
                    Ещё не зарегистрированы?
                    <Link to="/signup" className="login__to-register-link">
                        Регистрация
                    </Link>
                </p>
            </form>
        </div>
    );
}

const mapDispatchToProps = {
    handleLogin: login,
    hideResMessage,
};

const mapStateToProps = state => ({
    isLoading: state.app.isLoading,
    responseMessage: state.app.resMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
